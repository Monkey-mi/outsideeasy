package common.user.controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import manager.common.main.model.SRMLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import usercenter.subAccount.model.SubAccount;
import usercenter.subAccount.service.SubAccountService;
import util.AppUtils;
import util.Const;
import util.CryptoUtils;
import util.DataTrans;
import util.HttpRequestUtils;
import util.IpAddressUtils;
import util.MD5Util;
import util.MyJsonUtil;
import util.MySessionContext;
import util.PublishInfo;
import util.SRMStringUtil;
import util.SendEmail;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;
import util.properties.OpenClose;

import common.email.model.AppSendEmailinfo;
import common.email.service.AppSendEmailinfoService;
import common.model.LoginUser;
import common.shortmessage.model.AppSendShortmessage;
import common.shortmessage.service.AppSendShortmessageService;
import common.sysmodule.service.SysRoleService;
import common.user.model.IpAddress;
import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegSalt;
import common.user.model.RoleAccountRef;
import common.user.service.IpAddressDoService;
import common.user.service.RegAccoutService;
import common.user.service.RoleAccountRefService;

@Controller
@RequestMapping("userInfo")
public class RegAccoutCtrl{
	@Autowired
	private RegAccoutService regAccoutService;
	@Autowired
	private AppSendEmailinfoService emailService;
	@Autowired
	private AppSendShortmessageService shortMessageService;
	@Autowired
	private SysRoleService sysRoleService;
	@Autowired
	private SubAccountService subService;
	@Autowired
	private IpAddressDoService ipAddressService;
	//子账号与角色关联表
	@Autowired
	private RoleAccountRefService roleAccountRefService;
	
