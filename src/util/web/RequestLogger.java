package util.web;

import java.lang.reflect.Method;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import manager.common.main.model.SRMLog;
import manager.common.user.model.UserInfo;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import common.user.model.LoginAccount;

import util.Const;
import util.IpAddressUtils;
import util.MyJsonUtil;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;


/**
 * @author mishengliang
 * 2016-11-24
 */
public class RequestLogger {
	private Logger log = Logger.getLogger(RequestLogger.class);
	
	/**
	 * @Description: 获取注释的日志解释
	 * RequestLogger
	 * doLogger
	 * @param point void
	 * @author mishengliang
	 * 2016-11-24 下午3:14:16
	 */
	public void doLogger(JoinPoint point) {
        Object target = point.getTarget();
        String method = point.getSignature().getName();
        Class<?> classz = target.getClass();
        Class<?>[] parameterTypes = ((MethodSignature) point.getSignature()).getMethod().getParameterTypes();
        try {
            Method m = classz.getMethod(method, parameterTypes);
            if ( m != null && m.isAnnotationPresent(DocLogger.class)) {
				UserInfo uInfo = SessionUtil.getCurrentUser();
				LoginAccount regAccout=SessionUtil.getCurrentPlateLoginAccount();
            	HttpServletRequest httpReq = null;
            	Object[] args = point.getArgs();
            	for(Object o : args){
            		if(o instanceof HttpServletRequest){
            			httpReq = (HttpServletRequest)o;
            		}
            	}
            	DocLogger data = m.getAnnotation(DocLogger.class);//获取访问mapper中的注释
            	log.debug("RequestLogger:======================="+data.explain());
    			String operatorHtmlModel = (httpReq.getHeader("referer")!=null?httpReq.getHeader("referer"):"").trim(); //获取当前页面的url，判断url是否是后台而url（后台的html就两个）
				Integer type = 0 ;//平台账号未登录
				if(operatorHtmlModel.endsWith(Const.LOGIN_TYPE_HTML[0])||operatorHtmlModel.endsWith(Const.LOGIN_TYPE_HTML[1])){
					 type = 1;//后台账号未登录
				}
            	if(type == 0 && regAccout != null){
            		addLog(httpReq,data,regAccout);
            	}else if(type == 1 && uInfo != null){
            		addLog(httpReq,data,uInfo);
            	}
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
	}  
	
	/**
	 * @Description: 写入日志方法
	 * RequestLogger
	 * addLog
	 * @param httpReq 请求
	 * @param docLogger 注释对象
	 * @param o 登录用户的信息：分为LoginAccount（平台用户），UserInfo（管理后台用户）
	 * @author mishengliang
	 * 2016-11-24 下午3:16:14
	 */
	private void addLog(HttpServletRequest httpReq, DocLogger docLogger, Object o){
    	String ctxPath = httpReq.getContextPath(); 
		String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 
		String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath
		String tarUri = uri.trim();
    	
		String sLoginID = null;
		String modName = null;
		if(o instanceof UserInfo){//管理后台
			sLoginID = o!=null?((UserInfo) o).getLogin_id():"";
			modName = "manager";
		}else if(o instanceof LoginAccount){//平台
			sLoginID = o!=null?((LoginAccount) o).getLogin_name() : "";
			modName = "platform";
		}
		
		String sData = MyJsonUtil.obj2string(httpReq.getParameterMap());
		SRMLog log = new SRMLog();
		String requestUrl = httpReq.getScheme() //当前链接使用的协议
			    +"://" + httpReq.getServerName()//服务器地址 
			    + ":" + httpReq.getServerPort(); //端口号 
		String operatorHtmlModel = httpReq.getHeader("referer"); 
		log.setRequest_html((operatorHtmlModel!=null?operatorHtmlModel:"").substring(requestUrl.length()));
		log.setLogdtm(new Date());
		log.setClientip(IpAddressUtils.getCurrentIpAddress(httpReq));
		log.setMod_name(modName);
		log.setLogin_id(sLoginID);
		log.setS_path(tarUri);
		String sMethod = httpReq.getParameter(Const.AJAX_SERVICE_METHOD); 
		log.setS_method(sMethod);
		log.setS_data(sData!=null?sData:"");
		log.setError_message(docLogger.explain());
		log.setLog_type(1);//日志类别 0：错误日志； 1：操作日志
		
		WebUtil.getSyslogger().log(log);
	}
}