package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.SupplierRegaccountInfo;
import usercenter.supplierFiles.response.SupplierRegaccountInfoVo;


public interface SupplierRegaccountInfoMapper {
	public List<SupplierRegaccountInfoVo> getSupplierRegaccountInfoList(Map<String,Object> params);
	public Integer getSupplierRegaccountInfoCount(Map<String,Object> params);
	public List<SupplierRegaccountInfoVo> getSupplierReListID(Map<String,Object> params);
	public void addSupplierRegaccountInfo(SupplierRegaccountInfo obj);
	public void updateSupplierRegaccountInfo(SupplierRegaccountInfo obj);
	public void deleteSupplierRegaccountInfo(SupplierRegaccountInfo obj);
	public List<SupplierRegaccountInfoVo> getSupplierListForSea(Map<String,Object> params);
}
