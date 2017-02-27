package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.SupplierTag;


public interface SupplierTagMapper {
	public List<SupplierTag> getSupplierTagList(Map<String,Object> params);

	/**
	 * @Description: 增加标签记录
	 * SupplierTagMapper
	 * addSupplierTag
	 * @param obj void
	 * @author mishengliang
	 * 2016-8-9 上午11:32:00
	 */
	public void addSupplierTag(SupplierTag obj);
	
	/**
	 * @Description: 根据tagId更新tagName
	 * SupplierTagMapper
	 * updateSupplierTag
	 * @param params void
	 * @author mishengliang
	 * 2016-8-9 下午3:42:24
	 */
	public void updateSupplierTag(Map<String, Object> params);
	
	/**
	 * @Description: 根据tagId删除标签
	 * SupplierTagMapper
	 * deleteSupplierTag
	 * @param params 包含tagId
	 * @author mishengliang
	 * 2016-8-9 下午2:53:14
	 */
	public void deleteSupplierTag(Map<String, Object> params);
	
	/**
	 * @Description: 查找相应账号下的标签
	 * SupplierTagInfoMapper
	 * getSupplierTagContentList
	 * @param params 供应商ID 账号ID
	 * @return List<Map<String,Object>>
	 * @author mishengliang
	 * 2016-8-4 上午10:12:30
	 */
	public List<Map<String, Object>> getSupplierTagListForAccount(Map<String,Object> params);
}
