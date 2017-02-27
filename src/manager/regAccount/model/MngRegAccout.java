package manager.regAccount.model;

import java.io.Serializable;
import java.util.Date;
/**
 *注册账号表
 * @author chenlong
 * @date 2016-7-18
 */
public class MngRegAccout implements Serializable {
	private static final long serialVersionUID = 7438464548478464899L;
	private int			reg_id;//主账号ID
	private int			role_id;//系统账号角色表主键
	private int			company_id;//公司编号
	private String			acc_name;//账号名称
	private String			password;//密码
	private String			reg_email;//注册邮箱
	private String			reg_phone;//注册手机
	private Date			reg_date;//注册日期
	private int			enabled;//启用状态
	private Date			update_date;//修改时间
	private int			email_valid;//邮箱验证
	private String			last_login_ip;//最后登录IP
	
	private String         role_name;//角色名
	private String         cpyname_cn;//公司名

	public String getRole_name() {
		return role_name;
	}
	
	public String getCpyname_cn() {
		return cpyname_cn;
	}

	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
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
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}
	public int getEmail_valid() {
		return email_valid;
	}
	public void setEmail_valid(int email_valid) {
		this.email_valid = email_valid;
	}
	public String getLast_login_ip() {
		return last_login_ip;
	}
	public void setLast_login_ip(String last_login_ip) {
		this.last_login_ip = last_login_ip;
	}
}
