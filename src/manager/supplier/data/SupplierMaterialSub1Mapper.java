package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.SupplierMaterialSub1;



public interface SupplierMaterialSub1Mapper {
	public List<SupplierMaterialSub1> getSupplierMaterialSub1List(Map<String,Object> params);
	public void addSupplierMaterialSub1(SupplierMaterialSub1 obj);
	public void updateSupplierMaterialSub1(SupplierMaterialSub1 obj);
	public void deleteSupplierMaterialSub1(SupplierMaterialSub1 obj);
}
