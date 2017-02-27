package manager.regAccount.model;

import java.io.Serializable;
import java.util.Date;
//子账号
public class MngSubAccount implements Serializable {
	private static final long serialVersionUID = 5142809557223738836L;
	private int			sa_id;//子账号ID
	private int			org_id;//组织架构表主键
	private int			role_id;//系统账号角色表主键
	private int			reg_id;//主账号ID
	private String			sa_name;//子帐号名称
	private String			sa_password;//子账号密码
	private int			enabled;//启用状态
	private Date			create_date;//创建日期
	private String			username;//用户名
	private String			phone;//手机号
	private String			last_login_ip;//上次登录IP
	private String          name;//部门名称
	private String          emp_no;//部门名称
	private int			is_delete;//启用状态	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	private String	        role_name;//角色名称

	public int getSa_id() {
		return sa_id;
	}
	public void setSa_id(int sa_id) {
		this.sa_id = sa_id;
	}
	public int getOrg_id() {
		return org_id;
	}
	public void setOrg_id(int org_id) {
		this.org_id = org_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
	}
	public String getSa_name() {
		return sa_name;
	}
	public void setSa_name(String sa_name) {
		this.sa_name = sa_name;
	}
	public String getSa_password() {
		return sa_password;
	}
	public void setSa_password(String sa_password) {
		this.sa_password = sa_password;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getLast_login_ip() {
		return last_login_ip;
	}
	public void setLast_login_ip(String last_login_ip) {
		this.last_login_ip = last_login_ip;
	}
	public String getEmp_no() {
		return emp_no;
	}
	public void setEmp_no(String emp_no) {
		this.emp_no = emp_no;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}


}
