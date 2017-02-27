/**  
* @Title: PfMainCustomerFromErp.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午2:56:26 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.MainCustomerOut;

public interface PfMainCustomerFromErpMapper {
	public void updateMainCustomerFromERP(Map<String, Object> params);
	public void addMainCustomerFroERP(MainCustomerOut obj);
	public void deleteMainCustomerFromERP(Map<String, Object> params);
}
