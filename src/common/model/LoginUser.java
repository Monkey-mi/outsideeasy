package common.model;

import java.util.Date;
/**当前登录账号
 * 作用：1 单用户登陆*/
public class LoginUser {

	private int u_id;//登陆表的id，u_id+type 联合起来唯一
	private String name;//登录账号名
	private Date login_time;//登录时间
	private int type;//账号类型：1 注册账号；2 子账号 3 后台管理账号
	private String session_id;//sessionid
	private String server_name;//数据库类型，当前不用
	private int state;//状态，当前不用
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getLogin_time() {
		return login_time;
	}
	public void setLogin_time(Date login_time) {
		this.login_time = login_time;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getSession_id() {
		return session_id;
	}
	public void setSession_id(String session_id) {
		this.session_id = session_id;
	}
	public String getServer_name() {
		return server_name;
	}
	public void setServer_name(String server_name) {
		this.server_name = server_name;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	
}
