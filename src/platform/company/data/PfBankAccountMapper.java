package platform.company.data;

import java.util.List;
import java.util.Map;

import platform.company.model.PfBankAccount;

import com.outsideasy.ws.erp.supplier.vo.BankAccountOut;

public interface PfBankAccountMapper {
	List<BankAccountOut> getBankAccountOutList(Map<String,Object> params);
	
	/**
	 * 通过公司ID获取银行账户信息
	 *getBankAccount
	 *@param companyId
	 *@return
	 *List<BankAccount>
	 *@author mishengliang
	 *2016-4-5下午4:28:39
	 */
	public List<PfBankAccount> getBankAccount(Integer companyId);
	public List<Map<String, Object>> getBankAccountMap(Map<String, Object> params);
	
	/**
	 * 删除指定银行账户
	*deleteBankAccount
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午6:32:24
	 */
	public void deleteBankAccount(Map<String, Object> params);
	
	/**
	 * 通过银行账户ID更新信息
	*updateBankAccountByAccountId
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午6:32:58
	 */
	public void updateBankAccountByAccountId(Map<String, Object> params);
	
	/**
	 * 添加银行账户
	*addBankAccount
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午6:33:46
	 */
	public void addBankAccount(Map<String, Object> params);	
	
	/**重置默认标记
	 * yukai
	 * @param params
	 */
	public void resetDefaultId(Map<String, Object> params);
}
