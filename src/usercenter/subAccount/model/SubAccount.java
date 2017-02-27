package usercenter.subAccount.model;

import java.io.Serializable;
import java.util.Date;

public class SubAccount implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -698788975399368995L;
	private int			sa_id;
	private int			reg_id;
	private int			org_id;
	private int			role_id;
	private String			sa_name;
	private String			sa_password;
	private int			enabled;
	private Date			create_date;
	private String			username;
	private String phone;
	private String last_login_ip;
	
	//辅助
	private String role_name;
	private String role_desc;
	private String acc_name;
	private String last_part_sa_name;
	private String org_name;
	private String salt;
	
	public String getOrg_name() {
		return org_name;
	}
	public void setOrg_name(String org_name) {
		this.org_name = org_name;
	}
	public String getAcc_name() {
		return acc_name;
	}
	public void setAcc_name(String acc_name) {
		this.acc_name = acc_name;
	}
	public String getLast_part_sa_name() {
		return last_part_sa_name;
	}
	public void setLast_part_sa_name(String last_part_sa_name) {
		this.last_part_sa_name = last_part_sa_name;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getSa_id() {
		return sa_id;
	}
	public void setSa_id(int sa_id) {
		this.sa_id = sa_id;
	}
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
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
	public String getRole_desc() {
		return role_desc;
	}
	public void setRole_desc(String role_desc) {
		this.role_desc = role_desc;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public String getLast_login_ip() {
		return last_login_ip;
	}
	public void setLast_login_ip(String last_login_ip) {
		this.last_login_ip = last_login_ip;
	}
	@Override
	public String toString() {
		return "SubAccount [sa_id=" + sa_id + ", reg_id=" + reg_id
				+ ", org_id=" + org_id + ", role_id=" + role_id + ", sa_name="
				+ sa_name + ", sa_password=" + sa_password + ", enabled="
				+ enabled + ", create_date=" + create_date + ", username="
				+ username + ", phone=" + phone + ", last_login_ip="
				+ last_login_ip + ", role_name=" + role_name + ", role_desc="
				+ role_desc + ", acc_name=" + acc_name + ", last_part_sa_name="
				+ last_part_sa_name + ", org_name=" + org_name + "]";
	}
}
