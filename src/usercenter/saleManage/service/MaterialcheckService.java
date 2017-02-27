package usercenter.saleManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import usercenter.saleManage.data.MaterialcheckMapper;
import usercenter.saleManage.model.Materialcheck;


@Service
public class MaterialcheckService {
	@Autowired
	private MaterialcheckMapper mapper;


	public List<Materialcheck> getMaterialcheckList(Map<String,Object> params) {
		return mapper.getMaterialcheckList(params);
	}
	public void addMaterialcheck(Materialcheck[] arr) {
		for(Materialcheck obj: arr) {
			mapper.addMaterialcheck(obj);
		}
	}
	public void updateMaterialcheck(Materialcheck[] arr) {
		for(Materialcheck obj: arr) {
			mapper.updateMaterialcheck(obj);
		}
	}
	public void deleteMaterialcheck(Materialcheck[] arr) {
		for(Materialcheck obj: arr) {
			mapper.deleteMaterialcheck(obj);
		}
	}
	public List<Materialcheck> getAllMaterialcheckList(
			Map<String, Object> params) {
		return mapper.getAllMaterialcheckList(params);
	}
	/**
	 * @Description:获取最新三条物料确认信息
	 * MaterialcheckService
	 * getLastThreeMaterialCheck
	 * @param params
	 * @return List<Materialcheck>
	 * @author yukai
	 * 2016-8-30 下午5:46:45
	 */
	public List<Materialcheck> getLastThreeMaterialCheck(
			Map<String, Object> params) {
		return mapper.getLastThreeMaterialCheck(params);
	}
	/**
	 * @Description:检查是否有物料确认报告
	 * MaterialcheckService
	 * hasMaterialCheck
	 * @param params
	 * @return boolean
	 * @author yukai
	 * 2016-9-1 上午9:27:33
	 */
	public boolean hasMaterialCheck(Map<String, Object> params) {
		boolean flag;
		if (mapper.hasMaterialCheck(params)==0) {
			flag=false;
		}else {
			flag=true;
		}
		return flag;
	}
}
