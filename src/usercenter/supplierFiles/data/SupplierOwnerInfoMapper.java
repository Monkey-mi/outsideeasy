package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.SupplierOwnerInfo;


public interface SupplierOwnerInfoMapper {
	public List<SupplierOwnerInfo> getSupplierOwnerInfoList(Map<String,Object> params);
	public void addSupplierOwnerInfo(SupplierOwnerInfo obj);
	public void updateSupplierOwnerInfo(SupplierOwnerInfo obj);
	public void deleteSupplierOwnerInfo(SupplierOwnerInfo obj);
	public SupplierOwnerInfo getSupplierOwnerInfoByCompanyId(
			Map<String, Object> params);
}
