/**    
 * 文件名：BankAccount.java    
 *    
 * 版本信息：    
 * 日期：2016-4-5    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package usercenter.company.model;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：BankAccount    
 * 创建人：mishengliang    
 * 创建时间：2016-4-5 下午4:06:50    
 * 修改人：mishengliang    
 * 修改时间：2016-4-5 下午4:06:50    
 * @version     
 *     
 */
public class UcBankAccount {
	private String account_name;//账户所属银行
	private String account_code;//银行卡号
	
	public String getAccount_name() {
		return account_name;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	public String getAccount_code() {
		return account_code;
	}
	public void setAccount_code(String account_code) {
		this.account_code = account_code;
	}
	@Override
	public String toString() {
		return "BankAccount [account_name=" + account_name + ", account_code="
				+ account_code + "]";
	}
	
}
