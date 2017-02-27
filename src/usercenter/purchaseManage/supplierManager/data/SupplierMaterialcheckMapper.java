package usercenter.purchaseManage.supplierManager.data;

import java.util.List;
import java.util.Map;

import usercenter.purchaseManage.supplierManager.model.SupplierMaterialcheck;


public interface SupplierMaterialcheckMapper {
	public List<SupplierMaterialcheck> getSupplierMaterialcheckListByAccount(Map<String,Object> params);
	public void addSupplierMaterialcheck(Map<String,Object> params);
	public void updateSupplierMaterialcheck(Map<String,Object> params);
	public void deleteSupplierMaterialcheck(Map<String,Object> params);
	public SupplierMaterialcheck getSupplierMaterialcheckById(
			Map<String, Object> params);
}
