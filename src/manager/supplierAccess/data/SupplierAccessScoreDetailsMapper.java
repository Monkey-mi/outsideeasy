package manager.supplierAccess.data;

import java.util.List;
import java.util.Map;

import manager.supplierAccess.model.SupplierAccessScoreDetails;



public interface SupplierAccessScoreDetailsMapper {
	public List<SupplierAccessScoreDetails> getSupplierAccessScoreDetailsList(Map<String,Object> params);
	
}
