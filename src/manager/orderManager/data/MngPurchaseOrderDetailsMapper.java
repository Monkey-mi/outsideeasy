package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngPurchaseOrderDetails;


public interface MngPurchaseOrderDetailsMapper {
	public List<MngPurchaseOrderDetails> getMngPurchaseOrderDetailsList(Map<String,Object> params);
	public void addMngPurchaseOrderDetails(MngPurchaseOrderDetails obj);
	public void updateMngPurchaseOrderDetails(MngPurchaseOrderDetails obj);
	public void deleteMngPurchaseOrderDetails(MngPurchaseOrderDetails obj);
}
