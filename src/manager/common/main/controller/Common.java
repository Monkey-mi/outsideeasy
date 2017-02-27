package manager.common.main.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.main.model.SRMLog;
import manager.common.main.service.CommonService;
import manager.common.main.service.ModuleService;
import manager.common.user.model.UserInfo;
import manager.common.user.service.UserService;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import util.Const;
import util.IpAddressUtils;
import util.SessionUtil;
import util.TansferData;
import util.VerifyCodeUtils;
import util.WebUtil;
import util.annotation.DocLogger;

import common.user.model.LoginAccount;

/**
 * @author lenovo
 *
 */
@Controller
@RequestMapping("common")
public class Common {
	@Autowired
	private CommonService commonService;
	@Autowired
	private ModuleService moduleService;
	@Autowired
	private UserService userService;

	
	@RequestMapping(value="/Modules.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,moduleService);
	}
	
	@RequestMapping(value="/ModuleCodeCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModuleCodeCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, moduleService);
	}
	
	@RequestMapping(value="/Users.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Users(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		return WebUtil.DynamicCallCURD(request,response, userService);
	}
	
	/*
	 * 用户登录--后台
	 */
	@DocLogger(explain="后台管理登录")
	@RequestMapping(value="/Users/doLogin2.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> doLogin2(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		paramsMap.put("login_id",request.getParameter("login_id"));
		paramsMap.put("pwd",request.getParameter("pwd"));
		String vCode = request.getParameter("verify_code");
		
		if(WebUtil.isEmpty(vCode))
			vCode ="";
		String vCodeInSession="";
		Object vCodeObjInSession = SessionUtil.getAttribute("verify_code");
		if(!WebUtil.isEmpty(vCodeObjInSession))
			vCodeInSession =vCodeObjInSession.toString();
		if(!vCode.equalsIgnoreCase(vCodeInSession) && WebUtil.isNeedVCode()){
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "验证码输入错误!");
		}else{
			try{
				//先校验用户有效性
				Map<String,Object> paramsMap1 = new HashMap<String,Object>();
				paramsMap1.put("login_id",request.getParameter("login_id"));
				if(!commonService.isValidUser(paramsMap1)){
					respMap.put(Const.AJAX_SERVICE_MESSAGE, "无效用户!");
				}else
					//校验通过
					if(commonService.chkUserPwd(paramsMap)){
						UserInfo uinfo = commonService.getUserList(paramsMap).get(0);
						//首次登陆必须先修改密码
						//华慧 
						if (uinfo.getLast_login()!=null){
							uinfo.setLast_login(new Date());
							commonService.updateUser(new UserInfo[]{uinfo});
						}
						SessionUtil.setAttribute(Const.LOGIN_TYPE,1);
						SessionUtil.setAttribute(Const.SESSION_USER,uinfo);
						SessionUtil.setAttribute(Const.SESSION_ROLE,commonService.getRoleListByLoginId(paramsMap));
						//保存客户端登陆ip
						SessionUtil.setAttribute(Const.SESSION_IP, IpAddressUtils.getCurrentIpAddress(request));
						//初始化用户组织
						userService.initUserOrgCache();
					
						respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
						respMap.put(Const.AJAX_SERVICE_MESSAGE, "成功登录!");
						respMap.put("loginName",uinfo.getLogin_id());
						//addLog2(request,uinfo);						
					}else{
						respMap.put(Const.AJAX_SERVICE_MESSAGE, "用户或密码输入错误!");
					}
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
			}
		}
		return respMap;
	}

	/**
	 * @Description: 获取验证码
	 * Common
	 * getVerifyCode
	 * @param request
	 * @param response
	 * @throws Exception void
	 */
	@RequestMapping(value="/getVerifyCode.do",method=RequestMethod.GET)
	public void getVerifyCode(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Pragma", "No-cache");  
        response.setHeader("Cache-Control", "no-cache");  
        response.setDateHeader("Expires", 0);  
        response.setContentType("image/jpeg");  
		//生成验证码，写入用户session
		String verifyCode=VerifyCodeUtils.generateVerifyCode(4);
		SessionUtil.setAttribute("verify_code",verifyCode);
		
		//输出验证码给客户端
		//生成图片  
        int w = 97, h = 42;  
		VerifyCodeUtils.outputImage(w, h, response.getOutputStream(), verifyCode); 
	}				
	/*
	 * 用户注销,内外网使用同一个session，注销也是一起注销
	 */
	@DocLogger(explain="后台退出")
	@RequestMapping(value="/Users/doLogout.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> doLogout(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();		
		UserInfo userInfo = (UserInfo)SessionUtil.getAttribute(Const.SESSION_USER);
		LoginAccount loginAccout=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);	
		if(userInfo!=null){
			SessionUtil.removeAllAttributes(Const.SESSION_USER);//删除缓存在线的用户			
			SessionUtil.removeAttribute(Const.SESSION_USER);
			SessionUtil.removeAttribute(Const.SESSION_ROLE);
			if(loginAccout==null){
			SessionUtil.removeAttribute(Const.SESSION_IP);
			SessionUtil.removeAttribute(Const.LOGIN_TYPE);
			}
		}
		return respMap;
	}
	/**
	 * 用于获取登录用户信息
	 */
	@RequestMapping(value="Users/getLoginInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object>  getLoginInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Object uInfos[]= new Object[4];
		uInfos[0]=(UserInfo)SessionUtil.getAttribute(Const.SESSION_USER);
		if(uInfos[0]!=null){
			uInfos[1] = SessionUtil.getAttribute(Const.SESSION_ROLE);
			uInfos[2] = SessionUtil.getAttribute(Const.SESSION_IP);
			uInfos[3] = SessionUtil.getAttribute(Const.SESSION_DEFAULT_ORG);
			respMap.put(Const.AJAX_DATA_ROOT, uInfos);
		}
		return respMap;
	}
	
	@RequestMapping(value="/doSessionTimeOut.do",method=RequestMethod.GET)
	@ResponseBody 
	public Map<String,Object> doSessionTimeOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_999_SessionTimeOut);
		respMap.put(Const.AJAX_COMPLETE_MSG, "登录已超时或尚未登录!");
		return respMap;		
	}
	@RequestMapping(value="/doBeKick.do",method=RequestMethod.GET)
	@ResponseBody 
	public Map<String,Object> doBeKick(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, 980);
		respMap.put(Const.AJAX_COMPLETE_MSG, "该账号已经在其他地方登陆");
		return respMap;		
	}
	/**
	* @Description:不安全请求页面
	* Common
	* goNoSecurity
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author mishengliang
	* 2016-12-16 上午9:59:11
	*/
	@RequestMapping(value="/goNoSecurity.do",method=RequestMethod.GET)
	@ResponseBody 
	public Map<String,Object> goNoSecurity(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, 970);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "拒绝响应请求，访问不安全");
		return respMap;		
	}
	/**
	 * 获得一些js全局变量
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/getJSGlobalVars.do",method=RequestMethod.GET)
	public void getJSGlobalVars(HttpServletRequest request,HttpServletResponse response) throws Exception{
		//设置浏览器不缓存本页
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Content-Type","text/javascript;charset=UTF-8");
		StringBuilder sbVars = new StringBuilder();
		
		sbVars.append(" var srm_needVCode =").append(WebUtil.isNeedVCode()).append(";");
		response.getWriter().println(sbVars);
		response.flushBuffer();
	}
	/**
	 * 用于获取登录用户信息
	 */
	@RequestMapping(value="update_company_id.do",method=RequestMethod.POST)
	@ResponseBody 
	public String  update_company_id(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject json = new JSONObject();
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		int company_id=Integer.valueOf(request.getParameter("company_id"));
		paramsMap.put("company_id",company_id);
		paramsMap.put("u_id",request.getParameter("u_id"));
		String cpyname_cn=request.getParameter("cpyname_cn");
		paramsMap.put("cpyname_cn",cpyname_cn);
		commonService.update_company_id(paramsMap);
		UserInfo userInfo = (UserInfo)SessionUtil.getAttribute("user");
		userInfo.setCompany_id(company_id);
		userInfo.setCpyname_cn(cpyname_cn);
		json.put("success", true);
		return json.toString();
	}
	@RequestMapping(value="batch_update_company_id.do",method=RequestMethod.POST)
	@ResponseBody 
	public String  batch_update_company_id(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject json = new JSONObject();
		String u_idarrayString= request.getParameter("u_idarray");
		String[]  u_idarray=u_idarrayString.split(",");
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		int company_id=Integer.valueOf(request.getParameter("company_id"));
		paramsMap.put("company_id", company_id);
		String cpyname_cn=request.getParameter("cpyname_cn");
		paramsMap.put("cpyname_cn",cpyname_cn);
		for (int i=0;i<u_idarray.length;i++){
			paramsMap.put("u_id",u_idarray[i]);
			commonService.update_company_id(paramsMap);
		}	
		json.put("success", true);
		return json.toString();
	}
	/** 上传路径*/
	private final static String uploadFolderPath = WebUtil.getUpLoadFileRoot();
	/**上传文件,公用*/
    @RequestMapping(value="/uploadFile.do",method = RequestMethod.POST)
    @ResponseBody
    public String uploadFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	json.put("success", true);
    	
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象       
        //中间部分路径
        String partPath=request.getParameter("partPath");
        boolean isimg=false;
        String strisimg=request.getParameter("isimg");
        if(strisimg!=null){
        	isimg=Boolean.valueOf(strisimg);
        }
        InputStream inputStream = null;
        OutputStream outputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("msg", "文件太大，超过10M");
				return json.toString() ;	
			} 
	        inputStream = file.getInputStream();
	       
           //文件存放路径
            String folder=uploadFolderPath+partPath+"/";
            File newFile = new File(folder);
            
            if(!newFile.exists()){
              newFile.mkdirs();
            }
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            String originalName=file.getOriginalFilename();
            String newName=originalName;
            
            if(isimg){
            	boolean flag=false;//默认不 是图片
                //获取文件后缀，与传过来的参数file_name重新组装文件名
                if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	String this_suffix=originalName.substring(originalName.lastIndexOf("."));
                	
                	for(String suffix:Const.imgArray){
                		if(suffix.equalsIgnoreCase(this_suffix)){
                			flag=true;
                			break;
                        }
                	}
                	
                	newName=df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
                }
                if(!flag){
            		json.put("msg", "不是图片");
    				return json.toString() ;
            	}	
                
            }else{
            	//获取文件后缀，与传过来的参数file_name重新组装文件名
                if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	newName=df.format(new Date())+originalName.substring(originalName.indexOf("."));
                }
            }
          
            //完整文件对象
            String file_path=folder+newName;
            File finalFile = new File(file_path);
            finalFile.setReadable(true, false);
            finalFile.setWritable(true, false);
            outputStream = new FileOutputStream(finalFile);

            int readBytes = 0;
            byte[] buffer = new byte[1024];
            while ((readBytes = inputStream.read(buffer, 0, 1024)) != -1) {
                    outputStream.write(buffer, 0, readBytes);
            }
            //输出相对路径
            json.put("file_path", partPath+"/"+newName);
            outputStream.close();
            inputStream.close();          
        }else{
        	json.put("msg", "文件不存在");
        }
        return json.toString();
    }
    
    /**
     * javascript 发送
		var file_path=encodeURIComponent(encodeURIComponent(rec.get('attched')));
		
		java spring mvc接收
		String file_path=request.getParameter("file_path");//解码一次
        file_path=java.net.URLDecoder.decode(file_path,"UTF-8");//第二次解码*/
    @RequestMapping(value="/downloadFile.do",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadFile(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	String file_path=request.getParameter("file_path");
    	
		if(file_path!=null){
			file_path=java.net.URLDecoder.decode(file_path,"UTF-8");
			File finalFile = new File(uploadFolderPath+file_path);
			String filename=file_path.substring(file_path.lastIndexOf("/")+1);
	       
	        if(finalFile.exists()){
	        	OutputStream out = null;
	            InputStream in = null;
	            boolean isimg=false;
	            String strisimg=request.getParameter("isimg");
	            if(strisimg!=null){
	            	isimg=Boolean.valueOf(strisimg);
	            }
	            response.setContentType("application/octet-stream; charset=utf-8");
	            if(isimg){
	            	boolean flag=false;//默认不 是图片
	                //获取文件后缀，与传过来的参数file_name重新组装文件名
	                if(file_path.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
	                	String this_suffix=file_path.substring(file_path.lastIndexOf("."));
	                	
	                	for(String suffix:Const.imgArray){
	                		if(suffix.equalsIgnoreCase(this_suffix)){
	                			flag=true;
	                			break;
	                        }
	                	}
	                }
	                if(flag){
	                	response.setContentType("image/*");
	                }
	            }
	            // 获得文件名
	            
	            if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {  
		            filename = URLEncoder.encode(filename, "UTF-8");  
		        } else {  
		            filename = new String(filename.getBytes("UTF-8"), "ISO8859-1");  
		        }
	            response.setHeader("Location", filename);

	            // 定义输出文件头
	            response.setHeader("Content-Disposition", "attachment;filename="
	                    + filename);
	            out = response.getOutputStream();
	            in = new FileInputStream(finalFile.getPath());

	            TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);

	            in.close();
	            out.flush();
	            out.close();
	            return;
	        }
		}
       	response.setContentType("text/html; charset=utf-8");
       	OutputStream out = response.getOutputStream();
       	out.write("文件不存在".getBytes("utf-8"));
       	out.flush();
        out.close();
	}
    
    /**按路径，删除服务器上面的附件**/
    @RequestMapping(value="/deleteFileByPath.do",method = RequestMethod.POST)
    @ResponseBody
	public String deleteFileByPath(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	String arraystr=request.getParameter("patharray");
    	String[] array= arraystr.split(",");
		for(int i=0;i<array.length;i++){
			File file = new File(uploadFolderPath+array[i]);
			if(file.exists()){
				file.delete();
			}
		}
		return json.toString();
	}
   
    /**判断是否使用内部账号登录*/
    @RequestMapping(value="/checkLogin.do",method = RequestMethod.POST)
    @ResponseBody
	public String checkLogin(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
		if(SessionUtil.getCurrentUser()!=null){
			json.put("success", 1);
		}else{
			json.put("success", 0);
		}
		return json.toString();
	}
	/**
	* 后台账户登录记录日志
    * 由于拦截器那边过滤器中会阻止登录成功记录日志，所以单独写了个登录成功时记录的日志
    * @Description:
    * WebUtil
    * addLog2
    * @param httpReq
    * @param User
    * @author chenlong
    * 2016-11-10 下午2:32:57
     */
    public  void  addLog2(HttpServletRequest httpReq,UserInfo uInfo){
		SRMLog log = new SRMLog();
		log.setLogdtm(new Date());
		String ctxPath = httpReq.getContextPath(); 
		String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 
		String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath
		String tarUri = uri.trim();
		log.setClientip(IpAddressUtils.getCurrentIpAddress(httpReq));		
		log.setMod_name("manager");
		log.setLogin_id(uInfo.getLogin_id());
		log.setS_path(tarUri);			
		WebUtil.getSyslogger().log(log);
	}
}
