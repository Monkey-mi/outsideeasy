/**  
* @Title: PfBankAccountFromErpMapper.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午2:23:32 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.BankAccountOut;

public interface PfBankAccountFromErpMapper {
	public void updateBankAccountFromERP(Map<String, Object> params);
	public void addBankAccountFromERP(BankAccountOut obj);
	public void deleteBankAccountFromERP(Map<String, Object> params);
}
