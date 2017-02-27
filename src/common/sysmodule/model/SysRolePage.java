package common.sysmodule.model;

import java.io.Serializable;

public class SysRolePage implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4700241253416894307L;
	private int			rp_id;
	private int			role_id;
	private int			authority_id;

	public int getRp_id() {
		return rp_id;
	}
	public void setRp_id(int rp_id) {
		this.rp_id = rp_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getAuthority_id() {
		return authority_id;
	}
	public void setAuthority_id(int authority_id) {
		this.authority_id = authority_id;
	}
}
