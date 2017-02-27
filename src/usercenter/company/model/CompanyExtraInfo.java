/**    
 * 文件名：CompnayExtraInfo.java    
 *    
 * 版本信息：    
 * 日期：2016-4-5    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package usercenter.company.model;

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
public class CompanyExtraInfo {
	
	private List<UcBankAccount> bankAccount;//银行账户
	private String class_name;//行业名称
	private List<String> invoiceTitleNames;//发票抬头
	private String nature_name;//企业类型
	private String industry_name;//经营模式
	
	public List<UcBankAccount> getBankAccount() {
		return bankAccount;
	}
	public void setBankAccount(List<UcBankAccount> bankAccount) {
		this.bankAccount = bankAccount;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public List<String> getInvoiceTitleNames() {
		return invoiceTitleNames;
	}
	public void setInvoiceTitleNames(List<String> invoiceTitleNames) {
		this.invoiceTitleNames = invoiceTitleNames;
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
	
	@Override
	public String toString() {
		return "CompanyExtraInfo [bankAccount=" + bankAccount + ", class_name="
				+ class_name + ", invoiceTitleNames=" + invoiceTitleNames
				+ ", nature_name=" + nature_name + ", industry_name="
				+ industry_name + "]";
	}
	
}
