package platform.supplierAccess.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.supplierAccess.data.PfUpdateRegisterAttchedMapper;
import platform.supplierAccess.model.PfUpdateRegisterAttched;


@Service
public class PfUpdateRegisterAttchedService {
	@Autowired
	private PfUpdateRegisterAttchedMapper mapper;

	/**
	 * 获取变更表文件
	*getPfUpdateRegisterAttchedList
	*@param params
	*@return
	*List<PfUpdateRegisterAttched>
	*@author mishengliang
	*2016-6-3下午3:36:45
	 */
	public List<PfUpdateRegisterAttched> getPfUpdateRegisterAttchedList(Map<String,Object> params) {
		return mapper.getPfUpdateRegisterAttchedList(params);
	}
	
	/**
	 * 增加一条变更附件表信息
	*addPfUpdateRegisterAttched
	*@param obj
	*@return
	*Integer
	*@author mishengliang
	*2016-6-13下午1:45:09
	 */
	public Integer addPfUpdateRegisterAttched(PfUpdateRegisterAttched obj) {
			mapper.addPfUpdateRegisterAttched(obj);
			return obj.getId();
	}
	
	public void updatePfUpdateRegisterAttched(PfUpdateRegisterAttched obj) {
			mapper.updatePfUpdateRegisterAttched(obj);
	}
	public void updatePfUpdateRegisterAttched1(Map<String,Object> params) {
		mapper.updatePfUpdateRegisterAttched1(params);
}
	/**
	 * 删除变更文件表中的信息
	*deletePfUpdateRegisterAttched
	*@param obj
	*void
	*@author mishengliang
	*2016-6-3下午3:36:09
	 */
	public void deletePfUpdateRegisterAttched(PfUpdateRegisterAttched obj) {
			mapper.deletePfUpdateRegisterAttched(obj);
	}
	
	public void deletePfUpdateRegisterAttched1(Map<String,Object> params) {
		mapper.deletePfUpdateRegisterAttched1(params);
}
}
