package util.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * xss过滤器和CSRF过滤
 * 防 XSS 之全角替换半角
 * 防CSRF之HTTP 头设置 Referer过滤  
 * */
public class XSSFilter implements Filter {

	@Override
	public void init(FilterConfig filterconfig) throws ServletException {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest servletrequest,
			ServletResponse servletresponse, FilterChain filterchain)
			throws IOException, ServletException {
		
		
		HttpServletRequest httpReq = (HttpServletRequest)servletrequest;
		HttpServletResponse httpResp = (HttpServletResponse)servletresponse;
		String isMail = (String)httpReq.getParameter("im");//为  t 时,即为邮件链接
		String path = httpReq.getContextPath();  
        String basePath = servletrequest.getScheme() + "://" + servletrequest.getServerName()  
                + ":" + servletrequest.getServerPort() + path + "/";
        if(servletrequest.getServerPort() == 80){
        	basePath = servletrequest.getScheme() + "://" + servletrequest.getServerName() + path + "/";
        }
        
        // 防CSRF 之：HTTP 头设置 Referer过滤  
        String referer = httpReq.getHeader("Referer"); // REFRESH
        if (referer != null && referer.indexOf(basePath) < 0 && !"t".equals(isMail)) {
        	//判断为不安全的访问
        	String ctxPath = httpReq.getContextPath(); 
        	httpResp.sendRedirect(ctxPath+"/common/goNoSecurity.do");
			return; 
        } 
		// 防 XSS
		XssHttpServletRequestWrapper xssRequest = new XssHttpServletRequestWrapper((HttpServletRequest)servletrequest);
		filterchain.doFilter(xssRequest, httpResp);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
