package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.area.model.Area;
import manager.basicdata.companyClass.model.CompanyClass;
import manager.basicdata.materialClass.model.MaterialClass;
import manager.supplier.model.SupplierFile;


public interface SupplierFileMapper {
	public List<SupplierFile> getSupplierFileList(Map<String,Object> params);
	public List<SupplierFile> getSupplierFileByID(Map<String,Object> params);
	public void addSupplierFile(SupplierFile obj);
	public void updateSupplierFile(SupplierFile obj);
	public void deleteSupplierFile(SupplierFile obj);
	int checkStatusSame(Map<String,Object> params);
	public List<CompanyClass> getCompanyClassList(Map<String,Object> params);
	Integer getCountByIdAndName(Map<String,Object> params);
	Integer getCountByName(Map<String,Object> params);
	public List<Area> getAreaList(Map<String,Object> params);
	
	public List<MaterialClass> getMaterialClassList(Map<String,Object> params);
	
	/**
	 *查找符合条件的信息
	*getSuppliersByMultiSearch
	*@param params
	*@return
	*List<SupplierFile>
	*@modifier mishengliang
	*2016-5-30上午10:33:11
	 */
	public List<SupplierFile> getSuppliersByMultiSearch(Map<String,Object> params);
	
	public List<SupplierFile> getSuppliersByCpnameSearch(Map<String,Object> params);//后台根据公司名称查询
	
	public List<SupplierFile> getCompanyForReg(Map<String,Object> params);
	
	public List<SupplierFile> getSupplierFileInfoList(Map<String, Object> params);
	public void updateSupplierFile1(Map<String, Object> params);
	public List<SupplierFile> getOwnerCompanyList(Map<String, Object> params);
	public void addSupplierFile1(Map<String, Object> params);
}
