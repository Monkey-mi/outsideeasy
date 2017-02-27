package common.user.model;

import java.io.Serializable;
import java.util.Date;


public class RegAccout  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1485985409977441803L;
	private int			reg_id;
	private int			company_id;
	private String      cpyname_cn;
	private int			role_id;
	private String			acc_name;
	private String			password;
	private String			reg_email;
	private Byte            email_valid;
	private String			reg_phone;
	private Date			reg_date;
	private int			enabled;
	private Date 		update_date;
	private String      last_login_ip;

	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public String getAcc_name() {
		return acc_name;
	}
	public void setAcc_name(String acc_name) {
		this.acc_name = acc_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getReg_email() {
		return reg_email;
	}
	public void setReg_email(String reg_email) {
		this.reg_email = reg_email;
	}
	public Byte getEmail_valid() {
		return email_valid;
	}
	public void setEmail_valid(Byte email_valid) {
		this.email_valid = email_valid;
	}
	public String getReg_phone() {
		return reg_phone;
	}
	public void setReg_phone(String reg_phone) {
		this.reg_phone = reg_phone;
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
	public String getLast_login_ip() {
		return last_login_ip;
	}
	public void setLast_login_ip(String last_login_ip) {
		this.last_login_ip = last_login_ip;
	}
	
	@Override
	public String toString() {
		return "RegAccout [reg_id=" + reg_id + ", company_id=" + company_id
				+ ", cpyname_cn=" + cpyname_cn + ", role_id=" + role_id
				+ ", acc_name=" + acc_name + ", password=" + password
				+ ", reg_email=" + reg_email + ", email_valid=" + email_valid
				+ ", reg_phone=" + reg_phone + ", reg_date=" + reg_date
				+ ", enabled=" + enabled + ", update_date=" + update_date
				+ ", last_login_ip=" + last_login_ip + "]";
	}
	
}
