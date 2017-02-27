package usercenter.purchaseManage.purchaseCategory.data;

import java.util.List;
import java.util.Map;

import usercenter.purchaseManage.purchaseCategory.model.PurchaseCategory;


public interface PurchaseCategoryMapper {
	public List<PurchaseCategory> getPurchaseCategoryList(Map<String,Object> params);
	public void addPurchaseCategory(Map<String,Object> params);
	public void updatePurchaseCategory(Map<String,Object> params);
	public void deletePurchaseCategory(Map<String,Object> params);
	public PurchaseCategory getCurrPurchaseCategorybyId(Map<String,Object> params);
	public List<PurchaseCategory> getCurrPurchaseCategorybyFId(Map<String,Object> params);
	public void updatePurchaseCategoryOrder(Map<String, Object> params);
	/**
	 * @Description:根据当前类目ID找到父类目
	 * PurchaseCategoryMapper
	 * getParentCategoryById
	 * @param params
	 * @return PurchaseCategory
	 * @author yukai
	 * 2016-9-9 上午9:31:18
	 */
	public PurchaseCategory getParentCategoryById(Map<String, Object> params);
	public List<PurchaseCategory> getPurchaseCategoryListForOrderBy(
			Map<String, Object> params1);
}
