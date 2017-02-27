package common.sysmodule.model;

import java.io.Serializable;

public class SysPageFunc implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1048957246392730069L;
	private int			f_id;
	private int			authority_id;
	private String			code;
	private String			name;
	private int			order_seq;

	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public int getAuthority_id() {
		return authority_id;
	}
	public void setAuthority_id(int authority_id) {
		this.authority_id = authority_id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
}
