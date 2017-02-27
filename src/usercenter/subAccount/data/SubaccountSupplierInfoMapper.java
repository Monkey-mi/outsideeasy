package usercenter.subAccount.data;

import java.util.List;
import java.util.Map;

import usercenter.subAccount.model.SubaccountSupplierInfo;
import usercenter.supplierFiles.response.SupplierRegaccountInfoVo;


public interface SubaccountSupplierInfoMapper {
	public List<SubaccountSupplierInfo> getSubaccountSupplierInfoList(Map<String,Object> params);
	public void addSubaccountSupplierInfo(Map<String,Object> params);
	public void updateSubaccountSupplierInfo(SubaccountSupplierInfo subaccountSupplierInfo);
	public List<SubaccountSupplierInfo> getSubpplierInfoList(Map<String,Object> params);
	public List<SupplierRegaccountInfoVo> getSubaccountInforsea(Map<String,Object> params);

}
