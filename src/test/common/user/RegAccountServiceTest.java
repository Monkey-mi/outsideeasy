/**    
 * 文件名：RegAccountServiceTest.java    
 *    
 * 版本信息：    
 * 日期：2016-5-31    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.common.user;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;

import common.shortmessage.model.AppSendShortmessage;
import common.shortmessage.service.AppSendShortmessageService;
import common.user.model.IpAddress;
import common.user.response.RegAccountCompanyVo;
import common.user.service.IpAddressDoService;
import common.user.service.RegAccoutCompanyInfoService;
import common.user.service.RegAccoutService;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：RegAccountServiceTest    
 * 创建时间：2016-5-31 下午8:24:37    
 * 修改人：mishengliang    
 * 修改时间：2016-5-31 下午8:24:37    
 * @version     
 *     
 */
public class RegAccountServiceTest extends BaseTest {
	@Autowired
	private RegAccoutService service;
	@Autowired
	private IpAddressDoService ipAddressService;
	@Autowired
	private AppSendShortmessageService shortMessageService;
	@Autowired
    private RegAccoutCompanyInfoService regAccoutCompanyInfoService;
	
	/**
	 * 测试邮箱有效性
	*checkEmailValidTest
	*void
	*@author mishengliang
	*2016-5-31下午8:27:35
	 */
	@Test
	public void checkEmailValidTest(){
		String UUID = "1ca45883122b4bec8973194fa7bd0628";
		
		Boolean isValid = service.checkEmailValid(UUID);
		
		logger.debug("IsValid:" + isValid);
	}
	@Test
	public void getRegAccoutCompanyInfoOneTest(){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("reg_id", 12);
		map.put("supplier_cpyname", "");
		List<RegAccountCompanyVo> list = regAccoutCompanyInfoService.getRegAccoutCompanyInfoOne(map);
		for(RegAccountCompanyVo regAccountCompanyVo : list){
			logger.debug(regAccountCompanyVo.getCpyname_cn());
		}
	}
	/**
	 * 测试java Json的使用
	*jsonTest
	*void
	*@author mishengliang
	*2016-6-15下午2:05:38
	 */
	@Test
	public void jsonTest(){
		Map<String, Object> jsonMap = new HashMap<String, Object>();
		
		//构建基础数据
		jsonMap.put("String1", "Object1");
		jsonMap.put("String2", "Object2");
		jsonMap.put("String3", "Object3");
		jsonMap.put("String4", "Object4");
		jsonMap.put("String5", "Object5");
		
		String jsonString = "result=0&description=发送短信成功&taskid=203691371027&faillist=&task_id=203691371027";
		String jsonString1 = "result=0&description=发送短信成功&taskid=203691371027&faillist=14896328523,&task_id=203691371027";
		String jsonString2 = "result=32&description=同一号码发送次数太多,一天内同一号码发送相同内容次数:5,当前次数为:6";
		String jsonString3 = "result=6&description=号码中含有无效号码或不在规定的号段或为免打扰号码&faillist=14896328524,";
		
		JSONObject json = JSONObject.fromObject("{"+jsonString3.replaceAll("=&", "=*&").replaceAll(":", "@@").replaceAll(",", "@").replaceAll("&", ";").replaceAll("=", ":")+";a:8;"+"}");
		logger.debug(json.toString());
		logger.debug(json.get("result"));
		logger.debug(json.get("description").toString().replaceAll("@@", ":").replaceAll("@", ","));
		logger.debug(json.get("taskid"));
		if(json.get("faillist") != null)
		logger.debug(json.get("faillist").toString().replace("*", "").replaceAll("@", ","));
	}
	
	/**
	 *用户名获取ip地址列表
	*getIpAddressListTest
	*void
	*@author mishengliang
	*2016-7-12上午11:14:56
	 */
	@Test
	public void getIpAddressListTest(){
		String loginIp = "MikeSun";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("loginIp", loginIp);
		IpAddress ipAdd = new IpAddress();
		ipAdd.setAdress_id(1);
		List<IpAddress> ipList = ipAddressService.getIpAddressList(params);
		logger.debug("ipList : " + ipList);
	}
	
	/**
	 * 短信发送测试
	*sendSingleMessageTest
	*void
	*@author mishengliang
	*2016-7-14下午5:29:48
	 */
	@Test
	public void sendSingleMessageTest(){
		String msg = "您的验证码为253698";
		String sendPhoneNum = "14896328524";//14896328523 : 空号；15700099155 ： 移动正常号
		String ScheduleTime = "";
		String f = "1";
		Integer moduleId = 1;
		String currentIp = "127.0.0.1";//IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		
		try {
			AppSendShortmessage posRresult = shortMessageService.sendSingleMessage(msg, sendPhoneNum, ScheduleTime, f, moduleId, currentIp);
			logger.debug(posRresult);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
