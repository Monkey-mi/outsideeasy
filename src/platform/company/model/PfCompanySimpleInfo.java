/**
 *outsideeasyusercenter.supplier.modelCompanySimpleInfo.java
 *	2016-3-24下午1:33:24
 * mishengliang
 */
package platform.company.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author mishengliang
 *公司基础信息 <未全部展示出信息>
 */
public class PfCompanySimpleInfo {
	private Integer company_id;//公司ID
	private String cpyname_cn;//公司名
	private String contact_addr;//联系地址
	private String contact_addr_code;//联系地址编码
	private Float totalScore;//总分
	private Integer apply_sts;//是否认证
	private String key_remark;//主营业务标注
	private BigDecimal lng;//经度
	private BigDecimal lat;//纬度
	
	private String class_name;//行业名
	private String f_phone;//固话
	private String contacts;//联系人
	private String m_phone;//手机
	private String email;//邮箱
	private String fax;//传真
	
	private String corporation;//法人代表
	private Date establish_dt;//成立日期
	private BigDecimal reg_fund;//注册资本
	private String reg_addr;//注册地址
	private String company_introduction;//公司简介
	private String  class_id;//所属行业
	private String  nature_id;//企业类型
	private String  industry_id;//经营模式
	private String  currency_id;//币种
	private String  currency_name;//币种
	private Integer emplyees;//员工人数
	private Integer tech_num;//研发人数
	private Integer op_num;//操作工
	private Integer qc_num;//专职检验
	private Integer staff_num;//间接员工
	private Integer internal_auditor_num;//内审人员
	private Integer college_num;//本科及以上
	private Integer diploma_num;//专科
	private Integer diploma_down_num;//专科及以下
	private String certification_system;//认证体系
	private Integer quality_control;//质量控制
	private Integer is_oem;//OEM代工
	private Integer turnover;//年营业额
	private Integer turnover_currency_id;//营业额货币
	private Integer import_num;//出口额
	private Integer import_currency_id;//出口额货币
	private Integer export_num;//进口额
	private Integer export_currency_id;//进口额货币
	private String company_area;//公司面积
	private String factory_area;//厂房面积
	private String factory_owner;//产权
	private String use_begintime;//使用开始时间
	private String use_endtime;//使用结束时间
	private String school_coop;//校企合作
	private Float accessScore;//认证评分
	private Date reg_date;//注册日期
	private Date audit_dt;//注册日期
	private String reg_phone;//绑定电话
	private Integer is_supplier;//是否为当前账号的供应商 0：不是  1：是
	
