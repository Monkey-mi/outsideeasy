/**    
 * 文件名：CompnayExtraInfo.java    
 *    
 * 版本信息：    
 * 日期：2016-4-5    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

import java.util.List;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：CompnayExtraInfo    
 * 创建人：mishengliang    
 * 创建时间：2016-4-5 上午10:45:41    
 * 修改人：mishengliang    
 * 修改时间：2016-4-5 上午10:45:41    
 * @version     
 *     
 */
public class PfCompanyExtraInfo {
	
	private List<PfBankAccount> bankAccount;//银行账户
	private String class_name;//行业名称
	private List<PfInvoiceTitle> invoiceTitles;//发票抬头
	private String nature_name;//企业类型
	private Integer industry_id;//经营模式ID
	private String industry_name;//经营模式
	private String currency_name;//币种
	private String auth_opinion;//评审意见
	
	public List<PfBankAccount> getBankAccount() {
		return bankAccount;
	}
	public void setBankAccount(List<PfBankAccount> bankAccount) {
		this.bankAccount = bankAccount;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public List<PfInvoiceTitle> getInvoiceTitles() {
		return invoiceTitles;
	}
	public void setInvoiceTitles(List<PfInvoiceTitle> invoiceTitles) {
		this.invoiceTitles = invoiceTitles;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public Integer getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(Integer industry_id) {
		this.industry_id = industry_id;
	}
	public String getIndustry_name() {
		return industry_name;
	}
	public void setIndustry_name(String industry_name) {
		this.industry_name = industry_name;
	}
	
	public String getCurrency_name() {
		return currency_name;
	}
	public void setCurrency_name(String currency_name) {
		this.currency_name = currency_name;
	}
	public String getAuth_opinion() {
		return auth_opinion;
	}
	public void setAuth_opinion(String auth_opinion) {
		this.auth_opinion = auth_opinion;
	}
	
	@Override
	public String toString() {
		return "PfCompanyExtraInfo [bankAccount=" + bankAccount
				+ ", class_name=" + class_name + ", invoiceTitles="
				+ invoiceTitles + ", nature_name=" + nature_name
				+ ", industry_id=" + industry_id + ", industry_name="
				+ industry_name + ", currency_name=" + currency_name
				+ ", auth_opinion=" + auth_opinion + "]";
	}
	
}
