package util.web;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.main.model.SRMLog;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import util.Const;
import util.IpAddressUtils;
import util.MyJsonUtil;
import util.SessionUtil;
import util.WebUtil;

import common.model.BusinessException;

/**自定义spring全局异常进行统一处理类
 * 如果是ajax请求或者一部请求，返回json.
 * 否则，进行页面跳转
 * @author Administrator
 * 参考：http://baalwolf.iteye.com/blog/2187823
 * 附加  除service层以外的的错误日志记录，service层的错误日志，按照BusinessException过滤，不记录
 */
public class CustomSimpleMappingExceptionResolver extends
		SimpleMappingExceptionResolver {

	private static Logger logger = Logger.getLogger(CustomSimpleMappingExceptionResolver.class);
    @Override  
    protected ModelAndView doResolveException(HttpServletRequest request,  
            HttpServletResponse response,  
            Object handler,  
            Exception ex) {  
      
    	//记录ctrl层的详细 错误日志,service层的错误日志由  util.web.ExceptionAdvisor记录
    	if(!ex.getClass().equals(BusinessException.class)){
    		//读取session中的用户    
            String outUserName = SessionUtil.getCurrentPlateLoginAccount()!=null?SessionUtil.getCurrentPlateLoginAccount().getLogin_name():"";  
            String inUserName=SessionUtil.getCurrentUser()!=null?SessionUtil.getCurrentUser().getName():"";
            //获取请求ip    
            String ip = WebUtil.getIpAddr(request); 
            logger.error("===== 非service异常通知开始=====");
            logger.error("异常信息:" + ExceptionAdvisor.makeErrorMsg(ex));    
            logger.error("内部/外部请求人:" + inUserName+"/"+outUserName);    
            logger.error("请求IP:" + ip);  
            logger.error("请求参数:" + MyJsonUtil.obj2string(request.getParameterMap()));    
            logger.error("===== 非service异常通知结束=====");
    	}
    	addLog2(request,ex);
        // Expose ModelAndView for chosen error view.  
        String viewName = determineViewName(ex, request);  
        if (viewName != null) {//JSP格式返回  
            if(!(request.getHeader("accept").indexOf("application/json")>-1 
            		|| ( request.getHeader("X-Requested-With")!=null && request.getHeader("X-Requested-With").indexOf("XMLHttpRequest")>-1))){//如果不是异步请求  
                // Apply HTTP status code for error views, if specified.  
                // Only apply it if we're processing a top-level request.  
                Integer statusCode = determineStatusCode(request, viewName);  
                if (statusCode != null) {  
                    applyStatusCodeIfPossible(request, response, statusCode);  
                      
                }  
                return getModelAndView(viewName, ex, request);
            }else{//JSON格式返回  
            	
            	JSONObject json = new JSONObject();
            	json.put("ajaxErrorCode", 500);
            	json.put("success", false);  
            	try {  
            		String message=ex.getMessage();
            		/***如果是BusinessException,直接返回message；
            		 * 其他的，是ctrl层抛出的， 再判断一次，然后放到message，并返回*/
            		if(!ex.getClass().equals(BusinessException.class)){
            			String midMessage=ExceptionAdvisor.getMessageByExceptionClass(ex);
            			message="抱歉，"+midMessage+"请稍后再试或与管理员联系！";
            		}
                	json.put("message",message ); 
                	OutputStream out = response.getOutputStream();
                   	out.write(json.toString().getBytes("utf-8")); 
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
                return new ModelAndView();  
            }   
        }  
        else {  
            return null;  
        }  
    }
    
    /**
	* 平台账户登录记录日志
    * 由于拦截器那边过滤器中会阻止登录成功记录日志，所以单独写了个登录成功时记录的日志
    * @Description:
    * WebUtil
    * addLog2
    * @param httpReq
    * @param regAccout void
    * @author chenlong
    * 2016-11-11 下午2:02:57
     */
    public  void  addLog2(HttpServletRequest httpReq,Exception ex){
    	//读取session中的用户    
        String outUserName = SessionUtil.getCurrentPlateLoginAccount()!=null?SessionUtil.getCurrentPlateLoginAccount().getLogin_name():"";  
        String inUserName=SessionUtil.getCurrentUser()!=null?SessionUtil.getCurrentUser().getName():"";
		SRMLog log = new SRMLog();
		log.setLogdtm(new Date());
		String ctxPath = httpReq.getContextPath(); 
		String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 
		String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath
		String tarUri = uri.trim();
		log.setClientip(IpAddressUtils.getCurrentIpAddress(httpReq));
		log.setError_message("错误详情:"+ex.getMessage()+"异常代码:" + ex.getClass().getName());		
		log.setS_path(tarUri);
		String operatorHtmlModel = httpReq.getHeader("referer")!=null?httpReq.getHeader("referer"):""; 		
		if(operatorHtmlModel.endsWith(Const.LOGIN_TYPE_HTML[0])||operatorHtmlModel.endsWith(Const.LOGIN_TYPE_HTML[1])){
			log.setLogin_id(inUserName);
			log.setMod_name("manager");
		}else{
			log.setLogin_id(outUserName);
			log.setMod_name("platform");
		}
		String requestUrl = httpReq.getScheme() //当前链接使用的协议
			    +"://" + httpReq.getServerName()//服务器地址 
			    + ":" + httpReq.getServerPort(); //端口号 
		log.setRequest_html((operatorHtmlModel!=null?operatorHtmlModel:"").substring(requestUrl.length()));
		String sData = MyJsonUtil.obj2string(httpReq.getParameterMap());			
		log.setS_data(sData!=null?sData:"");
		WebUtil.getSyslogger().log(log);
	}
}
