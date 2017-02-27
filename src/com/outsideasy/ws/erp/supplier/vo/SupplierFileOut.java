package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;
import java.util.Date;

public class SupplierFileOut implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8764718851328357119L;
	private int			company_id;
	private String			class_name;
	private String			nature_name;
	private String			inner_level;
	private String			apply_sts;
	private String			cpyname_cn;
	private String			reg_addr_all;
	private String			reg_addr;
	private String			contact_addr_all;
	private String			contact_addr;
	
	private String             industry_name;
	private String             taxman_name;
	
	private String			f_phone;
	private String			corporation;
	private String			contacts;
	private String			m_phone;
	private String			fax;
	private String			email;
	private String			bus_license;
	private String			tax_no;
	private double			reg_fund;
	
	private String  currency_name;
	private Date			establish_dt;
	private int			emplyees;
	private int			college_num;
	private int			op_num;
	private int			tech_num;
	private int			qc_num;
	private int			staff_num;
	private int			qe_num;
	private double			company_area;
	private double			factory_area;
	private String			factory_owner;
	private Date			use_begintime;
	private Date			use_endtime;
	private double			turnover;
	private String  turnover_currency_name;
	
	private String			certification_system;
	private Date			create_dt;
	private int version;
	private String auditor;
	private Date audit_dt;
	private int is_chinese;
	private int mc_id_1;
	private String mc_name_1;
	private String mc_id_2;
	private String mc_name_2;
	private String mc_id_3;
	private String mc_name_3;
	private String key_remark;
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public String getInner_level() {
		return inner_level;
	}
	public void setInner_level(String inner_level) {
		this.inner_level = inner_level;
	}
	public String getApply_sts() {
		return apply_sts;
	}
	public void setApply_sts(String apply_sts) {
		this.apply_sts = apply_sts;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public String getReg_addr_all() {
		return reg_addr_all;
	}
	public void setReg_addr_all(String reg_addr_all) {
		this.reg_addr_all = reg_addr_all;
	}
	public String getReg_addr() {
		return reg_addr;
	}
	public void setReg_addr(String reg_addr) {
		this.reg_addr = reg_addr;
	}
	public String getContact_addr_all() {
		return contact_addr_all;
	}
	public void setContact_addr_all(String contact_addr_all) {
		this.contact_addr_all = contact_addr_all;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
	}
	public String getIndustry_name() {
		return industry_name;
	}
	public void setIndustry_name(String industry_name) {
		this.industry_name = industry_name;
	}
	public String getTaxman_name() {
		return taxman_name;
	}
	public void setTaxman_name(String taxman_name) {
		this.taxman_name = taxman_name;
	}
	public String getF_phone() {
		return f_phone;
	}
	public void setF_phone(String f_phone) {
		this.f_phone = f_phone;
	}
	public String getCorporation() {
		return corporation;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getM_phone() {
		return m_phone;
	}
	public void setM_phone(String m_phone) {
		this.m_phone = m_phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBus_license() {
		return bus_license;
	}
	public void setBus_license(String bus_license) {
		this.bus_license = bus_license;
	}
	public String getTax_no() {
		return tax_no;
	}
	public void setTax_no(String tax_no) {
		this.tax_no = tax_no;
	}
	public double getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(double reg_fund) {
		this.reg_fund = reg_fund;
	}
	public String getCurrency_name() {
		return currency_name;
	}
	public void setCurrency_name(String currency_name) {
		this.currency_name = currency_name;
	}
	public Date getEstablish_dt() {
		return establish_dt;
	}
	public void setEstablish_dt(Date establish_dt) {
		this.establish_dt = establish_dt;
	}
	public int getEmplyees() {
		return emplyees;
	}
	public void setEmplyees(int emplyees) {
		this.emplyees = emplyees;
	}
	public int getCollege_num() {
		return college_num;
	}
	public void setCollege_num(int college_num) {
		this.college_num = college_num;
	}
	public int getOp_num() {
		return op_num;
	}
	public void setOp_num(int op_num) {
		this.op_num = op_num;
	}
	public int getTech_num() {
		return tech_num;
	}
	public void setTech_num(int tech_num) {
		this.tech_num = tech_num;
	}
	public int getQc_num() {
		return qc_num;
	}
	public void setQc_num(int qc_num) {
		this.qc_num = qc_num;
	}
	public int getStaff_num() {
		return staff_num;
	}
	public void setStaff_num(int staff_num) {
		this.staff_num = staff_num;
	}
	public int getQe_num() {
		return qe_num;
	}
	public void setQe_num(int qe_num) {
		this.qe_num = qe_num;
	}
	public double getCompany_area() {
		return company_area;
	}
	public void setCompany_area(double company_area) {
		this.company_area = company_area;
	}
	public double getFactory_area() {
		return factory_area;
	}
	public void setFactory_area(double factory_area) {
		this.factory_area = factory_area;
	}
	public String getFactory_owner() {
		return factory_owner;
	}
	public void setFactory_owner(String factory_owner) {
		this.factory_owner = factory_owner;
	}
	public Date getUse_begintime() {
		return use_begintime;
	}
	public void setUse_begintime(Date use_begintime) {
		this.use_begintime = use_begintime;
	}
	public Date getUse_endtime() {
		return use_endtime;
	}
	public void setUse_endtime(Date use_endtime) {
		this.use_endtime = use_endtime;
	}
	public double getTurnover() {
		return turnover;
	}
	public void setTurnover(double turnover) {
		this.turnover = turnover;
	}
	public String getTurnover_currency_name() {
		return turnover_currency_name;
	}
	public void setTurnover_currency_name(String turnover_currency_name) {
		this.turnover_currency_name = turnover_currency_name;
	}
	public String getCertification_system() {
		return certification_system;
	}
	public void setCertification_system(String certification_system) {
		this.certification_system = certification_system;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getAuditor() {
		return auditor;
	}
	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}
	public Date getAudit_dt() {
		return audit_dt;
	}
	public void setAudit_dt(Date audit_dt) {
		this.audit_dt = audit_dt;
	}
	public int getIs_chinese() {
		return is_chinese;
	}
	public void setIs_chinese(int is_chinese) {
		this.is_chinese = is_chinese;
	}
	public int getMc_id_1() {
		return mc_id_1;
	}
	public void setMc_id_1(int mc_id_1) {
		this.mc_id_1 = mc_id_1;
	}
	public String getMc_name_1() {
		return mc_name_1;
	}
	public void setMc_name_1(String mc_name_1) {
		this.mc_name_1 = mc_name_1;
	}
	public String getMc_id_2() {
		return mc_id_2;
	}
	public void setMc_id_2(String mc_id_2) {
		this.mc_id_2 = mc_id_2;
	}
	public String getMc_name_2() {
		return mc_name_2;
	}
	public void setMc_name_2(String mc_name_2) {
		this.mc_name_2 = mc_name_2;
	}
	public String getMc_id_3() {
		return mc_id_3;
	}
	public void setMc_id_3(String mc_id_3) {
		this.mc_id_3 = mc_id_3;
	}
	public String getMc_name_3() {
		return mc_name_3;
	}
	public void setMc_name_3(String mc_name_3) {
		this.mc_name_3 = mc_name_3;
	}
	public String getKey_remark() {
		return key_remark;
	}
	public void setKey_remark(String key_remark) {
		this.key_remark = key_remark;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	
}
