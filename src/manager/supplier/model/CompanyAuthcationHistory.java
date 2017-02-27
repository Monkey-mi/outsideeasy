package manager.supplier.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class CompanyAuthcationHistory extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8103231185688520875L;
	private int			auth_history_id;
	private int			company_id;
	private String			class_id;
	private String			nature_id;
	private String			key_remark;
	private String			cpyname_cn;
	
	private int			industry_id;
	
	private String			corporation;
	private double			reg_fund;
	private int			currency_id;
	private Date			establish_dt;
	private Date			created_dt;

	public int getAuth_history_id() {
		return auth_history_id;
	}
	public void setAuth_history_id(int auth_history_id) {
		this.auth_history_id = auth_history_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getClass_id() {
		return class_id;
	}
	public void setClass_id(String class_id) {
		this.class_id = class_id;
	}
	public String getNature_id() {
		return nature_id;
	}
	public void setNature_id(String nature_id) {
		this.nature_id = nature_id;
	}
	public String getKey_remark() {
		return key_remark;
	}
	public void setKey_remark(String key_remark) {
		this.key_remark = key_remark;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	
	public int getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(int industry_id) {
		this.industry_id = industry_id;
	}
	
	public String getCorporation() {
		return corporation;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public double getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(double reg_fund) {
		this.reg_fund = reg_fund;
	}
	public int getCurrency_id() {
		return currency_id;
	}
	public void setCurrency_id(int currency_id) {
		this.currency_id = currency_id;
	}
	public Date getEstablish_dt() {
		return establish_dt;
	}
	public void setEstablish_dt(Date establish_dt) {
		this.establish_dt = establish_dt;
	}
	public Date getCreated_dt() {
		return created_dt;
	}
	public void setCreated_dt(Date created_dt) {
		this.created_dt = created_dt;
	}
	
}
