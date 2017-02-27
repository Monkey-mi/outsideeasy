package common.user.service;


import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.Const;
import util.WebUtil;

import common.email.model.AppSendEmailinfo;
import common.email.service.AppSendEmailinfoService;
import common.user.data.RegAccoutCompanyInfoMapper;
import common.user.data.RegAccoutMapper;
import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegAccoutCompanyInfo;
import common.user.model.RegSalt;
import common.user.model.TempCompany;


@Service
public class RegAccoutService {
	@Autowired
	private RegAccoutMapper mapper;
	@Autowired
	private RegAccoutCompanyInfoMapper rMapper;
	@Autowired
	private AppSendEmailinfoService emailService;	

	public List<RegAccout> getRegAccoutList(Map<String,Object> params) {
		return mapper.getRegAccoutList(params);
	}
	
	/**
	 * 判断用户名是否有效
	 *2016-3-14上午9:31:43
	 *isValidUser
	 *return:boolean
	 * mishengliang
	 */
	public boolean isValidUser(Map<String,Object>map){
		return mapper.getRegAccoutList(map).size()>0;
	}
	
	
	/**
	 * 用户注册
	 *2016-3-18下午3:35:25
	 *addRegAccout
	 *return:Map<String,Object>
	 * mishengliang
	 */
	public Map<String,Object> addRegAccout(RegAccout regAccout,String UUID,String companyName) {
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		Integer companyId = 0;//公司ID
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("UUID", UUID);

		emailInfo=emailService.getAppSendEmailinfoList(params);
		if (emailInfo == null) {
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
		} else {
			Date sendEmailDate = emailInfo.getSendTime();
			Integer isValid = emailInfo.getIsValid();//邮件有效标记  1：无效   0：有效
			if (isValid == 1) {
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
			}else{
				Date sendDate=(Date)sendEmailDate;
				//验证时间是否过期
				Calendar calendar=Calendar.getInstance();
				calendar.setTime(sendDate);
				calendar.add(Calendar.HOUR, 24);
				//发送邮件之后24小时的时间
				Date TimeSpan=calendar.getTime();
				//当前时间超过了24小时
				if(TimeSpan.before(new Date()))
				{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
				}
				else
				{
					if(!WebUtil.isEmpty(companyName))
					{
						TempCompany cinfo=new TempCompany();
						cinfo.setCompany_name(companyName);
						cinfo.setCreate_dt(new Date());
						mapper.addCompany(cinfo);
						companyId=cinfo.getCompany_id();
					}
					if(companyId>0)
					{
						regAccout.setCompany_id(companyId);
					}
					mapper.addRegAccout(regAccout);
					params.put("isValid", 1);//设置为已使用，即为无效验证邮箱
					emailService.updateEmailValid(params);//更新验证邮件的有效性

					respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
				}
			}
		}
		return respMap;
	}
	
	/**
	 * 验证邮件注册时间是否过时
	*isOutTimeEmail
	*@param UUID
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-17上午11:18:47
	 */
	public Map<String,Object> isOutTimeEmail(String UUID,String email,String regId){
		
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		Map<String,Object> params = new HashMap<String, Object>();
		Integer emailValid = 1;//0：未验证     1：已验证
		Map<String,Object> paramsForUpdateEmailValid = new HashMap<String, Object>();
		params.put("UUID", UUID);
		
		emailInfo=emailService.getAppSendEmailinfoList(params);
		
		Date sendEmailDate = emailInfo.getSendTime();
		Date sendDate=(Date)sendEmailDate;
		//验证时间是否过期
		Calendar calendar=Calendar.getInstance();
		calendar.setTime(sendDate);
		calendar.add(Calendar.HOUR, 24);
		//发送邮件之后24小时的时间
		Date TimeSpan=calendar.getTime();
		//当前时间超过了24小时
		if(TimeSpan.before(new Date()))
		{
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
		}else{
			//修改邮件的有效字段   按email更新
			paramsForUpdateEmailValid.put("reg_email", email);
			paramsForUpdateEmailValid.put("email_valid", emailValid);
			paramsForUpdateEmailValid.put("reg_id", regId);
			mapper.updateRegAccoutEamilValid(paramsForUpdateEmailValid);
			
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
		}
		
		return respMap;
	}
	
