/**
 *outsideeasyusercenter.supplier.modelCompanySimpleInfo.java
 *	2016-3-24下午1:33:24
 * mishengliang
 */
package usercenter.company.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author mishengliang
 *公司基础信息 <未全部展示出信息>
 */
public class CompanySimpleInfo {
	private Integer company_id;//公司ID
	private String cpyname_cn;//公司名
	private String contact_addr;//联系地址
	private Float totalScore;//总分
	private Integer apply_sts;//是否认证
	private String key_remark;//主营业务标注
	private Date reg_date;//注册日期
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
	
	private Double accessScore;//供应商得分
	private Integer isSupplier;//是否为当前账号的供应商
	
	public Integer getIsSupplier() {
		return isSupplier;
	}
	public void setIsSupplier(Integer isSupplier) {
		this.isSupplier = isSupplier;
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
	public Double getAccessScore() {
		return accessScore;
	}
	public void setAccessScore(Double accessScore) {
		this.accessScore = accessScore;
	}
	@Override
	public String toString() {
		return "CompanySimpleInfo [company_id=" + company_id + ", cpyname_cn="
				+ cpyname_cn + ", contact_addr=" + contact_addr
				+ ", totalScore=" + totalScore + ", apply_sts=" + apply_sts
				+ ", key_remark=" + key_remark + ", reg_date=" + reg_date
				+ ", lng=" + lng + ", lat=" + lat + ", class_name="
				+ class_name + ", f_phone=" + f_phone + ", contacts="
				+ contacts + ", m_phone=" + m_phone + ", email=" + email
				+ ", fax=" + fax + ", corporation=" + corporation
				+ ", establish_dt=" + establish_dt + ", reg_fund=" + reg_fund
				+ ", reg_addr=" + reg_addr + ", accessScore=" + accessScore
				+ "]";
	}
}
