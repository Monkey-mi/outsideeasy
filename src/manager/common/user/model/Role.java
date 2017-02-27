package manager.common.user.model;


import java.io.Serializable;

import manager.common.Model;


/**
 * ClassName: Role
 * @Description: 系统角色表
 * @author 华慧
 * @date 2015-8-14
 */
public class Role extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8292839536690571026L;
	private int role_id;
	private String role_name;
	private String role_desc;
	private int order_seq;
	private String creator;
	private String ou_code;
	private String has_prj;
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
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getCreator() {
		return creator;
	}
	public String getHas_prj() {
		return has_prj;
	}
	public void setHas_prj(String has_prj) {
		this.has_prj = has_prj;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getOu_code() {
		return ou_code;
	}
	public void setOu_code(String ou_code) {
		this.ou_code = ou_code;
	}
}