	/**
	 * salt加密用户注册
	 *addRegAccout
	 *return:Map<String,Object>
	 * yukai
	 */
	public Map<String,Object> addRegAccout(RegAccout regAccout,String UUID,String companyName,String salt) {
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		RegAccoutCompanyInfo regAccoutCompanyInfo=new RegAccoutCompanyInfo();
		Integer companyId = 0;//公司ID
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("UUID", UUID);

		emailInfo=emailService.getAppSendEmailinfoList(params);
		if (emailInfo == null) {
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
		} else {
			Date sendEmailDate = emailInfo.getSendTime();
			Integer isValid = emailInfo.getIsValid();//邮件有效标记  1：无效   0：有效
			if (isValid == 1) {
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
			}
			else
			{
				Date sendDate=(Date)sendEmailDate;
				//验证时间是否过期
				Calendar calendar=Calendar.getInstance();
				calendar.setTime(sendDate);
				calendar.add(Calendar.HOUR, 24);
				//发送邮件之后24小时的时间
				Date TimeSpan=calendar.getTime();
				//当前时间超过了24小时
				if(TimeSpan.before(new Date()))
				{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
				}
				else
				{
					if(!WebUtil.isEmpty(companyName))
					{
						TempCompany cinfo=new TempCompany();
						cinfo.setCompany_name(companyName);
						cinfo.setCreate_dt(new Date());
						cinfo.setIs_main(1);
						mapper.addCompany(cinfo);
						companyId=cinfo.getCompany_id();
					}
					if(companyId>0)
					{
						regAccoutCompanyInfo.setCompany_id(companyId);
					}
					if(!WebUtil.isEmpty(salt))
					{
						RegSalt rs=new RegSalt();
						rs.setSalt(salt);
						rs.setAcc_name(regAccout.getAcc_name());
						mapper.addSalt(rs);
					}
					mapper.addRegAccout(regAccout);
					regAccoutCompanyInfo.setReg_id(regAccout.getReg_id());
					rMapper.addRegAccoutCompanyInfo(regAccoutCompanyInfo);
					params.put("isValid", 1);//设置为已使用，即为无效验证邮箱
					emailService.updateEmailValid(params);//更新验证邮件的有效性

					respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
				}
			}
		}
		return respMap;
	}
					
	/**
	 * 更新账号信息
	 *2016-3-14上午10:33:07
	 *updateRegAccout
	 *return:void
	 * mishengliang
	 */
	public void updateRegAccout(LoginAccount loginAccount) {
			mapper.updateRegAccout(loginAccount);
	}
	
	/**
	 * @Description: 更新账号上的电话号
	 * RegAccoutService
	 * updateRegAccoutById
	 * @param loginAccount void
	 * @author mishengliang
	 * 2016-8-15 下午4:18:58
	 */
	public void updateRegAccoutById(LoginAccount loginAccount) {
		mapper.updateRegAccoutById(loginAccount);
	}
	
	public void updateRegAccoutEmail(RegAccout regAccout){
			mapper.updateRegAccoutEmail(regAccout);
	}
	
	public void deleteRegAccout(RegAccout[] arr) {
		for(RegAccout obj: arr) {
			mapper.deleteRegAccout(obj);
		}
	}
	
	/**
	 * email是否被注册
	 *2016-3-9上午10:13:27
	 *emailIsUsed
	 *return:String
	 * mishengliang
	 */
	public Map<String, Object>  emailIsUsed(Map<String,Object> params){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		resMap.put("success", true);
		List<RegAccout> accountList= mapper.getRegAccoutList(params);
		Integer count = accountList.size();
		
		resMap.put("statu", count>0);
		resMap.put("accountList", accountList);
		return resMap;
	}
	
	/**
	 * 公司名是否被注册
	 *2016-3-9上午10:13:46
	 *companyNameIsUsed
	 *return:String
	 * mishengliang
	 */
	public Map<String, Object>  companyNameIsUsed(Map<String,Object> params){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		resMap.put("success", true);
		Boolean companyStatu = mapper.getUserCompanyNameCount(params)>0;
		resMap.put("statu",companyStatu);
		return resMap;
	}
	
