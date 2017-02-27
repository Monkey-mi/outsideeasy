package common.sysmodule.model;

import java.io.Serializable;

public class SysRolePageFunc implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4880288721601650850L;
	private int			rf_id;
	private int			role_id;
	private int			f_id;

	public int getRf_id() {
		return rf_id;
	}
	public void setRf_id(int rf_id) {
		this.rf_id = rf_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
}
