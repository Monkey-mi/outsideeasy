package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.company.model.PfCompany;
import platform.contract.model.PfPurchaseOrder;


public interface PfPurchaseOrderMapper {
	public List<PfPurchaseOrder> getPfPurchaseOrderList(Map<String,Object> params);
	public void addPfPurchaseOrder(PfPurchaseOrder obj);
	public void updatePfPurchaseOrder(PfPurchaseOrder obj);
	public void deletePfPurchaseOrder(PfPurchaseOrder obj);
	List<PfCompany> getCampanyInfoBycid(Map<String,Object> params);
	int getSupplierId(Map<String,Object> params);
	int getOrderid(Map<String,Object> params);
	String getOrderDetialId(Map<String,Object> params);
	String getContractStatus(Map<String,Object> params);
}
