package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.PurchaseOrderOperating;


public interface PurchaseOrderOperatingMapper {
	public List<PurchaseOrderOperating> getPurchaseOrderOperatingList(Map<String,Object> params);
	public void addPurchaseOrderOperating(Map<String,Object> params);
	public void updatePurchaseOrderOperating(PurchaseOrderOperating obj);
	public void deletePurchaseOrderOperating(PurchaseOrderOperating obj);
}
