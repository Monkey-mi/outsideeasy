package common.sysmodule.model;

import java.io.Serializable;

public class SysRoleAuthority implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1058672510229810623L;
	private int			ra_id;
	private int			role_id;
	private int			class_id;
	public int getRa_id() {
		return ra_id;
	}
	public void setRa_id(int ra_id) {
		this.ra_id = ra_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getClass_id() {
		return class_id;
	}
	public void setClass_id(int class_id) {
		this.class_id = class_id;
	}

}
