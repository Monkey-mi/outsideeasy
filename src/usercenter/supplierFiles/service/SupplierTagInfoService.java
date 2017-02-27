package usercenter.supplierFiles.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.supplierFiles.data.SupplierTagInfoMapper;
import usercenter.supplierFiles.model.SupplierTagInfo;


@Service
public class SupplierTagInfoService {
	@Autowired
	private SupplierTagInfoMapper mapper;

	public List<SupplierTagInfo> getSupplierTagInfoList(Map<String,Object> params) {
		return mapper.getSupplierTagInfoList(params);
	}
	
	/**
	 * @Description: 增加增加标签和供应商关联关系
	 * SupplierTagInfoService
	 * addSupplierTagInfo
	 * @param map void
	 * @author mishengliang
	 * 2016-8-10 下午3:37:54
	 */
	public void addSupplierTagInfo(Map<String, Object> map) {
			mapper.addSupplierTagInfo(map);
	}
	
	public void updateSupplierTagInfo(SupplierTagInfo[] arr) {
		for(SupplierTagInfo obj: arr) {
			mapper.updateSupplierTagInfo(obj);
		}
	}
	
	/**
	 * @Description: 删除标签和供应商关联关系By tagId 删除一片
	 * SupplierTagInfoService
	 * deleteSupplierTagInfoByTagId
	 * @param params void
	 * @author mishengliang
	 * 2016-8-10 下午3:50:41
	 */
	public void deleteSupplierTagInfoByTagId(Map<String, Object> params) {
			mapper.deleteSupplierTagInfoByTagId(params);
	}
	
	
	/**
	 * @Description: 删除标签和供应商关联关系 指定唯一一条数据
	 * SupplierTagInfoService
	 * deleteSupplierTagInfo
	 * @param params void
	 * @author mishengliang
	 * 2016-8-10 下午3:52:51
	 */
	public void deleteSupplierTagInfo(Map<String, Object> params) {
		mapper.deleteSupplierTagInfo(params);
	}
	
	/**
	 * @Description: 获取供应商拥有的标签
	 * SupplierTagInfoService
	 * getSupplierTag
	 * @param params
	 * @return List<SupplierTagInfo>
	 * @author mishengliang
	 * 2016-8-5 上午10:16:50
	 */
	public List<SupplierTagInfo> getSupplierTag(Map<String,Object> params){
		return mapper.getSupplierTag(params);
	}
	/**
	 * @Description:批量增加标签和供应商关联关系
	 * SupplierTagInfoService
	 * addSupplierTags
	 * @param params void
	 * @author yukai
	 * 2016-12-26 上午9:17:21
	 */
	public void addSupplierTags(Map<String, Object> params) {
		String arrayStr=params.get("tagIds").toString();
		String[] arrayId=arrayStr.split(",");
		for(int i=0;i<arrayId.length;i++){
			if(arrayId[i]!=""){
				params.put("tagId", arrayId[i]);
				mapper.addSupplierTagInfo(params);
			}
		}
	}
	/**
	 * @Description:批量删除标签和供应商关联关系 指定单一关系
	 * SupplierTagInfoService
	 * delSupplierTags
	 * @param params void
	 * @author yukai
	 * 2016-12-26 上午9:17:26
	 */
	public void delSupplierTags(Map<String, Object> params) {
		String arrayStr=params.get("tagIds").toString();
		String[] arrayId=arrayStr.split(",");
		for(int i=0;i<arrayId.length;i++){
			if(arrayId[i]!=""){
				params.put("tagId", arrayId[i]);
				mapper.deleteSupplierTagInfo(params);
			}
		}
	}
}