	@RequestMapping(value = { "/register" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_register(ModelAndView modelAndView ){
		modelAndView.setViewName("/register");
		return modelAndView;
	}
	@RequestMapping(value = { "/findPwd" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_findPwd(ModelAndView modelAndView ){
		modelAndView.setViewName("/findPwd");
		return modelAndView;
	}
	@RequestMapping(value = { "/updatePwd" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_updatePwd(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/accountManage/updatePwd");
		return modelAndView;
	}
	@RequestMapping(value = { "/safeAccount" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_safeAccount(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/accountManage/safeAccount");
		return modelAndView;
	}
	@RequestMapping(value = { "/updateEmail" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_updateEmail(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/accountManage/updateEmail");
		return modelAndView;
	}
	@RequestMapping(value = { "/vipFindPwd" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_vipFindPwd(ModelAndView modelAndView ){
		modelAndView.setViewName("/vip/vipFindPwd");
		return modelAndView;
	}
	@RequestMapping(value = { "/vipregister" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_vipregister(ModelAndView modelAndView ){
		modelAndView.setViewName("/vip/vipregister");
		return modelAndView;
	}
	@RequestMapping(value = { "/emailValid" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_emailValid(ModelAndView modelAndView ){
		modelAndView.setViewName("/emailValid");
		return modelAndView;
	}
	
	/**
	*regAccout
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	 */
	@DocLogger(explain="用户注册")
	@RequestMapping(value="/applyRegAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> regAccout(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Byte emailValid = 1;//更新为已验证
		String email=request.getParameter("email");//E-mail
		String UUID=request.getParameter("UUID");//认证码
		String company_name=request.getParameter("company_name");//公司名
		String acc_name=request.getParameter("acc_name");//账户名
		String acc_pwd=request.getParameter("acc_pwd");//账户密码
		String reg_phone=request.getParameter("reg_phone");//登录手机
		String salt = CryptoUtils.getSalt();//登录盐值
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		
		RegAccout regAccout=new RegAccout();

		//将前端的数据分装到对象中
		if(!WebUtil.isEmpty(reg_phone))
		{
			regAccout.setReg_phone(reg_phone);
		}
		regAccout.setAcc_name(acc_name);
		regAccout.setRole_id(1);
		regAccout.setPassword(CryptoUtils.getHash(MD5Util.encode2hex(acc_pwd), salt));//salt加密
		regAccout.setReg_email(email);
		regAccout.setReg_date(new Date());
		regAccout.setEnabled(0);//启用状态
		regAccout.setEmail_valid(emailValid);
		regAccout.setLast_login_ip(currentIp);
		
		//将对象传递到service处理
		respMap = regAccoutService.addRegAccout(regAccout,UUID,company_name,salt);//salt加密
		
		//日志暂时使用登录名信息
		LoginAccount loginAccount = new LoginAccount();
		loginAccount.setLogin_name(acc_name);
		SessionUtil.setAttribute(Const.SESSION_PLATFORM_LOGIN_USER,loginAccount);
		
		return respMap;
	}
	
	/**
	 * 验证邮箱注册时间是否过时  未过时，修改邮箱的有效字段 email_valid
	*isOutTimeEmail
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-17上午11:26:03
	 */
	@RequestMapping(value="/isOutTimeEmail.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> isOutTimeEmail(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String UUID = request.getParameter("UUID");
		String email = request.getParameter("email");
		String regId = request.getParameter("regId");
		respMap = regAccoutService.isOutTimeEmail(UUID,email,regId);
		return respMap;
	}
	
	/**
	 * 检查邮件的有效性
	*checkEmailValid
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-31下午6:22:51
	 */
	@RequestMapping(value="/checkEmailValid.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> checkEmailValid(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String UUID = request.getParameter("UUID");
		
		try {
			Boolean isValid = regAccoutService.checkEmailValid(UUID);
			respMap.put("isValid", isValid);
			respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			respMap.put(Const.AJAX_SERVICE_TOTAL, 0);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "操作失败");
			respMap.put(Const.AJAX_SERVICE_SUCCESS, "false");
		}
		return respMap;
	}

    /**
	 * 邮箱是否被注册*/
	@RequestMapping(value="/emailIsUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> emailIsUsed(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String email = request.getParameter("email");//获取email
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("reg_email", email);
		return regAccoutService.emailIsUsed(params);
	}
	
	/**
	 * 验证公司名是否被使用
	 *2016-3-9上午10:11:50
	 *companyNameIsUsed
	 *return:String
	 * mishengliang
	 */
	@RequestMapping(value="/companyNameIsUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> companyNameIsUsed(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String companyName = request.getParameter("companyName");//获取companyName
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("companyName", companyName);
		return regAccoutService.companyNameIsUsed(params);
	}
		
	/**
	 * 验证登录名是否被注册
	 *2016-3-9上午11:24:31
	 *nameIsUsed
	 *return:String
	 * mishengliang
	 */
	@RequestMapping(value="/nameIsUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> nameIsUsed(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String userName = request.getParameter("userName");//获取companyName
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("userName", userName);
		return regAccoutService.nameIsUsed(params);
	}
	
	/**
	 * 找回密码发送邮件方法
	 *2016-3-11下午3:09:15
	 *sendEmailToFindPwd
	 *return:Map<String,Object>
	 * mishengliang
	 */
    @RequestMapping(value="sendEmailToFindPwd.do",method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> sendEmailToFindPwd(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		String UUID = SRMStringUtil.getUUID();
		
		String acc_name = request.getParameter("acc_name");
		String registerEmail=request.getParameter("hidden_Email");
		String vCode = request.getParameter("verify_code");
		String isVip = request.getParameter("isVip");
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession)){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				int flag = 1;
				String urlLink = "/userInfo/findPwd.htm?";
				if("isVip".equals(isVip)){//如果为vip请求
					urlLink = "/userInfo/vipFindPwd.htm?";
				}
		        String content = "我们收到了您重设密码的请求。如果您未提出此请求，请忽略此邮件；否则，请点击\"下一步\"重设您的密码。";
		        String spanContent = "下一步";
		        //acc_name = "&acc_name="+acc_name;
		        acc_name = "&acc_name="+ URLEncoder.encode( URLEncoder.encode(acc_name,"UTF-8"), "UTF-8");//如果出现中文，可将其编码
		        StringBuffer sb = sendEmileBase(flag,emailInfo,urlLink,registerEmail,acc_name,UUID,content,spanContent);
		        
		        //发送邮件
		        SendEmail.send(registerEmail,"找回密码邮件",sb.toString());
		        respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
    }
       
    /**
     * 找回密码之修改用户密码
     *2016-3-11下午5:47:39
     *updatePwdByFindPwd
     *return:Map<String,Object>
     * mishengliang
     */
    @RequestMapping(value="/updatePwdByFindPwd.do",method=RequestMethod.POST)
    @ResponseBody 
    public Map<String,Object> updatePwdByFindPwd(HttpServletRequest request,HttpServletResponse response)throws Exception {
    	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
    	Map<String,Object> params = new HashMap<String, Object>();
    	String new_pwd=request.getParameter("new_pwd");
    	String vCode = request.getParameter("verify_code");
    	String email = request.getParameter("email");//获取email
    	String UUID = request.getParameter("UUID");//激活码
    	String salt = CryptoUtils.getSalt();//生成登录盐值
    	if(WebUtil.isEmpty(vCode))
    		vCode ="";
    	String vCodeInSession="";
    	AppSendEmailinfo emailInfo = new AppSendEmailinfo();
    	Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
    	if(!WebUtil.isEmpty(vCodeObjInSession))
    		vCodeInSession =vCodeObjInSession.toString();
    	if(!vCode.equalsIgnoreCase(vCodeInSession)){
    		respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
    	}else{
    		params.put("UUID", UUID);
    		emailInfo=emailService.getAppSendEmailinfoList(params);
    		if(emailInfo == null){//UUID被修改或无效
    			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
    		}else{//UUID有效
    			Date sendEmailDate = emailInfo.getSendTime();
    			Integer isValid = emailInfo.getIsValid();//邮件有效标记  1：无效   0：有效
    			if(isValid == 1){
    				respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
    			}else{
    				Date sendDate=(Date)sendEmailDate;
    				//验证时间是否过期
    				Calendar calendar=Calendar.getInstance();
    				calendar.setTime(sendDate);
    				calendar.add(Calendar.HOUR, 1);
    				//发送邮件之后1小时的时间
    				Date TimeSpan=calendar.getTime();
    				//当前时间超过了1小时
    				if(TimeSpan.before(new Date())){
    					respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
    				}else{	
    					if(!emailInfo.getEmail().equals(email)){
    						respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证邮箱不匹配!");
    					}else{
    						try{
    							RegAccout regAccount = new RegAccout();
    							String acc_name = request.getParameter("acc_name");
    							regAccount.setAcc_name(URLDecoder.decode(URLDecoder.decode(acc_name,"UTF-8"), "UTF-8"));
    							regAccount.setReg_date(new Date());
    							//regAccount.setPassword(new_pwd);
    							
    							//salt加密
    							regAccount.setPassword(CryptoUtils.getHash(new_pwd, salt));
    							RegSalt rs=new RegSalt();
    							rs.setAcc_name(URLDecoder.decode(URLDecoder.decode(acc_name,"UTF-8"), "UTF-8"));
    							rs.setSalt(salt);
    							regAccoutService.updateRegSalt(rs);//更新盐值
    							
    							regAccoutService.updateRegAccoutPsw(regAccount);
    							params.put("isValid", 1);//设置为已使用，即为无效验证邮箱
    							emailService.updateEmailValid(params);//更新验证邮件的有效性
    							
    							respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
    							respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
    						}catch(Exception e){
    							WebUtil.makeErrorMsg(e, respMap);
    						}
    						
    					}
    				}
    			}
    		}
    		
    	}
    	return respMap;
    }
    
    /**
     * 注册账号之邮箱验证
     *2016-3-13下午2:20:22
     *sendEmailToRegAccount
     *return:Map<String,Object>
     * mishengliang
     */
	@RequestMapping(value="/sendEmailToRegAccount.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public Map<String,Object> sendEmailToRegAccount(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		String UUID = SRMStringUtil.getUUID();
		String vCode=request.getParameter("verify_code");
		String registerEmail=request.getParameter("email");
		String isVip=request.getParameter("isVip");
		String urlLink="/userInfo/register.htm?";
		if("isVip".equals(isVip)){//如果为vip发送邮件，则跳转到相应的vip页面
			urlLink="/userInfo/vipregister.htm?";
		}
		String regIdLink = "";
		if(request.getParameter("urlLink") != null){
			urlLink = request.getParameter("urlLink")+"?";
			regIdLink = "&idForReg=" + request.getParameter("regId");
		}
		
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession)){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				int flag = 0;
		        String content = "请确认您的邮箱，只差一步，您的验证就成功了！（请在24小时内完成）：";
		        String spanContent = "完 &nbsp;&nbsp;成";
		        String acc_name = regIdLink;
		        StringBuffer sb = sendEmileBase(flag,emailInfo,urlLink,registerEmail,acc_name,UUID,content,spanContent);
		        
		        //发送邮件
		        SendEmail.send(registerEmail,"邮箱验证",sb.toString());
		        respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}
	
	/**
	 * 找回密码之获取注册邮箱,根据登录账号名获取当前用户注册邮箱    暂时没有用到，可能之后不会用到，被isUser代替
	 *2016-3-14上午9:27:15
	 *getRegisterEmail
	 *return:Map<String,Object>
	 * mishengliang
	 */
	@RequestMapping(value="/getRegisterEmail.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getRegisterEmail(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		paramsMap.put("acc_name",request.getParameter("acc_name"));
		String vCode = request.getParameter("verify_code");
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession)){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				//先校验用户有效性
				Map<String,Object> paramsMap1 = new HashMap<String,Object>();
				paramsMap1.put("acc_name",request.getParameter("acc_name"));
				if(!regAccoutService.isValidUser(paramsMap1)){
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "无效用户!");
				}else{
					//获取当前用户信息
					RegAccout regAccout = regAccoutService.getRegAccoutList(paramsMap).get(0);
						if(regAccout.getReg_email() == null || regAccout.getReg_email().equals("")){
							respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
							respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前账号无注册邮箱！");
							respMap.put("registerEmail","");
						}else{
							respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
							respMap.put(Const.AJAX_SERVICE_MESSAGE, "success!");
							respMap.put("registerEmail",regAccout.getReg_email());
						}
				}
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}
	
	/**
	 * 登录界面
	 *2016-3-14上午11:42:44
	 *doLogin
	 *return:Map<String,Object>
	 * mishengliang
	 * update by yangliping 2016-03-17 代码优化
	 * update by mishengliang 2016-05-16 新增子账号登录，且主账号登录方法重构时抽离
	 */
	@DocLogger(explain="前台登录")
	@RequestMapping(value="/doLogin.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> doLogin(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String nameOrEmail = request.getParameter("nameOrEmail");//输入的账号名
		String vCode = request.getParameter("verify_code");//验证码
		Integer errorNum = Integer.parseInt(request.getParameter("errorNum")); //接收错误次数
		
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))//获取的验证码不为空
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession)&&errorNum>=2){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				if(nameOrEmail.indexOf(":") == -1){
					doMainLogin(request, respMap, nameOrEmail);//主账号登录
				}else if(nameOrEmail.indexOf(":") == nameOrEmail.lastIndexOf(":")){
					doSubLogin(request, respMap, nameOrEmail);//子账号登录
				}else{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号不存在");
				}
			}catch(Exception e){
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "登录失败");
				respMap.put("reason", e.toString());
			}
		}
		return respMap;
	}

	/**
	 * 主账号登录
	*doMainLogin
	*@param request
	*@param respMap
	*@param nameOrEmail 输入的账户名
	*void
	*@author mishengliang
	*2016-5-16下午1:56:40
	*/
	private void doMainLogin(HttpServletRequest request,Map<String, Object> respMap, String nameOrEmail) {
		Integer isLogin = Integer.parseInt(request.getParameter("isLogin"));//判断用户是否设置了记住账户  1：记住  0：未记住
		RegAccout account= regAccoutService.getUserbyAccnameOrEmail(nameOrEmail);//根据name或者Email判断是否存在
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		
		if(account == null){//先校验用户有效性
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "用户不存在！");
		}else if(account.getEnabled() == 1){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "您的账号已管理员禁用");
		}else if(account.getEmail_valid() == null || account.getEmail_valid() != 1){//邮箱未认证 此处需要增加IP记录 
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "");//不显示信息出来 
			respMap.put("regEmail",account.getReg_email());
			respMap.put("regId",account.getReg_id());
			respMap.put("emailValid", "false");
		}else if(account.getEmail_valid() == 1){//用户邮箱有效
			if("close".equals(OpenClose.getPropertiesByKey("isIpValid"))){//不用IP验证 //直接登录操作
				mainLoginDirect(request, respMap, isLogin, account); 
			}else if(!currentIp.equals(account.getLast_login_ip())){//不是上一次登录的地址
				Map<String, Object> paramsForIp = new HashMap<String, Object>();
				paramsForIp.put("loginId", account.getAcc_name());
				List<IpAddress> ipAddressList = ipAddressService.getIpAddressList(paramsForIp);//获取此账户下的非失效IP信息
				
				if(ipAddressList.size() == 0){//未有IP信息
					respMap.put("ipValid", "false");
					respMap.put("email", AppUtils.hideEmail(account.getReg_email()));
					respMap.put("phone", AppUtils.hidePhoneNum(account.getReg_phone()));
				}else{//存在IP信息
					int ipNumFlag = 0;//遍历元素结合的标记位
					for(IpAddress ipa : ipAddressList){//遍历其中的IP信息
						if(currentIp.equals(ipa.getIp_address())){//存在和当前一致的IP地址
							//Map<String, Object> paramsForUpdateLastIpAddress = new HashMap<String, Object>();
							
							if(ipa.getIp_state() == 1){//常用IP
								mainLoginDirect(request, respMap, isLogin, account);
								/*paramsForUpdateLastIpAddress.put("lastLoginIp", currentIp);
								paramsForUpdateLastIpAddress.put("accName", account.getAcc_name());
								regAccoutService.updateLastIpAddress(paramsForUpdateLastIpAddress);*/
								updateMainLastIpAndTime(currentIp, account.getAcc_name());
								break;
							}else if(ipa.getIp_state() == 0){//临时IP
			    				Date sendDate = ipa.getCreate_time();
			    				//验证时间是否过期
			    				Calendar calendar=Calendar.getInstance();
			    				calendar.setTime(sendDate);
			    				calendar.add(Calendar.HOUR, 24);
			    				//发送邮件之后24小时的时间
			    				Date TimeSpan=calendar.getTime();
			    				
								if(TimeSpan.after(new Date())){//临时IP未超时:手机或邮箱验证24小时内有效
									mainLoginDirect(request, respMap, isLogin, account);
									/*paramsForUpdateLastIpAddress.put("lastLoginIp", currentIp);
									paramsForUpdateLastIpAddress.put("accName", account.getAcc_name());
									regAccoutService.updateLastIpAddress(paramsForUpdateLastIpAddress);*/
									updateMainLastIpAndTime(currentIp, account.getAcc_name());
									break;
								}
							}
						}
						ipNumFlag++;//标记位+1
					}
					if(ipNumFlag == ipAddressList.size()){//未匹配到任何信息
						respMap.put("ipValid", "false");
						respMap.put("email", AppUtils.hideEmail(account.getReg_email()));
						respMap.put("phone", AppUtils.hidePhoneNum(account.getReg_phone()));
					}
				}
			}else{//和上一次登录地址相同 
				mainLoginDirect(request, respMap, isLogin, account);
			}
		}
	}

	/**
	 * 直接登录账户
	*mainLoginDirect
	*@param request
	*@param respMap
	*@param isLogin
	*@param account
	*void
	*@author mishengliang
	*2016-6-22下午3:28:14
	*/
	private void mainLoginDirect(HttpServletRequest request,Map<String, Object> respMap, Integer isLogin, RegAccout account) {
		//salt加密
		RegSalt rs=regAccoutService.getRegSaltbyAccname(account.getAcc_name());
		if (rs==null) {
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "无效用户！");
		}else{
			String password=account.getPassword();
			String password1=request.getParameter("password");
			String isVip=request.getParameter("isVip");
			String salt=rs.getSalt();
			if(CryptoUtils.verify(password, password1, salt)){//密码正确
				//将登陆的账号信息放入session的指定对象中*新  之后用来取代SESSION_PLATFORM_USER
				LoginAccount loginAccount = new LoginAccount();
				loginAccount.setLogin_id(account.getReg_id());
				loginAccount.setRole_id(account.getRole_id());
				loginAccount.setLogin_name(account.getAcc_name());
				loginAccount.setPassword(account.getPassword());
				loginAccount.setAccount_email(account.getReg_email());
				loginAccount.setEmail_valid(account.getEmail_valid());
				loginAccount.setAccount_phone(account.getReg_phone());
				loginAccount.setReg_date(account.getReg_date());
				loginAccount.setEnabled(account.getEnabled());
				loginAccount.setUpdate_date(account.getUpdate_date());
				loginAccount.setAccount_type(0);
				loginAccount.setLast_login_ip(account.getLast_login_ip());
				loginAccount.setVip("isVip".equals(isVip) ? true:false);
				
				//保存当前登录用户信息到session中，key：platform_user
				SessionUtil.setAttribute(Const.LOGIN_TYPE,0);
				SessionUtil.setAttribute(Const.SESSION_PLATFORM_USER,account);
				SessionUtil.setAttribute(Const.SESSION_PLATFORM_LOGIN_USER,loginAccount);
				SessionUtil.setAttribute(Const.SESSION_IP, getClientIP(request));//保存客户端登陆ip
				SessionUtil.setAttribute(Const.SESSION_CSRFTOKEN,SRMStringUtil.getUUID());//创建token，防CSRF
				
				//网页对象列表
				Map<String,Object> params3 = new HashMap<String,Object>();
				//这个 需要改成 登陆的账号
				params3.put("role_id", account.getRole_id());
				SessionUtil.setAttribute(Const.SESSION_URL_LIST,sysRoleService.getUrlListByRole_id(params3));
				
				respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put("emailValid", "true");
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "登录成功！");
				respMap.put("loginName",account.getAcc_name());
				respMap.put("regEmail",account.getReg_email());
				//单用户登陆
				limitLoginOne(account.getReg_id(),account.getAcc_name(),1,request);
				
				if(isLogin == 1){//将session值保存时间放在之后，避免出现无session赋值情况下的空指针
					SessionUtil.setSessionTime(60*60*24*7);//一周
				}else{
					SessionUtil.setSessionTime(60*30);//30分钟
				}
				//addLog2(request,loginAccount);
				respMap.put("pw", true);
			}else{//密码不正确
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "密码错误!请重新输入。");
				respMap.put("pw", false);
			}
		}
	}
	
