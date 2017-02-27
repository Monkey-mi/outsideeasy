package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.MngSupplierMaterialcheck;


public interface MngSupplierMaterialcheckMapper {
	public List<MngSupplierMaterialcheck> getMngSupplierMaterialcheckList(Map<String,Object> params);
	public void addMngSupplierMaterialcheck(MngSupplierMaterialcheck obj);
	public void updateMngSupplierMaterialcheck(MngSupplierMaterialcheck obj);
	public void deleteMngSupplierMaterialcheck(MngSupplierMaterialcheck obj);
}
