package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.SupplierFactoryCycleInfo;


public interface SupplierFactoryCycleInfoMapper {
	public List<SupplierFactoryCycleInfo> getSupplierFactoryCycleInfoList(Map<String,Object> params);
	
	public void addSupplierFactoryCycleInfo(SupplierFactoryCycleInfo obj);
	
	/**
	 * @Description: 更新验厂周期 
	 * SupplierFactoryCycleInfoMapper
	 * updateSupplierFactoryCycleInfo
	 * @param params void
	 * @author mishengliang
	 * 2016-8-11 上午11:35:21
	 */
	public void updateSupplierFactoryCycleInfo(Map<String, Object> params);
	
	public void deleteSupplierFactoryCycleInfo(SupplierFactoryCycleInfo obj);
	
	/**
	 * @Description: 判断是否存在验厂周期
	 * SupplierFactoryCycleInfoMapper
	 * getSupplierIdExist
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-8-16 上午11:31:00
	 */
	public Integer getSupplierIdExist(Map<String, Object> params);
}
