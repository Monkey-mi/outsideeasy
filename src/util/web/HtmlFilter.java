package util.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import util.CacheData;
import util.Const;
import util.SRMStringUtil;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;

public class HtmlFilter implements Filter{
	
	protected FilterConfig filterConfig;
	
	protected boolean limitAccess;
	protected List<String> noFilerList =null;
	public HtmlFilter() {
		this.filterConfig = null;
		this.limitAccess=true;
	}
	@Override
	public void destroy() {
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,FilterChain chain) throws IOException, ServletException {
			HttpServletRequest httpReq = (HttpServletRequest)req;
			HttpServletResponse httpResp = (HttpServletResponse)resp;
			String ctxPath = httpReq.getContextPath();    		
			Cookie[] htmlCookies = httpReq.getCookies();		
			String requestUri = httpReq.getRequestURI();		//请求的全路径,比如:		 
			String uri = requestUri.substring(ctxPath.length());//全路径除去ctxPath
			String tarUri = uri.trim();
			String defalutLink = Const.INDEX_PAGE;
			if(htmlCookies != null){
				for(int i = 0;i < htmlCookies.length; i++){//mishengliang 2016-10-13
					if("isVip".equals(htmlCookies[i].getName()) && "true".equals(htmlCookies[i].getValue())){//vip登录
						defalutLink = Const.VIP_LOGIN_PAGE;
					}
				}
			}
			if(!"/".equals(tarUri)&&!this.isInNoFilerList(tarUri)){
				//RegAccout regAccout=SessionUtil.getAttribute(Const.SESSION_PLATFORM_USER)!=null?(RegAccout)SessionUtil.getAttribute(Const.SESSION_PLATFORM_USER):null;
				//Const.SESSION_PLATFORM_LOGIN_USER
				LoginAccount regAccout=SessionUtil.getCurrentPlateLoginAccount();//SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER)!=null?(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER):null;
				if(regAccout==null){//平台账号未登录
					HttpSession currentSession=httpReq.getSession(false);
					if(currentSession!=null && currentSession.getAttribute("beKick") != null && "1".equals(currentSession.getAttribute("beKick").toString())){//被T下线
						httpResp.sendRedirect(ctxPath+"/error/beKick.html");
						return;
					}
					if(tarUri.endsWith(".html")||tarUri.endsWith(".htm")){
						//httpResp.sendRedirect(ctxPath+"/"+Const.INDEX_PAGE);
						httpResp.sendRedirect(ctxPath+"/"+ defalutLink);//不同的登录方式，刷新的默认页面不同
						return;
					}
					
				}else{//平台账号登录
					if(tarUri.endsWith(".html")||tarUri.endsWith(".htm")){
						//对.htm结尾的请求路径进行处理
						String parttarUri=tarUri.endsWith(".htm")?SRMStringUtil.getPartPathFromUrl(tarUri):tarUri;
						if(limitAccess){//已经登录
							List<String> hplist=(SessionUtil.getAttribute(Const.SESSION_URL_LIST)!=null)?(List<String>)SessionUtil.getAttribute(Const.SESSION_URL_LIST):null;
							boolean flag=false;//不匹配
							if(hplist!=null){
								for(String hp:hplist){
									if(parttarUri.indexOf(hp)!=-1){
									//if(parttarUri.equalsIgnoreCase(hp)){
										flag=true;
										break;
									}
								}
							}
							if(!flag){
								httpResp.sendRedirect(ctxPath+"/error/noSecurity.jsp");
								return;
							}
							
						}
					}
				}				
				
			}
		
		chain.doFilter(req, resp);
	}

	@Override
	public void init(FilterConfig cfg) throws ServletException {
		this.filterConfig = cfg;
		
		this.limitAccess=true;
		
		//取limitAccess
		String paramValue = filterConfig.getInitParameter("limitAccess");
		if(!WebUtil.isEmpty(paramValue)&&paramValue.equalsIgnoreCase("false")){
			this.limitAccess = false;
		}
	}
	
	//在过滤列表中
	@SuppressWarnings("unchecked")
	private boolean isInNoFilerList(String uri){
		noFilerList = (List<String>)CacheData.getInstance().get("SysFilter");
		for (String str : noFilerList) {
			if(!"/".equals(str)&&uri.indexOf(str)!=-1)
				return true;
		}
		return false;
	}
}
