package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessInvoiceTitle;


public interface AccessInvoiceTitleMapper {
	public List<AccessInvoiceTitle> getAccessInvoiceTitleList(Map<String,Object> params);
	public void addAccessInvoiceTitle(Map<String,Object> params);
	public void updateAccessInvoiceTitle(Map<String,Object> params);
	public void deleteAccessInvoiceTitle(Map<String,Object> params);
	public void deleteAccessInvoiceTitleByRI(Map<String,Object> params);
}
