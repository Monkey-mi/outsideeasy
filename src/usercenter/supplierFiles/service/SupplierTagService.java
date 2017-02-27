package usercenter.supplierFiles.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.supplierFiles.data.SupplierTagMapper;
import usercenter.supplierFiles.model.SupplierTag;


@Service
public class SupplierTagService {
	@Autowired
	private SupplierTagMapper mapper;
	@Autowired
	private SupplierTagInfoService tagInfoSerivce;


	public List<SupplierTag> getSupplierTagList(Map<String,Object> params) {
		return mapper.getSupplierTagList(params);
	}
	
	/**
	 * @Description: 增加标签
	 * SupplierTagService
	 * addSupplierTag
	 * @param tag void
	 * @author mishengliang
	 * 2016-8-9 上午11:33:04
	 */
	public int addSupplierTag(SupplierTag tag) {
			mapper.addSupplierTag(tag);
			return tag.getTag_id();
	}

	/**
	 * @Description: 根据tagId更新tagName
	 * SupplierTagService
	 * updateSupplierTag
	 * @param params void
	 * @author mishengliang
	 * 2016-8-9 下午3:42:52
	 */
	public void updateSupplierTag(Map<String, Object> params) {
			mapper.updateSupplierTag(params);
	}
	
	/**
	 * @Description: 删除标签，同时删除和此标签和其它供应商的关联关系
	 * SupplierTagService
	 * deleteSupplierTag
	 * @param params void
	 * @author mishengliang
	 * 2016-8-9 下午3:13:08
	 */
	public void deleteSupplierTag(Map<String, Object> params) {
		tagInfoSerivce.deleteSupplierTagInfoByTagId(params);//删除标签关联关系
		mapper.deleteSupplierTag(params);//删除标签
	}

	/**
	 * @Description: 查找相应账号下的标签
	 * SupplierTagService
	 * getSupplierTagListForAccount
	 * @param params
	 * @return List<Map<String,Object>>
	 * @author mishengliang
	 * 2016-8-5 上午10:07:41
	 */
	public List<Map<String, Object>> getSupplierTagListForAccount(Map<String,Object> params){
		return mapper.getSupplierTagListForAccount(params);
	}
}
