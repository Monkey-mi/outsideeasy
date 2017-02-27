package manager.ipmanager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 账号的ip地址
 * @Description: 
 * @author chenlong
 * @date
 */

public class IpAddress implements Serializable{

	private static final long serialVersionUID = 1804746056319606375L;
	private int			adress_id;//主键ID
	private String			login_id;//账号名称
	private String			ip_address;//ip地址
	private int			ip_state;//ip的使用状态'-1表示是失效IP，0表示是临时IP，1表示是常用IP'
	private Date			create_time;//创建时间

	public int getAdress_id() {
		return adress_id;
	}
	public void setAdress_id(int adress_id) {
		this.adress_id = adress_id;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public String getIp_address() {
		return ip_address;
	}
	public void setIp_address(String ip_address) {
		this.ip_address = ip_address;
	}
	public int getIp_state() {
		return ip_state;
	}
	public void setIp_state(int ip_state) {
		this.ip_state = ip_state;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	
}
