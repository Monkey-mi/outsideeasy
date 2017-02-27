package util.web;

import java.io.IOException;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import manager.common.main.model.SRMLog;
import manager.common.user.model.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import util.CacheData;
import util.Const;
import util.IpAddressUtils;
import util.MyJsonUtil;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;


public class RequestFilter implements Filter {

//	private static Logger logger = Logger.getLogger("service");
	protected FilterConfig filterConfig;
	protected boolean filterEnabled;
	protected int logLevel;
	protected boolean needVCode;
	protected List<String> noFilerList =null;
	private CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
	public RequestFilter() {
		this.filterConfig = null;
		this.filterEnabled = true;
		this.logLevel = -1;
	}
    	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		if(this.filterEnabled){
			HttpServletRequest httpReq = (HttpServletRequest)req;
			HttpServletResponse httpResp = (HttpServletResponse)resp;
			String ctxPath = httpReq.getContextPath(); 
			String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 
			String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath
			String tarUri = uri.trim();	
			String operatorHtmlModel = (httpReq.getHeader("referer")!=null?httpReq.getHeader("referer"):"").trim(); //获取当前页面的url，判断url是否是后台而url（后台的html就两个）
			//不在过滤列表里的url请求,过滤列表包括t_sys_filter表中数据及visitor角色用户下的授权页面
			if(!"/".equals(tarUri)&&!this.isInNoFilerList(tarUri)){
				UserInfo uInfo = SessionUtil.getCurrentUser();
				LoginAccount regAccout=SessionUtil.getCurrentPlateLoginAccount();
				int type = 0 ;//平台账号未登录
				if(operatorHtmlModel.endsWith(Const.LOGIN_TYPE_HTML[0])||operatorHtmlModel.endsWith(Const.LOGIN_TYPE_HTML[1])){
					 type = 1;//后台账号未登录
				}
			//	int type = (SessionUtil.getAttribute(Const.LOGIN_TYPE)!=null)?Integer.valueOf(SessionUtil.getAttribute(Const.LOGIN_TYPE).toString()):0;
				switch(type){
					case 0:
						if(regAccout==null){//平台账号未登录
							if(tarUri.endsWith(".do")){
								HttpSession currentSession=httpReq.getSession(false);
								if(currentSession!=null && currentSession.getAttribute("beKick") != null && "1".equals(currentSession.getAttribute("beKick").toString())){//被T下线
									 if (httpReq.getHeader("x-requested-with") != null && httpReq.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){
										 httpResp.sendRedirect(ctxPath+"/common/doBeKick.do");
										 return;
									 }else{
										 httpResp.sendRedirect(ctxPath+"/error/beKick.html");
										return;
									 }
								}else{
									httpResp.sendRedirect(ctxPath+"/"+Const.TIMEOUT_SERVICE);
									return;
								}
								
							}else if(tarUri.endsWith("/")){
								httpResp.sendRedirect(ctxPath+"/"+Const.INDEX_PAGE);
								return;
							}
						}else{//平台账号登录
							if(tarUri.endsWith("/")){
								httpResp.sendRedirect(ctxPath+"/error/noSecurity.jsp");
								return;
							}else if(tarUri.endsWith(".do") && !isWithoutUri(tarUri) && httpReq.getContentType() != null){
								String contentType = httpReq.getContentType();
								String post_csrftoken = "";
								if(contentType != null && contentType.contains("multipart/form-data")){
									MultipartHttpServletRequest multiReq = multipartResolver.resolveMultipart(httpReq);
									post_csrftoken=multiReq.getParameter(Const.SESSION_CSRFTOKEN);
									req = multiReq;
								}else{
									post_csrftoken=httpReq.getParameter(Const.SESSION_CSRFTOKEN);
								}
								//csrf防御：判断是否带token
								//post_csrftoken=httpReq.getParameter(Const.SESSION_CSRFTOKEN);
								String csrftoken=(String)SessionUtil.getAttribute(Const.SESSION_CSRFTOKEN);
								if(post_csrftoken==null || !csrftoken.equals(post_csrftoken)){
									//判断为不安全的访问
									httpResp.sendRedirect(ctxPath+"/common/goNoSecurity.do");
									return;
								}
							}
						}
						break;
					case 1:
						if(uInfo==null){//后台账号未登录
							if(tarUri.endsWith(".do")){
								httpResp.sendRedirect(ctxPath+"/"+Const.TIMEOUT_SERVICE);
								return;
							}else if(tarUri.endsWith("/")){
								httpResp.sendRedirect(ctxPath+"/"+Const.BG_LOGIN_PAGE);
								return;
							}
						}else{//后台账号登录
							if(tarUri.endsWith(".do")){

							}
						}
						break;
				}				
			}
			// 设定网页的到期时间，一旦过期则必须到服务器上重新调用
			httpResp.setDateHeader("Expires", -1);
	        // Cache-Control 指定请求和响应应遵循的缓存机制 no-cache指示请求或响应消息是不能缓存的
			httpResp.setHeader("Cache-Control", "no-cache");
	        // 用于设定禁止浏览器从本地缓存中调用页面内容，设定后一旦离开页面就无法从Cache中再调出
			httpResp.setHeader("Pragma", "no-cache");
		}	
		chain.doFilter(req, resp);
	}

	
	@Override
	public void init(FilterConfig cfg) throws ServletException {
		this.filterConfig = cfg;
		this.filterEnabled = true;
		this.logLevel = -1;
		this.needVCode = true;
		
		
		//取filterEnabled
		String paramValue = filterConfig.getInitParameter("filterEnabled");
		if(!WebUtil.isEmpty(paramValue)&&paramValue.equalsIgnoreCase("false"))
			this.filterEnabled = false;
		//取logLevel
		paramValue = filterConfig.getInitParameter("logLevel");
		if(!WebUtil.isEmpty(paramValue)){
			this.logLevel = Integer.parseInt(paramValue);
		}		
		//取needVCode
		paramValue = filterConfig.getInitParameter("needVCode");
		if(!WebUtil.isEmpty(paramValue)&&paramValue.equalsIgnoreCase("false"))
			this.needVCode = false;
		WebUtil.setNeedVCode(this.needVCode);
	}
	
	@SuppressWarnings("unchecked")
	private boolean isInNoFilerList(String uri){
		noFilerList = (List<String>)CacheData.getInstance().get("SysFilter");
 		for (String str : noFilerList) {
			if(!"/".equals(str)&&uri.indexOf(str)!=-1)
				return true;
		}
		return false;
	}
	
	private Boolean isWithoutUri(String tarUri){
		String[] withoutUriStrings = {//无需匹配token的请求
				"/common/goNoSecurity.do",
				"/plateFormCommon/isLoginForPlateForm.do",
				"/supplierForPlateForm/getCompanyListByRegId.do"
				};
		
		for(String uri:withoutUriStrings){
			if(uri.equals(tarUri)){
				return true;
			}
		}
		return false;
	}
	
}