	/**
	* @Description: 单用户登陆
	 * 判断当前用户是否登录，
	 * 如果已经登陆,并且不是同一地点，从自定义session缓存删除 旧session的引用，移除session属性，再更新LoginUser的sessionid,最后保存新session的引用.
	 * 如果已经登陆,并且是同一地点，不处理
	 * 如果尚未登录，直接保存新session的引用，保存新建的LoginUser
	 * 
	 * 注意：当前 只对 门户登陆做了管控，extjs的没做控制
	* @param id 用户表主键
	* @param name 用户名 or 账号名
	* @param type 账号类型：1 注册账号；2 子账号 3 后台管理账号
	* @param request
	* @author xufeng
	* @date 2016-6-2 
	*/
	private void limitLoginOne(int id,String name,int type,HttpServletRequest request){
		if(!"open".equals(OpenClose.getPropertiesByKey("openSingleLogin"))){
			return;
		}
		List<LoginUser> userlist=SessionUtil.getUserlist();
		MySessionContext sessionContext=MySessionContext.getInstance();
		
		synchronized(userlist){
			Iterator<LoginUser> ite=userlist.iterator();
			LoginUser toupdate=null;
			boolean haslogin=false;//默认当前账号未登录
			while (ite.hasNext()){
				LoginUser oneuser=ite.next();
				//出现账号重复登录
				if(id==oneuser.getU_id() && type==oneuser.getType()){
					haslogin=true;
					//并且不是同一个sessionid,理解为不是同一地点
					if(!oneuser.getSession_id().equals(SessionUtil.getSessionID())){
						toupdate=oneuser;
					}
				}
			}
			//要删除
			if(toupdate!=null){
				String sessionid=toupdate.getSession_id();
				//自定义session缓存删除 旧session的引用
				HttpSession todelsession=sessionContext.getSession(sessionid);
				sessionContext.DelSession(todelsession);
				//移除session属性
				if(todelsession!=null){
					@SuppressWarnings("unchecked")
					Enumeration<String> attNames=todelsession.getAttributeNames();
					while(attNames.hasMoreElements()){
						String pName =attNames.nextElement();
						todelsession.removeAttribute(pName);
					}
					//用来标记是被踢下线的，区分超时登陆
					todelsession.setAttribute("beKick", 1);
				}
				//保存新session的引用
				HttpSession newHttpSession=request.getSession(false);
				sessionContext.AddSession(newHttpSession);
				//更新LoginUser的sessionid
				toupdate.setSession_id(newHttpSession.getId());
			}
			//未登录的
			if(!haslogin){
				//保存新session的引用
				HttpSession newHttpSession=request.getSession(false);
				//取消  标记是被踢下线的，区分超时登陆
				newHttpSession.setAttribute("beKick", 0);
				sessionContext.AddSession(newHttpSession);
				//保存新建的LoginUser
				LoginUser newLoginUser=new LoginUser();
				newLoginUser.setLogin_time(new Date());
				newLoginUser.setName(name);
				newLoginUser.setSession_id(newHttpSession.getId());
				newLoginUser.setType(type);
				newLoginUser.setU_id(id);
				userlist.add(newLoginUser);
			}
		}
	}
	
