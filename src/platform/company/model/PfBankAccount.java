/**    
 * 文件名：BankAccount.java    
 *    
 * 版本信息：    
 * 日期：2016-4-5    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

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
public class PfBankAccount {
	private Integer account_id;
	private String account_name;//账户所属银行
	private String account_code;//银行卡号
	private int default_id;
	private int account_sts;
	public Integer getAccount_id() {
		return account_id;
	}
	public void setAccount_id(Integer account_id) {
		this.account_id = account_id;
	}
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
	
	public int getDefault_id() {
		return default_id;
	}
	public void setDefault_id(int default_id) {
		this.default_id = default_id;
	}
	public int getAccount_sts() {
		return account_sts;
	}
	public void setAccount_sts(int account_sts) {
		this.account_sts = account_sts;
	}
	@Override
	public String toString() {
		return "PfBankAccount [account_id=" + account_id + ", account_name="
				+ account_name + ", account_code=" + account_code + "]";
	}
	
}
