package platform.company.data;

import java.util.List;
import java.util.Map;

import platform.company.model.PfSupplierMaterialcheck;


public interface PfSupplierMaterialcheckMapper {
	public List<PfSupplierMaterialcheck> getPfSupplierMaterialcheckList(Map<String,Object> params);
	public void addPfSupplierMaterialcheck(PfSupplierMaterialcheck obj);
	public void updatePfSupplierMaterialcheck(PfSupplierMaterialcheck obj);
	public void deletePfSupplierMaterialcheck(PfSupplierMaterialcheck obj);
}