	/**
	 * 验证登录名是否被注册
	 *2016-3-9上午11:26:10
	 *nameIsUsed
	 *return:String
	 * mishengliang
	 */
	public Map<String, Object>  nameIsUsed(Map<String,Object> params){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		resMap.put("success", true);
		int count = mapper.getUserNameCount(params);
		resMap.put("statu", count>0);
		return resMap;
	}
	
	/**
	 * 根据账户名修改密码
	 *2016-3-14上午10:36:00
	 *updateRegAccoutPsw
	 *return:void
	 * mishengliang
	 */
	public void updateRegAccoutPsw(RegAccout regAccount){
		mapper.updateRegAccoutPsw(regAccount);
	}
	
	public boolean chkUserPwd(Map<String,Object>map){
		return mapper.getRegAccoutList(map).size()>0;
	}
	
	/**
	 * 判断账号是否为用户名或者注册邮箱
	 *2016-3-14下午5:49:47
	 *isUser
	 *return:RegAccout
	 * mishengliang
	 * update by yangliping 2016-03-17
	 */
	public RegAccout getUserbyAccnameOrEmail(String loginid_or_email){
		
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("accname_or_email", loginid_or_email.trim());
		
		List<RegAccout> accountUser=mapper.getRegAccoutList(params);
		if(accountUser.size()>0)
		{
			return accountUser.get(0);
		}
		else
		{
			return null;
		}
	}

	/**
	 * 根据账户名获取相应盐值
	 *getRegSaltbyAccname
	 *return:RegSalt
	 * yukai
	 */
	public RegSalt getRegSaltbyAccname(String accname) {
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("accname", accname.trim());
		
		List<RegSalt> rSalts=mapper.getRegSaltList(params);
		if(rSalts.size()>0)
		{
			return rSalts.get(0);
		}
		else
		{
			return null;
		}
	}
	/**
	 * 保存盐值
	 *updateRegSalt
	 *return:void
	 * yukai
	 */
	public void addSalt(RegSalt rs) {
		mapper.addSalt(rs);
	}
	/**
	 * 根据账户名修改盐值
	 *updateRegSalt
	 *return:void
	 * yukai
	 */
	public void updateRegSalt(RegSalt rs) {
		mapper.updateRegSalt(rs);
	}
	
	/**
	 * 根据账户名删除盐值
	 *updateRegSalt
	 *return:void
	 * yukai
	 */
	public void deleteRegSalt(String  acc_name) {
		mapper.deleteRegSalt(acc_name);
	}
	
	/**
	 * 判断邮箱链接有效性
	 * 1.是否已经使用过
	 * 2.是否已经过时
	*checkEmailValid
	*@param UUID 具有唯一性
	*@return
	*Boolean
	*@author mishengliang
	*2016-5-31下午5:01:20
	 */
	public Boolean checkEmailValid(String UUID){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("UUID", UUID);
		AppSendEmailinfo appSendEmailinfo = emailService.getAppSendEmailinfoList(params);
		
		if(appSendEmailinfo == null){//无数据
			return false;
		}else if(appSendEmailinfo.getIsValid() == 1){//有数据，已使用过
			return false;
		}else{//未使用过
			Date sendEmailDate = appSendEmailinfo.getSendTime();
			Date sendDate=(Date)sendEmailDate;
			//验证时间是否过期
			Calendar calendar=Calendar.getInstance();
			calendar.setTime(sendDate);
			calendar.add(Calendar.HOUR, 24);
			//发送邮件之后24小时的时间
			Date TimeSpan=calendar.getTime();
			//当前时间超过了24小时
			if(TimeSpan.before(new Date())){//超过时间失效
				return false;
			}
		}
		return true;
	}
	
	/**
	 * 更新账号登录的最新IP地址
	*updateLastIpAddress
	*@param params
	*void
	*@author mishengliang
	*2016-6-22下午4:41:58
	 */
	public void updateLastIpAddress(Map<String, Object> params){
		mapper.updateLastIpAddress(params);
	}
	
	/**
	 * @Description:新增主账号和公司联系
	 * RegAccoutService
	 * addRegAccoutCompanyInfo
	 * @param regAccoutCompanyInfo void
	 * @author yukai
	 * 2016-8-4 上午9:31:58
	 */
	public void addRegAccoutCompanyInfo(RegAccoutCompanyInfo regAccoutCompanyInfo) {
		rMapper.addRegAccoutCompanyInfo(regAccoutCompanyInfo);
	}
}
