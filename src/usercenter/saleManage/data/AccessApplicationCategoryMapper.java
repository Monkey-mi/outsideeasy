package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationCategory;


public interface AccessApplicationCategoryMapper {
	public List<AccessApplicationCategory> getAccessApplicationCategoryList(Map<String,Object> params);
	public void addAccessApplicationCategory(Map<String,Object> params);
	public void updateAccessApplicationCategory(Map<String,Object> params);
	public void deleteAccessApplicationCategory(Map<String,Object> params);
	public void deleteAccessApplicationCategoryBySupplierId(Map<String,Object> params);
	public void deleteAccessApplicationCategoryByRecordId(Map<String,Object> params);
	
	/**
	 * @Description: 根据recordId更新supplierId
	 * AccessApplicationCategoryMapper
	 * updateSupplierIdByRecordId
	 * @param params void
	 * @author mishengliang
	 * 2016-11-25 上午10:42:26
	 */
	public void updateSupplierIdByRecordId(Map<String,Object> params);
}
