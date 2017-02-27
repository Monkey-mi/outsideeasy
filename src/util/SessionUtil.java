package util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import manager.common.user.model.Role;
import manager.common.user.model.UserInfo;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import common.model.LoginUser;
import common.user.model.LoginAccount;
import common.user.model.RegAccout;

public class SessionUtil {
	//当前登录的账号的队列,转化后线程安全
	private static List<LoginUser> userlist=Collections.synchronizedList(new ArrayList<LoginUser>());
	/**
	 * 获得当前session(如果有的话)
	 * @return
	 */
	private static HttpSession getSession(){
		HttpServletRequest request = getHttpRequest();
		if(request!=null){
			//在Web环境下才有
			return request.getSession();
		}else{
			return null;
		}
	}
	/**
	 * 获得当前session(如果有的话)
	 * @return
	 */
	private static HttpSession getExistSession(){
		HttpServletRequest request = getHttpRequest();
		if(request!=null){
			//在Web环境下才有
			return request.getSession(false);
		}else{
			return null;
		}
	}
	/**
	 * 获得当前http请求
	 * @return
	 */
	private static HttpServletRequest getHttpRequest(){
		//RequestContextHolder 要依赖于 org.springframework.web.context.request.RequestContextListener
		Object reqObj = RequestContextHolder.getRequestAttributes();
		return reqObj==null?null:((ServletRequestAttributes)reqObj).getRequest();
	}
	/**
	 * 获取当前用户信息
	 */
	public static UserInfo getCurrentUser(){
		try{
			HttpSession httpSession = getExistSession();
			if(httpSession != null){
				return (UserInfo)httpSession.getAttribute("user");
			}else{
				return null;
			}
		}catch(Exception e){
			return null;
		}
	}
	
	/**
	 * @Description: 获取当前平台用户信息 主账号和子账号保留在同一对象中，且各自的信息完整
	 * SessionUtil
	 * getCurrentPlateLoginAccount
	 * @return LoginAccount
	 * @author mishengliang
	 * 2016-8-4 下午4:21:11
	 */
	public static LoginAccount getCurrentPlateLoginAccount(){
		try{
			HttpSession httpSession = getExistSession();
			if(httpSession != null){
				LoginAccount loginAccount = (LoginAccount)httpSession.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
				return loginAccount;
			}else{
				return null;
			}
		}catch(Exception e){
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public static List<Role> getCurrentUserRoles(){
		try{
			HttpSession httpSession = getExistSession();
			if(httpSession != null){
				return (List<Role>)httpSession.getAttribute("role");
			}else{
				return null;
			}
		}catch(Exception e){
			return null;
		}
	}
	
	public static boolean isAdmin(){
		return hasRole(Const.SUPER_ROLE);
	}
	
	public static boolean hasRole(String roleName){
		List<Role> roleLst = getCurrentUserRoles();
		if(roleLst==null||roleLst.size()==0){
			return false;
		}else{
			for (Role role : roleLst) {
				if(role.getRole_name().equals(roleName)){
					return true;
				}
			}
			return false;
		}
	}
	
	//获取当前用户名
	public static String getCurrentUserCode(){
		UserInfo u = getCurrentUser();
		if(u!=null){
			return u.getLogin_id();
		}else{
			return null;
		}
	}
	
	public static Object getAttribute(String attrName){
		//从当前HttpSession中取值
		HttpSession httpSession=getExistSession();
		if(httpSession!=null){
			return httpSession.getAttribute(attrName);
		}else{
			return null;
		}
	}
	public static void setAttribute(String attrName,Object attr){
		if (attr != null) {
			HttpSession httpSession=getSession();
			if(httpSession!=null){
				httpSession.setAttribute(attrName, attr);
			}
		}else{
			HttpSession session = getExistSession();
			if (session != null) {
			 	session.removeAttribute(attrName);
			}
		}
		
	}
	public static void removeAttribute(String attrName){
		//从当前HttpSession中移除值
		HttpSession httpSession=getExistSession();
		if(httpSession!=null){
			httpSession.removeAttribute(attrName);
		}
	}
	public static void removeAllAttributes(String platformOrManager){
		//从当前HttpSession中移除值
		HttpSession httpSession=getExistSession();
		if(platformOrManager.equals(Const.SESSION_PLATFORM_LOGIN_USER)){
		if(httpSession!=null){
			//从在线用户列表移除用户
			if(userlist!=null){
				for(LoginUser user:userlist){
					if(user.getSession_id().equals(httpSession.getId())&&user.getType()!=3){
						userlist.remove(user);							
						break;
					}
				}
			}	
//          这个会删除所有的session的属性
//			@SuppressWarnings("unchecked")
//			Enumeration<String> attNames=httpSession.getAttributeNames();
//			while(attNames.hasMoreElements()){
//				String pName =attNames.nextElement();
//				httpSession.removeAttribute(pName);
//			}
		}
		}else{
			if(httpSession!=null){
				//从在线用户列表移除用户
				if(userlist!=null){
					for(LoginUser user:userlist){
						if(user.getSession_id().equals(httpSession.getId())&&user.getType()==3){
							userlist.remove(user);							
							break;
						}
					}
				}	
			}
		}
	}
	public static String getSessionID(){
		//从当前HttpSession中取值
		HttpSession httpSession=getSession();
		return httpSession.getId();
	}
	/**
	 * 取得当前请求指定名称的cookie
	 * @param cookieName
	 * @return
	 */
	public static Cookie getCookie(String cookieName){
		HttpServletRequest request = getHttpRequest();
		if(request!=null){
			Cookie[] cookies=request.getCookies();
			for (Cookie cookie : cookies) {
				if(cookie.getName().equals(cookieName))
					return cookie;
			}
		    return null;
		}else
			return null;
	}
	/**
	 * 取得当前请求包含所有cookie的字符串
	 * @return
	 */
	public static String getCookieAll(){
		StringBuilder sb = new StringBuilder();
		HttpServletRequest request = getHttpRequest();
		if(request!=null){
			Cookie[] cookies=request.getCookies();
			for (Cookie cookie : cookies) {
				sb.append(cookie.getName()).append("=").append(cookie.getValue());
			}
		}
		return sb.toString();
	}
	/**
	 * 修改session超时时间
	*setSessionTime
	*void
	*@author mishengliang
	*2016-5-12上午11:34:33
	 */
	public static void setSessionTime(Integer time){
		HttpSession session = getExistSession();
		session.setMaxInactiveInterval(time);
	}
	/**获取当前登录账号队列*/
	public static List<LoginUser> getUserlist() {
		return userlist;
	}
	
}
