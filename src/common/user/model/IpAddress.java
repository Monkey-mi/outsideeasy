package common.user.model;

import java.util.Date;

public class IpAddress {
	private int			adress_id;
	private String			login_id;
	private String			ip_address;
	private int			ip_state;
	private Date			create_time;

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
	
	@Override
	public String toString() {
		return "IpAddress [adress_id=" + adress_id + ", login_id=" + login_id
				+ ", ip_address=" + ip_address + ", ip_state=" + ip_state
				+ ", create_time=" + create_time + "]";
	}
	
	
}
