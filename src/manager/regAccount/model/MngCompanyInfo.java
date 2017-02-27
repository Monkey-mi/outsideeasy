package manager.regAccount.model;

import java.io.Serializable;
import java.util.Date;

public class MngCompanyInfo implements Serializable{
	private static final long serialVersionUID = -8103863228353534343L;
	private int			company_id;
	private String			class_id;
	private String			nature_id;
	private int			apply_sts;
	private String			cpyname_en;
	private String			cpyname_cn;
	private int			reg_addr_code;
	private String			reg_addr;
	private int			contact_addr_code;
	private int			industry_id;
	private String			contact_addr;
	private String			f_phone;
	private String			corporation;
	private String			contacts;
	private String			m_phone;
	private String			fax;
	private String			email;
	private String			contact_email;
	private String			bus_license;
	private String			tax_no;
	private float			reg_fund;
	private int			taxman_id;
	private int			currency_id;
	private Date			establish_dt;
	private int			emplyees;
	private int			college_num;
	private int			diploma_num;
	private int			diploma_down_num;
	private int			op_num;
	private int			tech_num;
	private int			qc_num;
	private int			staff_num;
	private int			internal_auditor_num;
	private int			qe_num;
	private double			company_area;
	private double			factory_area;
	private String			factory_owner;
	private Date			use_begintime;
	private Date			use_endtime;
	private float			turnover;
	private int			turnover_currency_id;
	private float			import_num;
	private int			import_currency_id;
	private float			export_num;
	private int			export_currency_id;
	private String			certification_system;
	private Date			create_dt;
	private String			ip_addr;
	private Date			checked_date;
	private int			version;
	private float			lng;
	private float			lat;
	private int			quality_control;
	private boolean			is_oem;
	private String			key_remark;
	private boolean			is_archive;
	private boolean			is_delete;
	private String			operator;
	private Date			operater_dt;
	private String			auditor;
	private Date			audit_dt;
	private String			company_introduction;
	private String			school_coop;
	private int			is_main;
	
	private String nature_name;//企业性质名称
	private String class_name;//类目名称
	private String industry_name;//经营模式名称
	private String taxman_name;//纳税人类别名称
	private String currency_name;//币种名称

	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
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
	public String getCurrency_name() {
		return currency_name;
	}
	public void setCurrency_name(String currency_name) {
		this.currency_name = currency_name;
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
	public int getApply_sts() {
		return apply_sts;
	}
	public void setApply_sts(int apply_sts) {
		this.apply_sts = apply_sts;
	}
	public String getCpyname_en() {
		return cpyname_en;
	}
	public void setCpyname_en(String cpyname_en) {
		this.cpyname_en = cpyname_en;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getReg_addr_code() {
		return reg_addr_code;
	}
	public void setReg_addr_code(int reg_addr_code) {
		this.reg_addr_code = reg_addr_code;
	}
	public String getReg_addr() {
		return reg_addr;
	}
	public void setReg_addr(String reg_addr) {
		this.reg_addr = reg_addr;
	}
	public int getContact_addr_code() {
		return contact_addr_code;
	}
	public void setContact_addr_code(int contact_addr_code) {
		this.contact_addr_code = contact_addr_code;
	}
	public int getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(int industry_id) {
		this.industry_id = industry_id;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
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
	public String getContact_email() {
		return contact_email;
	}
	public void setContact_email(String contact_email) {
		this.contact_email = contact_email;
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
	public float getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(float reg_fund) {
		this.reg_fund = reg_fund;
	}
	public int getTaxman_id() {
		return taxman_id;
	}
	public void setTaxman_id(int taxman_id) {
		this.taxman_id = taxman_id;
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
	public int getDiploma_num() {
		return diploma_num;
	}
	public void setDiploma_num(int diploma_num) {
		this.diploma_num = diploma_num;
	}
	public int getDiploma_down_num() {
		return diploma_down_num;
	}
	public void setDiploma_down_num(int diploma_down_num) {
		this.diploma_down_num = diploma_down_num;
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
	public int getInternal_auditor_num() {
		return internal_auditor_num;
	}
	public void setInternal_auditor_num(int internal_auditor_num) {
		this.internal_auditor_num = internal_auditor_num;
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
	public float getTurnover() {
		return turnover;
	}
	public void setTurnover(float turnover) {
		this.turnover = turnover;
	}
	public int getTurnover_currency_id() {
		return turnover_currency_id;
	}
	public void setTurnover_currency_id(int turnover_currency_id) {
		this.turnover_currency_id = turnover_currency_id;
	}
	public float getImport_num() {
		return import_num;
	}
	public void setImport_num(float import_num) {
		this.import_num = import_num;
	}
	public int getImport_currency_id() {
		return import_currency_id;
	}
	public void setImport_currency_id(int import_currency_id) {
		this.import_currency_id = import_currency_id;
	}
	public float getExport_num() {
		return export_num;
	}
	public void setExport_num(float export_num) {
		this.export_num = export_num;
	}
	public int getExport_currency_id() {
		return export_currency_id;
	}
	public void setExport_currency_id(int export_currency_id) {
		this.export_currency_id = export_currency_id;
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
	public String getIp_addr() {
		return ip_addr;
	}
	public void setIp_addr(String ip_addr) {
		this.ip_addr = ip_addr;
	}
	public Date getChecked_date() {
		return checked_date;
	}
	public void setChecked_date(Date checked_date) {
		this.checked_date = checked_date;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public float getLng() {
		return lng;
	}
	public void setLng(float lng) {
		this.lng = lng;
	}
	public float getLat() {
		return lat;
	}
	public void setLat(float lat) {
		this.lat = lat;
	}
	public int getQuality_control() {
		return quality_control;
	}
	public void setQuality_control(int quality_control) {
		this.quality_control = quality_control;
	}
	public boolean getIs_oem() {
		return is_oem;
	}
	public void setIs_oem(boolean is_oem) {
		this.is_oem = is_oem;
	}
	public String getKey_remark() {
		return key_remark;
	}
	public void setKey_remark(String key_remark) {
		this.key_remark = key_remark;
	}
	public boolean getIs_archive() {
		return is_archive;
	}
	public void setIs_archive(boolean is_archive) {
		this.is_archive = is_archive;
	}
	public boolean getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(boolean is_delete) {
		this.is_delete = is_delete;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public Date getOperater_dt() {
		return operater_dt;
	}
	public void setOperater_dt(Date operater_dt) {
		this.operater_dt = operater_dt;
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
	public String getCompany_introduction() {
		return company_introduction;
	}
	public void setCompany_introduction(String company_introduction) {
		this.company_introduction = company_introduction;
	}
	public String getSchool_coop() {
		return school_coop;
	}
	public void setSchool_coop(String school_coop) {
		this.school_coop = school_coop;
	}
	public int getIs_main() {
		return is_main;
	}
	public void setIs_main(int is_main) {
		this.is_main = is_main;
	}
}
