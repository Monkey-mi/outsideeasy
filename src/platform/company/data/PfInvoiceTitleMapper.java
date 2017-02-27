package platform.company.data;

import java.util.List;
import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.InvoiceTitleOut;

public interface PfInvoiceTitleMapper {

	List<InvoiceTitleOut> getInvoiceTitleOutList(Map<String,Object> params);
	
	/**
	 * 通过公司ID获取发票抬头
	 *getInvoiceTitleNames
	 *@param companyId
	 *@return
	 *List<String>
	 *@author mishengliang
	 *2016-4-5下午4:30:02
	 */
	public List<String> getInvoiceTitleNames(Integer companyId);
	public List<Map<String, Object>> getInvoiceTitleNamesMap(Map<String, Object> params);
	
	/**
	 * 删除指定发票抬头
	*deleteInvoiceTitle
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午7:14:00
	 */
	public void deleteInvoiceTitle(Map<String, Object> params);
	
	/**
	 * 通过抬头ID更新发票抬头
	*updateInvoiceTitleByTitleId
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午7:14:05
	 */
	public void updateInvoiceTitleByTitleId(Map<String, Object> params);
	
	/**
	 * 增加发票抬头
	*addInvoiceTitle
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午7:14:10
	 */
	public void addInvoiceTitle(Map<String, Object> params);
	
	/**重置默认标记
	 * yukai
	 * @param params
	 */
	public void resetDefaultId(Map<String, Object> params);
}
