package manager.templet.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.templet.data.MngAccessTempletHeadMapper;
import manager.templet.model.MngAccessTempletHead;
import manager.templet.searchResponse.SearchCompany;


@Service
public class MngAccessTempletHeadService {
	@Autowired
	private MngAccessTempletHeadMapper mapper;


	public List<MngAccessTempletHead> getMngAccessTempletHeadList(Map<String,Object> params) {
		return mapper.getMngAccessTempletHeadList(params);
	}
	public void addMngAccessTempletHead(MngAccessTempletHead[] arr) {
		for(MngAccessTempletHead obj: arr) {
			mapper.addMngAccessTempletHead(obj);
		}
	}
	public void updateMngAccessTempletHead(MngAccessTempletHead[] arr) {
		for(MngAccessTempletHead obj: arr) {
			mapper.updateMngAccessTempletHead(obj);
		}
	}
	public void deleteMngAccessTempletHead(MngAccessTempletHead[] arr) {
		for(MngAccessTempletHead obj: arr) {
			mapper.deleteMngAccessTempletHead(obj);
		}
	}
	/**	
	 * @Description:  检查是否可以添加
	 * @param Map
	 * @return Map
	 * @author chenlong
	 * @date 2016-7-4
	 */
	public Map<String,Object> checkAddbg(Map<String,Object> params){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("success", true);
		Integer count = mapper.checkAdd(params);
		if(count == 0){
			param.put("status", true);		
		
		}else{
			param.put("status", false);
		}
		return param;	
	}
	/**
	 * @Description: 检查是否可以更新
	 * @param Map
	 * @return Map
	 * @author chenlong
	 * @date 2016-7-4
	 */
	public Map<String,Object> checkUpdatebg(Map<String,Object> params){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("success", true);
		Integer count = mapper.checkUpdatebg(params);
		if(count == 0){
			param.put("status", true);		
		
		}else{
			param.put("status", false);
		}
		return param;
	}
	/**
	 * @Description: 查询公司的名称
	 * @param Map
	 * @return Map
	 * @author chenlong
	 * @date  2016-7-4
	 */
	public List<SearchCompany> searchCompanyName(Map<String,Object> params){
		List<SearchCompany> searchCompanies = mapper.searchCompanyName(params);
		return searchCompanies;
	}
	/**
	 * @Description: 查询模板头的信息
	 * @param Map
	 * @return List<MngAccessTempletHead>
	 * @author chenlong
	 * @date 2016-7-7
	 */
	public List<MngAccessTempletHead> searchModelt(Map<String,Object> params) {
		return mapper.searchModelt(params);
	}
}
