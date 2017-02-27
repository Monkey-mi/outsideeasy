/**  
* @Title: PfInvoiceTitleFromErpMapper.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午2:11:05 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.InvoiceTitleOut;

public interface PfInvoiceTitleFromErpMapper {
	public void updateInvoiceTitleFromErp(Map<String, Object> params);
	public void addInvoiceTitleFromErp(InvoiceTitleOut obj);
	public void deleteInvoiceTitleFromErp(Map<String, Object> params);

}
