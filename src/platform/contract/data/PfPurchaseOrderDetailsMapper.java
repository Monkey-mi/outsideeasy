package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfPurchaseOrderDetails;


public interface PfPurchaseOrderDetailsMapper {
	public List<PfPurchaseOrderDetails> getPfPurchaseOrderDetailsList(Map<String,Object> params);
	public void addPfPurchaseOrderDetails(PfPurchaseOrderDetails obj);
	public void updatePfPurchaseOrderDetails(PfPurchaseOrderDetails obj);
	public void deletePfPurchaseOrderDetails(PfPurchaseOrderDetails obj);
}
