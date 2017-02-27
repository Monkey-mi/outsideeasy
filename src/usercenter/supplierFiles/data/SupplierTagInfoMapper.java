package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.SupplierTagInfo;


public interface SupplierTagInfoMapper {

	public List<SupplierTagInfo> getSupplierTagInfoList(Map<String,Object> params);
	
	/**
	 * @Description: 增加增加标签和供应商关联关系
	 * SupplierTagInfoMapper
	 * addSupplierTagInfo
	 * @param map void
	 * @author mishengliang
	 * 2016-8-10 下午3:35:24
	 */
	public void addSupplierTagInfo(Map<String, Object> map);
	
	public void updateSupplierTagInfo(SupplierTagInfo obj);
	
	/**
	 * @Description: 删除标签和供应商关联关系
	 * SupplierTagInfoMapper
	 * deleteSupplierTagInfo
	 * @param params void
	 * @author mishengliang
	 * 2016-8-9 下午3:17:03
	 */
	public void deleteSupplierTagInfoByTagId(Map<String, Object> params);
	
	/**
	 * @Description: 删除标签和供应商关联关系 指定唯一一条数据
	 * SupplierTagInfoMapper
	 * deleteSupplierTagInfo
	 * @param params void
	 * @author mishengliang
	 * 2016-8-10 下午4:08:41
	 */
	public void deleteSupplierTagInfo(Map<String, Object> params);
	
	/**
	 * @Description: 获取供应商拥有的标签
	 * SupplierTagInfoMapper
	 * getSupplierTag
	 * @param params
	 * @return List<SupplierTagInfo>
	 * @author mishengliang
	 * 2016-8-5 上午10:13:17
	 */
	public List<SupplierTagInfo> getSupplierTag(Map<String, Object> params);
	
}
