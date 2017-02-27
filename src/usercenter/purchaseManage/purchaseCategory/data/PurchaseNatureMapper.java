package usercenter.purchaseManage.purchaseCategory.data;

import java.util.List;
import java.util.Map;

import usercenter.purchaseManage.purchaseCategory.model.PurchaseNature;


public interface PurchaseNatureMapper {
	public List<PurchaseNature> getPurchaseNatureList(Map<String,Object> params);
	public void addPurchaseNature(PurchaseNature obj);
	public void updatePurchaseNature(PurchaseNature obj);
	public void deletePurchaseNature(PurchaseNature obj);
}
