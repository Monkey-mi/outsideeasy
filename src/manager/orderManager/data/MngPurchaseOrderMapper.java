package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngPurchaseOrder;


public interface MngPurchaseOrderMapper {
	public List<MngPurchaseOrder> getMngPurchaseOrderList(Map<String,Object> params);
	public void addMngPurchaseOrder(MngPurchaseOrder obj);
	public void updateMngPurchaseOrder(MngPurchaseOrder obj);
	public void deleteMngPurchaseOrder(MngPurchaseOrder obj);
}
