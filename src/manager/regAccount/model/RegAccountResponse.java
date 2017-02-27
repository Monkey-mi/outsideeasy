package manager.regAccount.model;

import java.io.Serializable;
import java.util.Date;

public class RegAccountResponse implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2208221594621654638L;				
	private int			reg_id;
	private int			company_id;
	private int			role_id;
	private String		acc_name;
    private String     cpyname_cn;//公司名  
	private String	    reg_email;
	private String		reg_phone;
	private Date		reg_date;
	private int			enabled;
	private Date 		update_date;
	
	@Override
	public String toString() {
		return "RegAccountResponse [reg_id=" + reg_id + ", company_id="
				+ company_id + ", role_id=" + role_id + ", acc_name="
				+ acc_name + ", cpyname_cn=" + cpyname_cn + ", reg_email="
				+ reg_email + ", reg_phone=" + reg_phone + ", reg_date="
				+ reg_date + ", enabled=" + enabled + ", update_date="
				+ update_date + "]";
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
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
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
	
}