	/**
	 * 子账号登录
	*doSubLogin
	*@param request
	*@param respMap
	*@param nameOrEmail
	*void
	*@author mishengliang
	*2016-5-16下午2:24:58
	 */
	private void doSubLogin(HttpServletRequest request,Map<String, Object> respMap, String nameOrEmail){
		Integer isLogin = Integer.parseInt(request.getParameter("isLogin"));//判断用户是否设置了记住账户  1：记住  0：未记住
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("sa_name", nameOrEmail);
		
		List<SubAccount> subAccountList = subService.getSubAccountByName(params);//使用subAccount包中的service方法 获取子账号信息
		if(subAccountList.size() == 0){//不存在子账号
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号不存在");
			return;
		}
		
		SubAccount subAccount = subAccountList.get(0);
		params.put("reg_id", subAccount.getReg_id());
		RegAccout account= regAccoutService.getRegAccoutList(params).get(0);
		if(account.getEnabled() == 1){//主账号被禁用
			respMap.put(Const.AJAX_SERVICE_MESSAGE,"您当前的主账号已被禁用");
			return;
		}else if(subAccount.getEnabled() == 1){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "您的账号已管理员禁用");
			return;
		}
		if("close".equals(OpenClose.getPropertiesByKey("isIpValid"))){//不用IP验证 //直接登录操作
			subLoginDirect(request, respMap, isLogin, subAccount, account);
		}else if(!currentIp.equals(subAccount.getLast_login_ip())){//IP验证 //不是上一次登录的地址
			Map<String, Object> paramsForIp = new HashMap<String, Object>();
			paramsForIp.put("loginId", subAccount.getSa_name());
			List<IpAddress> ipAddressList = ipAddressService.getIpAddressList(paramsForIp);//获取此账户下的非失效IP信息
			
			if(ipAddressList.size() == 0){//未有IP信息
				respMap.put("ipValid", "false");
				respMap.put("phone", AppUtils.hidePhoneNum(subAccount.getPhone()));
			}else{//存在IP信息
				int ipNumFlag = 0;//遍历元素结合的标记位
				for(IpAddress ipa : ipAddressList){//遍历其中的IP信息
					if(currentIp.equals(ipa.getIp_address())){//存在和当前一致的IP地址
						Map<String, Object> paramsForUpdateLastIpAddress = new HashMap<String, Object>();
						
						if(ipa.getIp_state() == 1){//常用IP
							subLoginDirect(request, respMap, isLogin, subAccount, account);
							paramsForUpdateLastIpAddress.put("lastLoginIp", currentIp);
							paramsForUpdateLastIpAddress.put("saName", account.getAcc_name());
							subService.updateLastIpAddress(paramsForUpdateLastIpAddress);
							break;
						}else if(ipa.getIp_state() == 0){//临时IP
		    				Date sendDate = ipa.getCreate_time();
		    				//验证时间是否过期
		    				Calendar calendar=Calendar.getInstance();
		    				calendar.setTime(sendDate);
		    				calendar.add(Calendar.HOUR, 24);
		    				//发送邮件之后24小时的时间
		    				Date TimeSpan=calendar.getTime();
		    				
							if(TimeSpan.after(new Date())){//临时IP未超时
								subLoginDirect(request, respMap, isLogin, subAccount, account);
								paramsForUpdateLastIpAddress.put("lastLoginIp", currentIp);
								paramsForUpdateLastIpAddress.put("saName", account.getAcc_name());
								subService.updateLastIpAddress(paramsForUpdateLastIpAddress);
								break;
							}
						}
					}
					ipNumFlag++;//标记位+1
				}
				if(ipNumFlag == ipAddressList.size()){//未匹配到任何信息
					respMap.put("ipValid", "false");
					respMap.put("phone", AppUtils.hidePhoneNum(subAccount.getPhone()));
				}
			}
		}else{//和上一次登录地址相同 
			subLoginDirect(request, respMap, isLogin, subAccount, account);
		}
		
	}

	/**
	 * 子账号直接登录
	*subLoginDirect
	*@param request
	*@param respMap
	*@param isLogin
	*@param subAccount
	*@param account
	*void
	*@author mishengliang
	*2016-6-22下午6:02:25
	*/
	private void subLoginDirect(HttpServletRequest request,
			Map<String, Object> respMap, Integer isLogin,
			SubAccount subAccount, RegAccout account) {
		//salt加密
		RegSalt rs=regAccoutService.getRegSaltbyAccname(subAccount.getSa_name());
		if (rs==null) {
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "无效用户！");
		}else{
			String password=subAccount.getSa_password();
			String password1=request.getParameter("password");
			String isVip = request.getParameter("isVip");
			String salt=rs.getSalt();
			if(CryptoUtils.verify(password, password1, salt)){//密码是否正确
				if(isLogin == 1){
					SessionUtil.setSessionTime(60*60*24*7);//一周
				}else{
					SessionUtil.setSessionTime(60*30);//30分钟
				}
				Map<String, Object> refParam=new HashMap<String, Object>();
				refParam.put("account_id", subAccount.getSa_id());
				refParam.put("account_type", 1);//子账号与角色关联表固定account_type：1
				refParam.put("is_enable", 0);//子账号与角色关联表固定account_type：1
				//获取当前子账号的角色Id集合
				List<RoleAccountRef> ref=roleAccountRefService.getRoleAccountRefList(refParam);
				List<Integer> subRoles=new ArrayList<Integer>();
				
				//把子账号表中的role_id字段先附加到所属角色字符串中，实际以后新加的子账号该字段为null
				String subRoleIdStr="";
				if(subAccount.getRole_id()>0)
				{
					//subRoleIdStr=String.valueOf(subAccount.getRole_id());
					subRoles.add(subAccount.getRole_id());
				}
				/*if(!subRoleIdStr.equals(""))
				{
					subRoleIdStr=subRoleIdStr.concat(",");
				}*/
				for(int r=0;r<ref.size();r++)
				{
					subRoles.add(ref.get(r).getRole_id());
					//subRoleIdStr=subRoleIdStr.concat(String.valueOf(ref.get(r).getRole_id()));
				}
				for(int r=0;r<subRoles.size();r++)
				{
					if(r==0)
					{
						subRoleIdStr=subRoles.get(r).toString();
					}
					else
					{
						subRoleIdStr=subRoleIdStr.concat(",").concat(subRoles.get(r).toString());
					}
				}
				//将登陆的账号信息放入session的指定对象中*新  之后用来取代SESSION_PLATFORM_USER
				LoginAccount loginAccount = new LoginAccount();
				loginAccount.setLogin_id(subAccount.getSa_id());
				loginAccount.setRole_id(subAccount.getRole_id());
				loginAccount.setLogin_name(subAccount.getSa_name());
				loginAccount.setSub_user_name(subAccount.getUsername());
				loginAccount.setPassword(subAccount.getSa_password());
				loginAccount.setAccount_phone(subAccount.getPhone());
				loginAccount.setReg_date(subAccount.getCreate_date());
				loginAccount.setEnabled(subAccount.getEnabled());
				loginAccount.setAccount_type(1);
				loginAccount.setParent_id(subAccount.getReg_id());
				loginAccount.setLast_login_ip(subAccount.getLast_login_ip());
				loginAccount.setOrg_id(subAccount.getOrg_id());
				loginAccount.setSubRoles(subRoles);
				loginAccount.setVip("isVip".equals(isVip) ? true:false);
				/*
				*1.无法将子账号继承主账号，主账号和子账号对象已强耦合到代码逻辑中，无法更改现有对象；
				*2.无法创建包含主账号且含有子账号必要信息的对象，主账号数据显示强耦合到代码逻辑中很难更改重构；
				*3.用主账号对象更改为子账号子账户名和角色ID：即为需求显示子账号名和子账号权限，但企业信息显示为主账号信息，正好满足需求，也符合逻辑；
				*/
				//将子账号的账号名和角色id赋值给主账号对象，进而使数据展示为子账号用户名，且企业信息展示为主账号信息；
				/*account.setAcc_name(subAccount.getSa_name());
				account.setRole_id(subAccount.getRole_id());
				account.setReg_phone(subAccount.getPhone());
				account.setReg_date(subAccount.getCreate_date());*/
				//保存当前登录用户信息到session中，key：platform_user
				SessionUtil.setAttribute(Const.LOGIN_TYPE,0);
				//SessionUtil.setAttribute(Const.SESSION_PLATFORM_USER,account);
				SessionUtil.setAttribute(Const.SESSION_PLATFORM_LOGIN_USER,loginAccount);
				SessionUtil.setAttribute(Const.SESSION_IP, getClientIP(request));//保存客户端登陆ip
				SessionUtil.setAttribute(Const.SESSION_CSRFTOKEN,SRMStringUtil.getUUID());//创建token，防CSRF
				
				//网页对象列表
				Map<String,Object> params3 = new HashMap<String,Object>();
				//这个 需要改成 登陆的账号
				//params3.put("role_id", subAccount.getRole_id());
				params3.put("role_id", subRoleIdStr);
				SessionUtil.setAttribute(Const.SESSION_URL_LIST,sysRoleService.getUrlListByRole_id(params3));
				
				respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put("emailValid", "true");
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "登录成功！");
				respMap.put("loginName",subAccount.getSa_name());
				respMap.put("regEmail",account.getReg_email());
				//单用户登陆
				limitLoginOne(account.getReg_id(),subAccount.getSa_name(),2,request);
			}else{
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "密码输入错误!");
			}
		}
	}
	
	private String getClientIP(HttpServletRequest httpReq) {
		String ip = httpReq.getHeader("x-forwarded-for");
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getHeader("Proxy-Client-IP");
		} else {
			String[] ips = ip.split(",");
			if (ips.length > 0)
				ip = ips[0];
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getHeader("WL-Proxy-Client-IP");
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getRemoteAddr();
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.indexOf("0:0:0:0:0:0:0:1") >= 0 || ip.indexOf("::1") >= 0)
			ip = "127.0.0.1";
		return ip;
	}
	
	/**
	 * 判断账号或者邮箱是否存在
	 *2016-3-15上午9:18:42
	 *isUser
	 *return:Map<String,Object>
	 * mishengliang
	 */
	@RequestMapping(value="/isUser.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> isUser(HttpServletRequest request,HttpServletResponse response){
		//Map<String, Object> respMap = new HashMap<String, Object>();
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		String loginid_or_email = request.getParameter("loginid_or_email");
		Boolean isSub=false;
		try {
			if(loginid_or_email.indexOf(":") == -1){
				respMap.put("isSub",isSub);
				RegAccout regAccount = regAccoutService.getUserbyAccnameOrEmail(loginid_or_email);
				if(regAccount != null){
					
			        respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
					respMap.put("registerEmail",regAccount.getReg_email());
					respMap.put("acc_name",regAccount.getAcc_name());
				}else{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "不存在此用户名或邮箱。");
				}
			}else if(loginid_or_email.indexOf(":") == loginid_or_email.lastIndexOf(":")){
				isSub = true;
				respMap.put("isSub",isSub);
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("sa_name", loginid_or_email);
				Boolean result = subService.findSubAccountExistByName(params);
				if(result){
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号请联系您的管理员修改您的密码。");
				}else{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号不存在。");
				}
			}else{
				respMap.put("isSub",isSub);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "账号不存在");
			}
		} catch (Exception e) {
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "存在错误");
		}
		return respMap;
	}
	
	/**
	 * 直接登录更改密码
	 *2016-3-15下午1:56:59
	 *updatePwd
	 *return:Map<String,Object>
	 * mishengliang
	 */
	@RequestMapping(value="/updatePwd.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updatePwd(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		String old_pwd = request.getParameter("old_pwd");
		String new_pwd = request.getParameter("new_pwd");
		LoginAccount regAccountNow = (LoginAccount) SessionUtil.getCurrentPlateLoginAccount();
		if(regAccountNow != null){//已登录 
			if (regAccountNow.getLogin_name().contains(":")) {
				String acc_name = regAccountNow.getLogin_name();
				params.put("sa_name", acc_name);
				params.put("sa_password", old_pwd);
				
				//salt加密
				RegSalt rs=regAccoutService.getRegSaltbyAccname(acc_name);
				String salt=rs.getSalt();
				List<SubAccount> subAccountList = subService.getSubAccountByName(params);//使用subAccount包中的service方法 获取子账号信息
				
				if(subAccountList.size() == 0){//不存在子账号
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号不存在");
				}
				
				SubAccount subAccount = subAccountList.get(0);
				String pwd1=subAccount.getSa_password();
				if(CryptoUtils.verify(pwd1, old_pwd, salt)){
				
				//if(subService.getSubAccountList(params).size() == 1){//旧密码输入 正确
		    		try {
		    			SubAccount subAccount1 = new SubAccount();
		    			subAccount1.setSa_name(acc_name);
		    			//subAccount1.setSa_password(new_pwd);
		    			
		    			//salt加密
		    			String salt1 = CryptoUtils.getSalt();//生成登录盐值
		    			subAccount1.setSa_password(CryptoUtils.getHash(new_pwd, salt1));
		    			RegSalt rs1=new RegSalt();
		    			rs1.setAcc_name(acc_name);
		    			rs1.setSalt(salt1);
		    			
		    			regAccoutService.updateRegSalt(rs1);
		    			subService.updateRegAccoutPsw(subAccount1);
		    			respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
		    			respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		    		} catch (Exception e) {
		    			respMap.put(Const.AJAX_SERVICE_MESSAGE, "出现错误");
		    		}
				}else{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "原密码输入错误");
				}
			}else{
				String acc_name = regAccountNow.getLogin_name();
				params.put("acc_name", acc_name);
				params.put("password", old_pwd);
				
				//salt加密
				RegSalt rs=regAccoutService.getRegSaltbyAccname(acc_name);
				String salt=rs.getSalt();
				RegAccout regAccout=regAccoutService.getUserbyAccnameOrEmail(acc_name);
				String pwd=regAccout.getPassword(); 
				if(CryptoUtils.verify(pwd, old_pwd, salt)){
				
				
			//if(regAccoutService.getRegAccoutList(params).size() == 1){//旧密码输入 正确
	    		try {
	    			RegAccout regAccount = new RegAccout();
	    			regAccount.setAcc_name(acc_name);
	    			regAccount.setReg_date(new Date());
	    			//regAccount.setPassword(new_pwd);
	    			
	    			//salt加密
	    			String salt1 = CryptoUtils.getSalt();//生成登录盐值
	    			regAccount.setPassword(CryptoUtils.getHash(new_pwd, salt1));
	    			RegSalt rs1=new RegSalt();
	    			rs1.setAcc_name(acc_name);
	    			rs1.setSalt(salt1);
	    			
	    			regAccoutService.updateRegSalt(rs1);
	    			regAccoutService.updateRegAccoutPsw(regAccount);
	    			respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
	    			respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
	    		} catch (Exception e) {
	    			respMap.put(Const.AJAX_SERVICE_MESSAGE, "出现错误");
	    		}
			}else{
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "原密码输入错误");
			}
			}
		}else{//未登录 需直接跳转登录页面
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未登录，请先登录后修改密码");
		}
		return respMap;
	}
	
	/**
	 * 向现在的邮箱中发送修改邮箱的验证消息
	 *2016-3-15下午7:08:58
	 *sendEmailForUpdateEmail
	 *return:Map<String,Object>
	 * mishengliang
	 */
	@RequestMapping(value="/sendEmailForUpdateEmail.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public Map<String,Object> sendEmailForUpdateEmail(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		String UUID = SRMStringUtil.getUUID();
		String vCode=request.getParameter("verify_code");
		String registerEmail=request.getParameter("email");
		
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession)){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				int flag = 24;
				String urlLink = "/userInfo/updateEmail.htm?step=2";
		        String content = "请确认您的邮箱，点击\"下一步\"按钮继续修改邮箱！";
		        String spanContent = "下一步";
		        LoginAccount regAccountNow = (LoginAccount) SessionUtil.getCurrentPlateLoginAccount();
		        String acc_name = regAccountNow.getLogin_name();
		        acc_name = URLEncoder.encode(URLEncoder.encode(acc_name,"UTF-8"), "UTF-8");//两次编码
		        acc_name = "&acc_name="+acc_name;
		        StringBuffer sb = sendEmileBase(flag,emailInfo,urlLink,registerEmail,acc_name,UUID,content,spanContent);
				
		        //发送邮件
		        SendEmail.send(registerEmail,"邮箱确认邮件",sb.toString());
		        respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			}
			catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}

	/**
	 * 修改邮件地址时，将验证信息发到新的邮件地址中
	 *2016-3-15下午7:04:10
	 *sendNewEmailForUpdateEmail
	 *return:Map<String,Object>
	 * mishengliang
	 */
	@RequestMapping(value="/sendNewEmailForUpdateEmail.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public Map<String,Object> sendNewEmailForUpdateEmail(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		String UUID = SRMStringUtil.getUUID();
		String vCode=request.getParameter("verify_code");
		String registerEmail=request.getParameter("email");
		String UUIDForValid = request.getParameter("UUID");
		String acc_name = request.getParameter("acc_name");
		
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("UUID", UUIDForValid);
		
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		
		emailInfo=emailService.getAppSendEmailinfoList(params);
		Date sendEmailDate = emailInfo.getSendTime();
		Integer isValid = emailInfo.getIsValid();//邮件有效标记  1：无效   0：有效
		if(sendEmailDate==null)
		{
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
		}
		else if (isValid == 1) {
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
		}
		else if(!vCode.equalsIgnoreCase(vCodeInSession)){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}
		else
		{
			try{
				int flag = 24;
		        String urlLink = "/userInfo/updateEmail.htm?step=3";
		        String content = "请确认您的邮箱，点击\"下一步\"按钮继续更改邮箱！";
		        String spanContent = "下一步";
		        acc_name = "&acc_name="+acc_name;
		        StringBuffer sb = sendEmileBase(flag,emailInfo,urlLink,registerEmail,acc_name,UUID,content,spanContent);
		        
		        //发送邮件
		        SendEmail.send(registerEmail,"邮箱修改邮件",sb.toString());
		        
				params.put("isValid", 1);//设置为已使用，即为无效验证邮箱
				emailService.updateEmailValid(params);//更新验证邮件的有效性
		        
		        respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}
	/**
	 * 发送邮件公用方法
	 * sendEmileBase
	 * @param flag 小时失效数
	 * @param emailInfo 
	 * @param urlLink 页面链接
	 * @param registerEmail
	 * @param acc_name 
	 * @param UUID
	 * @param content 邮件内容
	 * @param spanContent 按钮名称
	 * @param isVip 是否为vip发送： “isVip” ：是
	 * @return
	 * @author liangjiaxu
	 * @date 2016-6-20 下午2:53:24
	 */
	 public StringBuffer sendEmileBase(int flag,AppSendEmailinfo emailInfo,
			 							String urlLink,String registerEmail,
			 							String acc_name,String UUID,String content,
			 							String spanContent) {
		 	urlLink = urlLink + "&im=t";//标记为邮箱链接
		 	PublishInfo pi=PublishInfo.getInstance();
	        String url=pi.getUrl();
	        
	        modifyEmailLinkValid(registerEmail);//修改此邮箱中邮件链接为无效
	        
	        Date date=new Date();
	        //发送邮件的时间
	        emailInfo.setEmail(registerEmail);
	        emailInfo.setSendTime(date);
	        emailInfo.setUUID(UUID);
	        emailService.addAppSendEmailinfo(emailInfo);
	        
	        Calendar calendar=Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.HOUR, flag);
			Date timeSpan=calendar.getTime();
			SimpleDateFormat sdf = new SimpleDateFormat( " yyyy-MM-dd HH:mm:ss " );
			
			//邮件内容
	    	StringBuffer sb3=new StringBuffer("");
	    	sb3.append("<a style=\"text-decoration:none;\" href=\""+url+urlLink); 
	    	sb3.append("&email="+registerEmail); 
	    	sb3.append(acc_name); 
	    	sb3.append("&UUID="+UUID+"\">");
	    	
	    	/*StringBuffer sb4=new StringBuffer("");
	        sb4.append(url+urlLink+registerEmail+"&UUID="+UUID); */
	        
	    	StringBuffer sb=new StringBuffer("");
	    	sb.append("<div style=\" width:800px; height:70px; line-height:70px; background-color:#58749c;\"><div style=\"float:left; width:auto; height:100%;\" ><img src=\"http://outsideasy.com//newresources/images/logo/logo_main.png\" /></div></div><div style=\"width:800px; height:auto; background:#fff; padding:20px 10px 10px 30px;\" ><p style=\"color:#58749c; letter-spacing:2px; font-weight:500; font-size:16px;\">"+content+"</p>");  
	        sb.append("<div style=\" text-align:center; margin:30px 0px; height:40px; line-height:40px;\" >");
	        sb.append(sb3+"<span style=\"padding:10px 60px; background-color:#ff9900; color:#fff;font-size:16px; text-decoration:none;\">");
	        sb.append(spanContent+"</span></a></div>"); 
	        
	        if(flag!=0){
	        	sb.append("<p>注意：请您在收到此邮件"+flag+"小时内("+sdf.format(timeSpan)+")完成修改,否则该链接将会失效！</p>");
	        }
	        sb.append("<p>无法点击？请使用以下链接</p>");
	        sb.append("<p>"+sb3);
	        sb.append("</a></p><p>"+sb3);
	        sb.append(""+url+urlLink+"&email="+registerEmail+acc_name+"&UUID="+UUID+"</a></p></div>"); 
	        sb.append("<div style=\"margin-left:640px;padding-top:20px;\">outsideasy.com管理团队</div>");
			return sb;
	}
	
	/**
	 * 在各种验证通过后，更改邮箱操作
	 *2016-3-16下午4:17:15
	 *updateEmail
	 *return:Map<String,Object>
	 * mishengliang
	 */
	@RequestMapping(value="/updateEmail.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateEmail(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> params = new HashMap<String, Object>();
		String email = request.getParameter("email");//获取email
		String UUID = request.getParameter("UUID");//激活码
		String acc_name = request.getParameter("acc_name");
		acc_name = URLDecoder.decode(URLDecoder.decode(acc_name,"UTF-8"), "UTF-8");
		
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		params.put("UUID", UUID);

		emailInfo=emailService.getAppSendEmailinfoList(params);
		if(emailInfo == null){//UUID被修改，无效
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
		}else{
			Date sendEmailDate = emailInfo.getSendTime();
			Integer isValid = emailInfo.getIsValid();//邮件有效标记  1：无效   0：有效

			if(isValid == 1){//邮箱链接已被使用过，无效
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接无效,请重新申请!");
			}
			else{

				Date sendDate=(Date)sendEmailDate;
				//验证时间是否过期
				Calendar calendar=Calendar.getInstance();
				calendar.setTime(sendDate);
				calendar.add(Calendar.HOUR, 1);
				//发送邮件之后1小时的时间
				Date TimeSpan=calendar.getTime();
				//当前时间超过了1小时 
				if(TimeSpan.before(new Date()))
				{
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "当前链接已失效,请重新申请!");
				}
				else
				{	
					if(!emailInfo.getEmail().equals(email))
					{
						respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证邮箱不匹配!");
					}
					else
					{
						try
						{	
							RegAccout regAccount = new RegAccout();
							regAccount.setAcc_name(acc_name);
							regAccount.setReg_email(email);
							regAccount.setReg_date(new Date());
							regAccoutService.updateRegAccoutEmail(regAccount);
							params.put("isValid", 1);//设置为已使用，即为无效验证邮箱
							emailService.updateEmailValid(params);//更新验证邮件的有效性
							
							LoginAccount regAccountNow = (LoginAccount) SessionUtil.getCurrentPlateLoginAccount();
							if(regAccountNow != null){//如果是登录状态下，需修改session中的email值
								regAccountNow.setAccount_email(email);
								SessionUtil.setAttribute(Const.SESSION_PLATFORM_LOGIN_USER, regAccountNow);
							}

							respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
							respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
						}
						catch(Exception e)
						{
							respMap.put(Const.AJAX_SERVICE_SUCCESS, "false");
							WebUtil.makeErrorMsg(e, respMap);
						}

					}
				}
			}
		}
		return respMap;
	}
	
	/**
	 * 验证原密码
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/checkPassword.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> checkPassword(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> params=new HashMap<String, Object>();
		LoginAccount regAccountNow = (LoginAccount) SessionUtil.getCurrentPlateLoginAccount();
		if (regAccountNow.getLogin_name().contains(":")) {
			String acc_name = regAccountNow.getLogin_name();
			String old_pwd=  qryParam.get("old_pwd").toString();
			
			//salt加密
			RegSalt rs=regAccoutService.getRegSaltbyAccname(acc_name);
			String salt=rs.getSalt();
			params.put("sa_name", acc_name);
			List<SubAccount> subAccountList = subService.getSubAccountByName(params);//使用subAccount包中的service方法 获取子账号信息
			
			if(subAccountList.size() == 0){//不存在子账号
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号不存在");
			}
			
			SubAccount subAccount = subAccountList.get(0);
			String pwd=subAccount.getSa_password();
			if (CryptoUtils.verify(pwd, old_pwd, salt)) {
				respMap.put(Const.AJAX_DATA_ROOT, true);
			}else{
				respMap.put(Const.AJAX_DATA_ROOT, false);
			}
		}else{
			String acc_name = regAccountNow.getLogin_name();
			String old_pwd=  qryParam.get("old_pwd").toString();
			
			//salt加密
			RegSalt rs=regAccoutService.getRegSaltbyAccname(acc_name);
			String salt=rs.getSalt();
			RegAccout regAccout=regAccoutService.getUserbyAccnameOrEmail(acc_name);
			String pwd=regAccout.getPassword();
			if (CryptoUtils.verify(pwd, old_pwd, salt)) {
				respMap.put(Const.AJAX_DATA_ROOT, true);
			}else{
				respMap.put(Const.AJAX_DATA_ROOT, false);
			}
		}
		return respMap;
	}
	
	/**
	 * 发送邮件前将此邮件地址下的邮件链接有效性设置为无效  email_valid=1
	*modifyEmailLinkValid
	*@param email
	*void
	*@author mishengliang
	*2016-6-1下午8:07:31
	 */
	private void modifyEmailLinkValid(String email){
		Map<String,Object> params = new HashMap<String, Object>();
        params.put("email", email);
		params.put("isValid", 1);//设置为已使用，即为无效验证邮箱
		
		emailService.updateEmailValid(params);//更新验证邮件的有效性
	}
	
	/**
	 * 发送验证邮件或短信
	*sendEmailOrShortMessage
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-7-12下午4:28:24
	 */
	@RequestMapping(value="/sendEmailOrShortMessage.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> sendEmailOrShortMessage(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> params =  WebUtil.getDefaultParamsMap(request);
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		String accNameOrEmail = (String) params.get("accName");
		String sendType = (String) params.get("sendType");
		RegAccout account= regAccoutService.getUserbyAccnameOrEmail(accNameOrEmail);//根据name或者Email判断是否存在
		String validCode = HttpRequestUtils.getRandomIntString(6);//生成验证码
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		
		SessionUtil.setAttribute("validCode",validCode);//保存入session中验证码
		SessionUtil.setSessionTime(60*30);//保留session值 30分钟
		if("1".equals(sendType)){//短信发送
			String msg="异地登录验证码"+validCode+"请确保是本人操作,并在5分钟内提交验证,请勿泄露于他人.";
			String sendPhoneNum = null;
			if(accNameOrEmail.indexOf(":") == -1){
				sendPhoneNum = account.getReg_phone();
			}else if(accNameOrEmail.indexOf(":") == accNameOrEmail.lastIndexOf(":")){
				Map<String,Object> paramsForSub = new HashMap<String, Object>();
				paramsForSub.put("sa_name", accNameOrEmail);
				
				List<SubAccount> subAccountList = subService.getSubAccountByName(paramsForSub);//使用subAccount包中的service方法 获取子账号信息
				SubAccount subAccount = subAccountList.get(0);
				sendPhoneNum = subAccount.getPhone();
			}
			String ScheduleTime = "";
			String f = "1";
			Integer moduleId = 2;//2代表登录IP验证模块
	        try {
	        	AppSendShortmessage postResult = shortMessageService.sendSingleMessage(msg, sendPhoneNum, ScheduleTime, f, moduleId, currentIp);
	        	if(postResult.getResult() == 32){
	        		respMap.put("resultType", 32);
	        		respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "24小时内同一号码发送次数过多");
	        	}else if(postResult.getResult() == -1){
	        		respMap.put("resultType", -1);
	        		respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "同一账号发送信息过多");
	        	}
	        }catch (Exception e) {
	        	WebUtil.makeErrorMsg(e, respMap);
			}
		}else if("2".equals(sendType)){//邮件发送
			try{
		    	StringBuffer sb=new StringBuffer("");
		    	sb.append("<div style=\" width:800px; height:70px; line-height:70px; background-color:#58749c;\">"
			    				+"<div style=\"float:left; width:auto; height:100%;\" >"
			    					+"<img src=\"http://outsideasy.com//newresources/images/new/logo.png\" />"
			    				+"</div>"
		    				+"</div>"
			    			+"<div style=\"width:800px; height:auto; background:#fff; padding:20px 10px 10px 30px;\" >"
		    				+"<p style=\"color:#58749c;font-weight:500; font-size:14px; width:740px; line-height:23px;\">"
		    					+"您好：<br> &nbsp;&nbsp; 您的账号存在登录异常，在非常用地址存在登录操作。为了您的登录安全，请使用下方的验证码检验。如果不是您本人操作，请忽略此邮件。验证码如下："
		    				+"</p>"); 
		    	sb.append("<p style=\"float:left;width:90px;height:35px;margin-left:200px; line-height:35px; background-color:#eee;\">"+ validCode +"</p>");
		    	//sb.append("<p style=\"float:left;width:90px;height:35px;margin-left:200px; line-height:35px; background-color:#eee;\">"+ "<img alt=\"verifyCode.jpg\" src=\""+ request.getLocalName() +":"+ request.getLocalPort() +"/common/getVerifyCode.do\">" +"</p>");
		    	sb.append("<p style=\"font-size:12px;color:#777;line-height:50px;float:left;\"> 15 分钟内有效，请尽快完成操作</p></div>");
		        sb.append("<div style=\"margin-left:640px;padding-top:20px;clear:both;\">outsideasy.com管理团队</div>");
		        
		        //发送邮件
		        SendEmail.send(account.getReg_email(),"安全认证",sb.toString());
		        
		        AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		        Date date=new Date();
		        String UUID = SRMStringUtil.getUUID();
		        //发送邮件的时间
		        emailInfo.setEmail(account.getReg_email());
		        emailInfo.setSendTime(date);
		        emailInfo.setUUID(UUID);
		        emailInfo.setIp_address(currentIp);//设置邮件发送IP
		        emailService.addAppSendEmailinfo(emailInfo);
		        
		        respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}

	/**
	 * 异常IP地址登录
	*differIpLogin
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-7-13上午11:10:24
	 */
	@RequestMapping(value="/differIpLogin.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> differIpLogin(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> paramsForUpdateLastIpAddress = new HashMap<String, Object>();
		Map<String, Object> params = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		
		String validCode = (String)params.get("validCode");
		String validCodeInSession = (String)SessionUtil.getAttribute("validCode");
		String nameOrEmail = params.get("nameOrEmail").toString();
		String isOftenIp = params.get("isOftenIp").toString();//false:非常用  true:常用
		Integer isLogin = DataTrans.transToIntegerFromString(params.get("isLogin").toString());
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		RegAccout account= regAccoutService.getUserbyAccnameOrEmail(nameOrEmail);//根据name或者Email判断是否存在
		
		if(validCode != null && validCode.equals(validCodeInSession)){//验证码通过
			int ipState = 1;
			if("false".equals(isOftenIp)){ipState = 0;}//非常用ip_state设置为0
			String ipAccountName = null;
			
			if(nameOrEmail.indexOf(":") == -1){
				ipAccountName = account.getAcc_name();
				mainLoginDirect(request, respMap, isLogin, account);
				/*paramsForUpdateLastIpAddress.put("lastLoginIp", currentIp);
				paramsForUpdateLastIpAddress.put("accName", account.getAcc_name());
				regAccoutService.updateLastIpAddress(paramsForUpdateLastIpAddress);*/
				updateMainLastIpAndTime(currentIp, account.getAcc_name());
			}else if(nameOrEmail.indexOf(":") == nameOrEmail.lastIndexOf(":")){
				Map<String,Object> paramsForSub = new HashMap<String, Object>();
				Map<String,Object> paramsForAccount = new HashMap<String, Object>();
				paramsForSub.put("sa_name", nameOrEmail);
				
				List<SubAccount> subAccountList = subService.getSubAccountByName(paramsForSub);//使用subAccount包中的service方法 获取子账号信息
				
				SubAccount subAccount = subAccountList.get(0);
				ipAccountName = subAccount.getSa_name();
				paramsForAccount.put("reg_id", subAccount.getReg_id());
				account= regAccoutService.getRegAccoutList(paramsForAccount).get(0);
				
				subLoginDirect(request, respMap, isLogin, subAccount, account);
				paramsForUpdateLastIpAddress.put("lastLoginIp", currentIp);
				paramsForUpdateLastIpAddress.put("saName", account.getAcc_name());
				subService.updateLastIpAddress(paramsForUpdateLastIpAddress);
			}
			
			IpAddress ipAddr = new IpAddress();
			ipAddr.setLogin_id(ipAccountName);
			ipAddr.setIp_address(currentIp);
			ipAddr.setIp_state(ipState);
			ipAddr.setCreate_time(new Date());
			ipAddressService.addIpAddress(ipAddr);//更新进IP表信息
		}else{//验证码不正确
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码不正确");
			respMap.put("validCodeRight", "false");
		}
		return respMap;
	}
	
	/**
	 * @Description: 对比手机发送验证码和输入验证码是否相同
	 * RegAccoutCtrl
	 * checkPhoneVerNum
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-10-10 下午3:43:22
	 */
	@RequestMapping(value="/checkPhoneVerNum.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> checkPhoneVerNum(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		
		String validCode = request.getParameter("validCode");//接收的验证码
		String validCodeInSession = (String)SessionUtil.getAttribute("validCode");//session中验证码
		
		if(validCode.equals(validCodeInSession)){//验证码相同
			respMap.put("sameNum", true);
		}else{
			respMap.put("sameNum", false);
		}
		return respMap;
	}
	
	/**
	 * 发送短信
	*sendShortMessage
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-7-18下午5:57:19
	 */
	@RequestMapping(value="/sendShortMessage.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> sendShortMessage(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> params =  WebUtil.getDefaultParamsMap(request);
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		String validCode = HttpRequestUtils.getRandomIntString(6);//生成验证码
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		
		String sendPhoneNum = null;
		if(params.get("phoneNum") != null && (String)params.get("phoneNum") != ""){
			sendPhoneNum = (String)params.get("phoneNum");
		}else{
			LoginAccount loginAccountInSession =  (LoginAccount) SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
			sendPhoneNum = loginAccountInSession.getAccount_phone();
		}
		
		SessionUtil.setAttribute("validCode",validCode);//保存入session中验证码
		SessionUtil.setAttribute("phoneNum",sendPhoneNum);//保存入接收短信的手机号
		SessionUtil.setSessionTime(60*30);//保留session值 30分钟
		String msg="您的验证码"+validCode+"只用于绑定安全验证手机,请在15分钟内提交验证,请勿泄露于他人.";
		
		String ScheduleTime = "";
		String f = "1";
		Integer moduleId = DataTrans.transToIntegerFromString(request.getParameter("moduleId"));//1代表账号安全模块
		
    	try {
			AppSendShortmessage postResult = shortMessageService.sendSingleMessage(msg, sendPhoneNum, ScheduleTime, f, moduleId, currentIp);
        	if(postResult.getResult() == 32){
        		respMap.put("resultType", 32);
        		respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "24小时内同一号码发送次数过多");
        	}else if(postResult.getResult() == -1){
        		respMap.put("resultType", -1);
        		respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "同一账号发送信息过多");
        	}else if(postResult.getResult() == 6){
        		respMap.put("resultType", -1);
        		respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "不存在此手机号");
        	}else if(postResult.getResult() == 0){//正常情况
        		respMap.put("resultType", 0);
        	}else{
        		respMap.put("resultType", 0);
        	}
		} catch (IOException e) {
			WebUtil.makeErrorMsg(e, respMap);
		}
		return respMap;
	}
	
	/**
	 * 确认手机验证码是否正确
	*confirmValidCode
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-7-18下午7:16:29
	 */
	@RequestMapping(value="/confirmValidCode.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> confirmValidCode(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> params = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		
		LoginAccount loginAccountInSession =  (LoginAccount) SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		String validCode = (String)params.get("validCode");
		String validCodeInSession = (String)SessionUtil.getAttribute("validCode");
		String phoneNumInSession = (String)SessionUtil.getAttribute("phoneNum");
		if(validCode.equals(validCodeInSession)){//验证码正确
			LoginAccount loginAccount = new LoginAccount();
			loginAccount.setAccount_phone(phoneNumInSession);
			loginAccount.setLogin_id(loginAccountInSession.getLogin_id());
			
			//将session中的账号的reg_phone更新进去
			loginAccountInSession.setAccount_phone(phoneNumInSession);
			SessionUtil.setAttribute(Const.SESSION_PLATFORM_LOGIN_USER, loginAccountInSession);
			regAccoutService.updateRegAccoutById(loginAccount);
			respMap.put("phoneNum", AppUtils.hidePhoneNum(phoneNumInSession));
		}else{
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码不正确");
			respMap.put("validCodeRight", "false");
		}
		return respMap;
	}
	
	/**
	 * @Description: 获取与输入电话重复的数据
	 * RegAccoutCtrl
	 * hadPhoneNum
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-11-15 上午9:13:55
	 */
	@RequestMapping(value="/hadPhoneNum.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> hadPhoneNum(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> params = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<RegAccout> accountList = regAccoutService.getRegAccoutList(params);
		respMap.put("accountList", accountList);
		return respMap;
	}
	
	/**
	* @Description:更新主账号最后登录的IP和时间
	* RegAccoutCtrl
	* updateLastIpAndTime
	* @param currentIp
	* @param accName void
	* @author mishengliang
	* 2016-12-23 上午9:15:03
	*/
	private void updateMainLastIpAndTime(String currentIp,String accName){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("lastLoginIp", currentIp);
		params.put("accName", accName);
		params.put("updateDt", new Date());
		regAccoutService.updateLastIpAddress(params);
	}
}