package usercenter.subAccount.model;

import java.io.Serializable;

public class UcSysRole implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9138760750222934616L;
	private int			role_id;
	private String			role_name;
	private String			role_desc;
	private int			order_seq;
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	public String getRole_desc() {
		return role_desc;
	}
	public void setRole_desc(String role_desc) {
		this.role_desc = role_desc;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	
}
