package platform.supplierAccess.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


public class PfAuthcationUpdate  implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			auth_update_id;
	private int			company_id;
	private String			class_id;
	private String			nature_id;
	private String          key_remark;
	private String			cpyname_cn;
	private Integer			contact_addr_code;
	private String			contact_addr;
	private BigDecimal      lng;//经度
	private BigDecimal      lat;//纬度
	private int			industry_id;
	private String			f_phone;
	private String			corporation;
	private Double			reg_fund;
	private int			currency_id;
	private Date			establish_dt;
	private Date			created_dt;
	private int			state;
	private String  auth_opinion;
	private String  company_introduction;
	private String  nature_name;
	private String  industry_name;
	private String  class_name;
	private String  currency_name;
	private String  bus_license;
	private String  tax_certificate;
	private String  org_code;
	private String  rat_certificate;
	
	public String getKey_remark() {
		return key_remark;
	}
	public void setKey_remark(String key_remark) {
		this.key_remark = key_remark;
	}
	public String getBus_license() {
		return bus_license;
	}
	public void setBus_license(String bus_license) {
		this.bus_license = bus_license;
	}
	public String getTax_certificate() {
		return tax_certificate;
	}
	public void setTax_certificate(String tax_certificate) {
		this.tax_certificate = tax_certificate;
	}
	public String getOrg_code() {
		return org_code;
	}
	public void setOrg_code(String org_code) {
		this.org_code = org_code;
	}
	public String getRat_certificate() {
		return rat_certificate;
	}
	public void setRat_certificate(String rat_certificate) {
		this.rat_certificate = rat_certificate;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public String getIndustry_name() {
		return industry_name;
	}
	public void setIndustry_name(String industry_name) {
		this.industry_name = industry_name;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public String getCurrency_name() {
		return currency_name;
	}
	public void setCurrency_name(String currency_name) {
		this.currency_name = currency_name;
	}
	public int getAuth_update_id() {
		return auth_update_id;
	}
	public void setAuth_update_id(int auth_update_id) {
		this.auth_update_id = auth_update_id;
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
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public Integer getContact_addr_code() {
		return contact_addr_code;
	}
	public void setContact_addr_code(Integer contact_addr_code) {
		this.contact_addr_code = contact_addr_code;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
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
	public int getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(int industry_id) {
		this.industry_id = industry_id;
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
	public Double getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(Double reg_fund) {
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
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getAuth_opinion() {
		return auth_opinion;
	}
	public void setAuth_opinion(String auth_opinion) {
		this.auth_opinion = auth_opinion;
	}
	public String getCompany_introduction() {
		return company_introduction;
	}
	public void setCompany_introduction(String company_introduction) {
		this.company_introduction = company_introduction;
	}
	
	@Override
	public String toString() {
		return "PfAuthcationUpdate [auth_update_id=" + auth_update_id
				+ ", company_id=" + company_id + ", class_id=" + class_id
				+ ", nature_id=" + nature_id + ", key_remark=" + key_remark
				+ ", cpyname_cn=" + cpyname_cn + ", contact_addr_code="
				+ contact_addr_code + ", contact_addr=" + contact_addr
				+ ", lng=" + lng + ", lat=" + lat + ", industry_id="
				+ industry_id + ", f_phone=" + f_phone + ", corporation="
				+ corporation + ", reg_fund=" + reg_fund + ", currency_id="
				+ currency_id + ", establish_dt=" + establish_dt
				+ ", created_dt=" + created_dt + ", state=" + state
				+ ", auth_opinion=" + auth_opinion + ", company_introduction="
				+ company_introduction + ", nature_name=" + nature_name
				+ ", industry_name=" + industry_name + ", class_name="
				+ class_name + ", currency_name=" + currency_name
				+ ", bus_license=" + bus_license + ", tax_certificate="
				+ tax_certificate + ", org_code=" + org_code
				+ ", rat_certificate=" + rat_certificate + "]";
	}
	
}
