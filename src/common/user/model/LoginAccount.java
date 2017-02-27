/**
 * 登录账号信息
 */
package common.user.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class LoginAccount implements Serializable {
	private static final long serialVersionUID = -5814263286091838468L;
	
	private int			login_id;
	private int			role_id;
	private String			login_name;
	private String       sub_user_name;
	private String			password;
	private String			account_email;
	private Byte            email_valid;
	private String			account_phone;
	private Date			reg_date;
	private int			enabled;
	private Date 		update_date;
	private int account_type;//账号类型，用来判断 主账号0 ：子账号1
	private int parent_id;//子账号情况下的主账号ID
	private String      last_login_ip;
	private int org_id;
	private List<Integer> subRoles;//一个子账号可以对应多个角色
	private boolean isVip;
	
	public String getSub_user_name() {
		return sub_user_name;
	}
	public void setSub_user_name(String sub_user_name) {
		this.sub_user_name = sub_user_name;
	}
	public int getLogin_id() {
		return login_id;
	}
	public void setLogin_id(int login_id) {
		this.login_id = login_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public String getLogin_name() {
		return login_name;
	}
	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAccount_email() {
		return account_email;
	}
	public void setAccount_email(String account_email) {
		this.account_email = account_email;
	}
	public Byte getEmail_valid() {
		return email_valid;
	}
	public void setEmail_valid(Byte email_valid) {
		this.email_valid = email_valid;
	}
	public String getAccount_phone() {
		return account_phone;
	}
	public void setAccount_phone(String account_phone) {
		this.account_phone = account_phone;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}
	public int getAccount_type() {
		return account_type;
	}
	public void setAccount_type(int account_type) {
		this.account_type = account_type;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public String getLast_login_ip() {
		return last_login_ip;
	}
	public void setLast_login_ip(String last_login_ip) {
		this.last_login_ip = last_login_ip;
	}
	public int getOrg_id() {
		return org_id;
	}
	public void setOrg_id(int org_id) {
		this.org_id = org_id;
	}
	public boolean isVip() {
		return isVip;
	}
	public void setVip(boolean isVip) {
		this.isVip = isVip;
	}
	public List<Integer> getSubRoles() {
		return subRoles;
	}
	public void setSubRoles(List<Integer> subRoles) {
		this.subRoles = subRoles;
	}
	@Override
	public String toString() {
		return "LoginAccount [login_id=" + login_id + ", role_id=" + role_id
				+ ", login_name=" + login_name + ", sub_user_name="
				+ sub_user_name + ", password=" + password + ", account_email="
				+ account_email + ", email_valid=" + email_valid
				+ ", account_phone=" + account_phone + ", reg_date=" + reg_date
				+ ", enabled=" + enabled + ", update_date=" + update_date
				+ ", account_type=" + account_type + ", parent_id=" + parent_id
				+ ", last_login_ip=" + last_login_ip + ", org_id=" + org_id
				+ ", subRoles=" + subRoles + ", isVip=" + isVip + "]";
	}
}
