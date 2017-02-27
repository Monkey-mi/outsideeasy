package manager.common.orgunit.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;


public class OrgUnit extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7942524330000922322L;
	private int			ou_id;
	private String			ou_code;
	private String			ou_name;
	private String			ou_alias;
	private String			ou_address;
	private String			ou_leader;
	private String			ou_type;
	private int			ou_parentid;
	private String			creator;
	private Date			create_dt;
	private String			create_ou;
	private int			del_flg;

	public int getOu_id() {
		return ou_id;
	}
	public void setOu_id(int ou_id) {
		this.ou_id = ou_id;
	}
	public String getOu_code() {
		return ou_code;
	}
	public void setOu_code(String ou_code) {
		this.ou_code = ou_code;
	}
	public String getOu_name() {
		return ou_name;
	}
	public void setOu_name(String ou_name) {
		this.ou_name = ou_name;
	}
	public String getOu_alias() {
		return ou_alias;
	}
	public void setOu_alias(String ou_alias) {
		this.ou_alias = ou_alias;
	}
	public String getOu_address() {
		return ou_address;
	}
	public void setOu_address(String ou_address) {
		this.ou_address = ou_address;
	}
	public String getOu_leader() {
		return ou_leader;
	}
	public void setOu_leader(String ou_leader) {
		this.ou_leader = ou_leader;
	}
	public String getOu_type() {
		return ou_type;
	}
	public void setOu_type(String ou_type) {
		this.ou_type = ou_type;
	}
	public int getOu_parentid() {
		return ou_parentid;
	}
	public void setOu_parentid(int ou_parentid) {
		this.ou_parentid = ou_parentid;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getCreate_ou() {
		return create_ou;
	}
	public void setCreate_ou(String create_ou) {
		this.create_ou = create_ou;
	}
	public int getDel_flg() {
		return del_flg;
	}
	public void setDel_flg(int del_flg) {
		this.del_flg = del_flg;
	}
}