	public Integer getIs_supplier() {
		return is_supplier;
	}
	public void setIs_supplier(Integer is_supplier) {
		this.is_supplier = is_supplier;
	}
	public Date getAudit_dt() {
		return audit_dt;
	}
	public void setAudit_dt(Date audit_dt) {
		this.audit_dt = audit_dt;
	}
	public String getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(String industry_id) {
		this.industry_id = industry_id;
	}
	public String getCorporation() {
		return corporation;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public Date getEstablish_dt() {
		return establish_dt;
	}
	public void setEstablish_dt(Date establish_dt) {
		this.establish_dt = establish_dt;
	}
	public BigDecimal getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(BigDecimal reg_fund) {
		this.reg_fund = reg_fund;
	}
	public String getReg_addr() {
		return reg_addr;
	}
	public void setReg_addr(String reg_addr) {
		this.reg_addr = reg_addr;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public BigDecimal getLng() {
		return lng;
	}
	public void setLng(BigDecimal lng) {
		this.lng = lng;
	}
	public BigDecimal getLat() {
		return lat;
	}
	public void setLat(BigDecimal lat) {
		this.lat = lat;
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
	public Float getTotalScore() {
		return totalScore;
	}
	public void setTotalScore(Float totalScore) {
		this.totalScore = totalScore;
	}
	public Integer getCompany_id() {
		return company_id;
	}
	public void setCompany_id(Integer company_id) {
		this.company_id = company_id;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
	}
	public String getContact_addr_code() {
		return contact_addr_code;
	}
	public void setContact_addr_code(String contact_addr_code) {
		this.contact_addr_code = contact_addr_code;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public String getF_phone() {
		return f_phone;
	}
	public void setF_phone(String f_phone) {
		this.f_phone = f_phone;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getApply_sts() {
		return apply_sts;
	}
	public void setApply_sts(Integer apply_sts) {
		this.apply_sts = apply_sts;
	}
	
	public String getCompany_introduction() {
		return company_introduction;
	}
	public void setCompany_introduction(String company_introduction) {
		this.company_introduction = company_introduction;
	}
	public Integer getEmplyees() {
		return emplyees;
	}
	public void setEmplyees(Integer emplyees) {
		this.emplyees = emplyees;
	}
	public Integer getTech_num() {
		return tech_num;
	}
	public void setTech_num(Integer tech_num) {
		this.tech_num = tech_num;
	}
	public Integer getOp_num() {
		return op_num;
	}
	public void setOp_num(Integer op_num) {
		this.op_num = op_num;
	}
	public Integer getQc_num() {
		return qc_num;
	}
	public void setQc_num(Integer qc_num) {
		this.qc_num = qc_num;
	}
	public Integer getStaff_num() {
		return staff_num;
	}
	public void setStaff_num(Integer staff_num) {
		this.staff_num = staff_num;
	}
	public Integer getInternal_auditor_num() {
		return internal_auditor_num;
	}
	public void setInternal_auditor_num(Integer internal_auditor_num) {
		this.internal_auditor_num = internal_auditor_num;
	}
	public Integer getCollege_num() {
		return college_num;
	}
	public void setCollege_num(Integer college_num) {
		this.college_num = college_num;
	}
	public Integer getDiploma_num() {
		return diploma_num;
	}
	public void setDiploma_num(Integer diploma_num) {
		this.diploma_num = diploma_num;
	}
	public Integer getDiploma_down_num() {
		return diploma_down_num;
	}
	public void setDiploma_down_num(Integer diploma_down_num) {
		this.diploma_down_num = diploma_down_num;
	}
	public Integer getQuality_control() {
		return quality_control;
	}
	public void setQuality_control(Integer quality_control) {
		this.quality_control = quality_control;
	}
	public Integer getIs_oem() {
		return is_oem;
	}
	public void setIs_oem(Integer is_oem) {
		this.is_oem = is_oem;
	}
	public Integer getTurnover() {
		return turnover;
	}
	public void setTurnover(Integer turnover) {
		this.turnover = turnover;
	}
	public Integer getTurnover_currency_id() {
		return turnover_currency_id;
	}
	public void setTurnover_currency_id(Integer turnover_currency_id) {
		this.turnover_currency_id = turnover_currency_id;
	}
	public Integer getImport_num() {
		return import_num;
	}
	public void setImport_num(Integer import_num) {
		this.import_num = import_num;
	}
	public Integer getImport_currency_id() {
		return import_currency_id;
	}
	public void setImport_currency_id(Integer import_currency_id) {
		this.import_currency_id = import_currency_id;
	}
	public Integer getExport_num() {
		return export_num;
	}
	public void setExport_num(Integer export_num) {
		this.export_num = export_num;
	}
	public Integer getExport_currency_id() {
		return export_currency_id;
	}
	public void setExport_currency_id(Integer export_currency_id) {
		this.export_currency_id = export_currency_id;
	}
	public String getCompany_area() {
		return company_area;
	}
	public void setCompany_area(String company_area) {
		this.company_area = company_area;
	}
	public String getFactory_area() {
		return factory_area;
	}
	public void setFactory_area(String factory_area) {
		this.factory_area = factory_area;
	}
	public String getFactory_owner() {
		return factory_owner;
	}
	public void setFactory_owner(String factory_owner) {
		this.factory_owner = factory_owner;
	}
	public String getUse_begintime() {
		return use_begintime;
	}
	public void setUse_begintime(String use_begintime) {
		this.use_begintime = use_begintime;
	}
	public String getUse_endtime() {
		return use_endtime;
	}
	public void setUse_endtime(String use_endtime) {
		this.use_endtime = use_endtime;
	}
	public String getSchool_coop() {
		return school_coop;
	}
	public void setSchool_coop(String school_coop) {
		this.school_coop = school_coop;
	}
	public String getCertification_system() {
		return certification_system;
	}
	public void setCertification_system(String certification_system) {
		this.certification_system = certification_system;
	}
	public String getCurrency_id() {
		return currency_id;
	}
	public void setCurrency_id(String currency_id) {
		this.currency_id = currency_id;
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
	
	public String getCurrency_name() {
		return currency_name;
	}
	public void setCurrency_name(String currency_name) {
		this.currency_name = currency_name;
	}
	public Float getAccessScore() {
		return accessScore;
	}
	public void setAccessScore(Float accessScore) {
		this.accessScore = accessScore;
	}
	public String getReg_phone() {
		return reg_phone;
	}
	public void setReg_phone(String reg_phone) {
		this.reg_phone = reg_phone;
	}
	@Override
	public String toString() {
		return "PfCompanySimpleInfo [company_id=" + company_id
				+ ", cpyname_cn=" + cpyname_cn + ", contact_addr="
				+ contact_addr + ", contact_addr_code=" + contact_addr_code
				+ ", totalScore=" + totalScore + ", apply_sts=" + apply_sts
				+ ", key_remark=" + key_remark + ", lng=" + lng + ", lat="
				+ lat + ", class_name=" + class_name + ", f_phone=" + f_phone
				+ ", contacts=" + contacts + ", m_phone=" + m_phone
				+ ", email=" + email + ", fax=" + fax + ", corporation="
				+ corporation + ", establish_dt=" + establish_dt
				+ ", reg_fund=" + reg_fund + ", reg_addr=" + reg_addr
				+ ", company_introduction=" + company_introduction
				+ ", class_id=" + class_id + ", nature_id=" + nature_id
				+ ", industry_id=" + industry_id + ", currency_id="
				+ currency_id + ", currency_name=" + currency_name
				+ ", emplyees=" + emplyees + ", tech_num=" + tech_num
				+ ", op_num=" + op_num + ", qc_num=" + qc_num + ", staff_num="
				+ staff_num + ", internal_auditor_num=" + internal_auditor_num
				+ ", college_num=" + college_num + ", diploma_num="
				+ diploma_num + ", diploma_down_num=" + diploma_down_num
				+ ", certification_system=" + certification_system
				+ ", quality_control=" + quality_control + ", is_oem=" + is_oem
				+ ", turnover=" + turnover + ", turnover_currency_id="
				+ turnover_currency_id + ", import_num=" + import_num
				+ ", import_currency_id=" + import_currency_id
				+ ", export_num=" + export_num + ", export_currency_id="
				+ export_currency_id + ", company_area=" + company_area
				+ ", factory_area=" + factory_area + ", factory_owner="
				+ factory_owner + ", use_begintime=" + use_begintime
				+ ", use_endtime=" + use_endtime + ", school_coop="
				+ school_coop + ", accessScore=" + accessScore + ", reg_date="
				+ reg_date + ", audit_dt=" + audit_dt + ", reg_phone="
				+ reg_phone + ", is_supplier=" + is_supplier + "]";
	}
}
