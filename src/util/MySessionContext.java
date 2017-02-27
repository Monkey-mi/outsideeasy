package util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;
/**自定义session缓存*/
public class MySessionContext {

	private static MySessionContext instance= new MySessionContext();
	private Map<String, HttpSession> mymap;
	
	private MySessionContext() {
		mymap = Collections.synchronizedMap(new HashMap<String, HttpSession>());//map改成线程安全的
	}

	public static MySessionContext getInstance() {
		return instance;
	}

	public synchronized void AddSession(HttpSession session) {
		if (session != null) {
			mymap.put(session.getId(), session);
		}
	}

	public synchronized void DelSession(HttpSession session) {
		if (session != null) {
			mymap.remove(session.getId());
		}
	}

	public synchronized HttpSession getSession(String session_id) {
		if (session_id == null)
			return null;
		return (HttpSession) mymap.get(session_id);
	}
}
