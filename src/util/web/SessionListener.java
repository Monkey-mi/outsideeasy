package util.web;


import java.util.List;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;

import util.MySessionContext;
import util.SessionUtil;
import util.properties.OpenClose;

import common.model.LoginUser;

public class SessionListener implements HttpSessionListener,HttpSessionAttributeListener {
	protected static Logger logger = Logger.getLogger("service");
	private   MySessionContext myc=MySessionContext.getInstance();
	@Override
	public void sessionCreated(HttpSessionEvent hse) {
		// TODO Auto-generated method stub
		logger.debug("one session created...");
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent hse) {
		if(!"open".equals(OpenClose.getPropertiesByKey("openSingleLogin"))){
			return;
		}
		
		List<LoginUser> users=SessionUtil.getUserlist();
		
		HttpSession httpSession = hse.getSession();
		//自定义session缓存删除 旧session的引用
		myc.DelSession(httpSession);
		//从在线用户列表移除用户
		if(users!=null){
			for(LoginUser user:users){
				if(user.getSession_id().equals(httpSession.getId())){
					users.remove(user);
					logger.debug(user.getName()+"one session destroyed...");
					break;
				}
			}
		}
		
	}

	@Override
	public void attributeAdded(HttpSessionBindingEvent hsbe) {
		// TODO Auto-generated method stub
		logger.debug(String.format("attribute[%s]added...",hsbe.getName()));
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent hsbe) {
		// TODO Auto-generated method stub
		logger.debug(String.format("attribute[%s]removed...",hsbe.getName()));
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent hsbe) {
		// TODO Auto-generated method stub
		logger.debug(String.format("attribute[%s]replaced...",hsbe.getName()));
	}

}
