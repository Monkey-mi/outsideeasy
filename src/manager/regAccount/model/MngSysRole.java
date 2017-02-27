package manager.regAccount.model;

import java.io.Serializable;

public class MngSysRole implements Serializable{
	private static final long serialVersionUID = 134946461584722241L;
	private int			role_id;
	private String			role_name;
	private String			role_desc;
	private int			order_seq;
	private int			role_type;
	private int         is_select;

	public int getIs_select() {
		return is_select;
	}
	public void setIs_select(int is_select) {
		this.is_select = is_select;
	}
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
	public int getRole_type() {
		return role_type;
	}
	public void setRole_type(int role_type) {
		this.role_type = role_type;
	}
}
