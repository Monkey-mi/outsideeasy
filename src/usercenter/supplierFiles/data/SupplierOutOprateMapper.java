package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.SupplierOutOprate;


public interface SupplierOutOprateMapper {
	public List<SupplierOutOprate> getSupplierOutOprateList(Map<String,Object> params);
	
	/**
	 * @Description: 增加淘汰记录
	 * SupplierOutOprateMapper
	 * addSupplierOutOprate
	 * @param obj void
	 * @author mishengliang
	 * 2016-8-19 下午5:26:43
	 */
	public void addSupplierOutOprate(SupplierOutOprate obj);
	public void updateSupplierOutOprate(SupplierOutOprate obj);
	public void deleteSupplierOutOprate(SupplierOutOprate obj);
}
