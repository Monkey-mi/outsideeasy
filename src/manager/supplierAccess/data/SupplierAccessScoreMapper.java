package manager.supplierAccess.data;

import java.util.List;
import java.util.Map;

import manager.supplierAccess.model.SupplierAccessScore;



public interface SupplierAccessScoreMapper {
	public List<SupplierAccessScore> getSupplierAccessScoreList(Map<String,Object> params);
	public void addSupplierAccessScore(SupplierAccessScore obj);
	public void updateSupplierAccessScore(SupplierAccessScore obj);
	public void deleteSupplierAccessScore(SupplierAccessScore obj);
}
