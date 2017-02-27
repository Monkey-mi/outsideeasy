package platform.company.data;

import java.util.List;
import java.util.Map;

import platform.company.model.PfMainCustomer;

import com.outsideasy.ws.erp.supplier.vo.MainCustomerOut;

public interface PfMainCustomerMapper {
	public List<MainCustomerOut> getMainCustomerOutList(Map<String,Object> params);
	
	/**
	 * 根据companyId获取主要客户信息；返回为主要客户对象，主要客户对象扩展字段，更有利于维护
	*getMainCustomerByCompanyId
	*@param companyId
	*@return
	*List<PfMainCustomer>
	*@author mishengliang
	*2016-4-7下午7:16:17
	 */
	public List<PfMainCustomer> getMainCustomerByCompanyId(Integer companyId);
	public List<Map<String, Object>> getMainCustomerMapByCompanyId(Map<String, Object> params);
	
	/**
	 * 通过客户ID更新客户信息
	*updateCustomer
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午4:08:20
	 */
	public void updateCustomer(Map<String,Object> params);
	
	/**
	 * 删除指定客户信息
	*deleteCustomer
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午4:08:25
	 */
	public void deleteCustomer(Map<String,Object> params);
	
	/**
	 * 增加客户
	*addCustomer
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午4:08:29
	 */
	public void addCustomer(Map<String,Object> params);

	public void deleteCustomerByCompanyId(Map<String, Object> params);
}
