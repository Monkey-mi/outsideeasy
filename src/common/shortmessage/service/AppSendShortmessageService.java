package common.shortmessage.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctc.wstx.util.DataUtil;

import util.Const;
import util.DataTrans;
import util.HttpRequestUtils;
import util.IpAddressUtils;
import util.SysSerialId;

import common.shortmessage.data.AppSendShortmessageMapper;
import common.shortmessage.model.AppSendShortmessage;


@Service
public class AppSendShortmessageService {
	@Autowired
	private AppSendShortmessageMapper mapper;

	public List<AppSendShortmessage> getAppSendShortmessageList(Map<String,Object> params) {
		return mapper.getAppSendShortmessageList(params);
	}
	
	/**
	 * 增加发送短信记录
	*addAppSendShortmessage
	*@param obj
	*void
	*@author mishengliang
	*2016-7-15上午10:44:28
	 */
	public void addAppSendShortmessage(AppSendShortmessage obj) {
			mapper.addAppSendShortmessage(obj);
	}
	
	public void updateAppSendShortmessage(AppSendShortmessage[] arr) {
		for(AppSendShortmessage obj: arr) {
			mapper.updateAppSendShortmessage(obj);
		}
	}
	public void deleteAppSendShortmessage(AppSendShortmessage[] arr) {
		for(AppSendShortmessage obj: arr) {
			mapper.deleteAppSendShortmessage(obj);
		}
	}
	
	/**
	 * 同一IP在24小时内发送短信的总共次数
	*ipSendCountOneDay
	*@param params
	*@return
	*int
	*@author mishengliang
	*2016-7-18上午11:10:02
	 */
	private int ipSendCountOneDay(Map<String, Object> params){
		return mapper.ipSendCountOneDay(params);
	}
	
	
	/**
	 * 发送单个用户短信
	*sendSingleMessage
	*@param msg 发送短信的信息模板
	*@param sendPhoneNum 接收者的电话号
	*@param ScheduleTime 预约发送时间   空字符转：表示马上发送  ；预约发送时间，格式:yyyyMMddhhmmss,如‘20090901010101’；
	*@param f 提交时检测方式   1:存在无效号码，仍然可以给有效号码发送短信；非1：存在无效号码，全部不发送；主要在群发中使用。
	*@param moduleId 使用短信发送模块ID 1：安全验证模块    2：登录IP验证模块  3：vip注册模块
	*@param currentIp 用户当前IP
	*@return AppSendShortmessage 短信发送结果
	*@throws IOException
	*@author mishengliang
	*2016-7-14下午4:07:41
	 */
	public AppSendShortmessage sendSingleMessage(String msg, String sendPhoneNum,String ScheduleTime, String f, Integer moduleId, String currentIp) throws IOException{
		Map<String, Object> params = new HashMap<String, Object>();
		AppSendShortmessage shortMes = new AppSendShortmessage();
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR, -24);
		Date dateLimit = calendar.getTime();
		
		params.put("send_time_limit", dateLimit);
		params.put("ip", currentIp);
		int count = ipSendCountOneDay(params);
		if(count > Const.IPSENDCOUNTLIMIT){//达到限制，不发送信息
			shortMes.setDescription("同一账号发送信息过多");
			shortMes.setResult(-1);
			return shortMes;
		}
		
		String sid=SysSerialId.getNextSerialId();//回执编号
		String postUrl="http://smsapi.ums86.com:8888/sms/Api/Send.do";//post提交请求，获取数据
		
		Map<String,Object> paramsForMessage=new HashMap<String,Object>();
		paramsForMessage.put("SpCode", "235083");//企业号
		paramsForMessage.put("LoginName", "zj_tpsxxyp");//账号
		paramsForMessage.put("Password", "PDmYbv76");//密码
		paramsForMessage.put("MessageContent",msg );//消息模板
		paramsForMessage.put("UserNumber", sendPhoneNum);//接收人电话-15700099155,18768225375
		paramsForMessage.put("SerialNumber", sid);//回执编号，必须20位数字
		paramsForMessage.put("ScheduleTime", ScheduleTime);//立即发送
		paramsForMessage.put("f", f);//存在无效号码时，有效号码仍能发出短信，无效号码返回在参数faillist中
		String postResult = HttpRequestUtils.httpPost(postUrl,paramsForMessage);
		
		Date sendTime = new Date();
		Integer sendType = 0;//发送类型： 0 单条发送； 1 群发；
		if(ScheduleTime != null && !("".equals(ScheduleTime))){}//有预定发送短信时间的情况，暂时不做处理
		if(sendPhoneNum.indexOf(",") != -1){sendType = 1;}//字符串中有逗号则为群发
		JSONObject postResultInfo = JSONObject.fromObject("{"+postResult.replaceAll("=&", "=*&").replaceAll(":", "@@").replaceAll(",", "@").replaceAll("&", ";").replaceAll("=", ":")+";a:8;"+"}");
		
		//将发送短信的记录存入表中
		shortMes.setModule_id(moduleId);//1:安全模块；2:IP验证模块；3:vip登录模块
		shortMes.setReceive_phones(sendPhoneNum);
		shortMes.setMessage(msg);
		shortMes.setSend_type(sendType);
		shortMes.setSend_time(sendTime);
		shortMes.setIp(currentIp);
		shortMes.setResult((Integer)(postResultInfo.get("result")));//直接向下转型为Integer，因为数据的原因，不能转为String。
		shortMes.setDescription(postResultInfo.get("description").toString().replaceAll("@@", ":").replaceAll("@", ","));
		if(postResultInfo.get("task_id") != null){//存在字段情况下
			shortMes.setTask_id((postResultInfo.get("task_id")).toString());
		}
		if(postResultInfo.get("faillist") != null){//存在字段情况下
			shortMes.setFaillist((String)(postResultInfo.get("faillist").toString().replace("*", "").replaceAll("@", ",")));
		}
		addAppSendShortmessage(shortMes);
		
		return shortMes;
	}
}
