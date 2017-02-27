package manager.basicdata.sFilter.service;

import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import manager.basicdata.sFilter.data.SFilterMapper;
import manager.basicdata.sFilter.model.SFilter;


@Service
public class SFilterService {
	@Autowired
	private SFilterMapper mapper;


	public List<SFilter> getSFilterList(Map<String,Object> params) {
		return mapper.getSFilterList(params);
	}
	@Transactional
	public void addSFilter(SFilter[] arr) {
		for(SFilter obj: arr) {
			mapper.addSFilter(obj);
		}
	}
	@Transactional
	public void updateSFilter(SFilter[] arr) {
		for(SFilter obj: arr) {
			mapper.updateSFilter(obj);
		}
	}
	@Transactional
	public void deleteSFilter(SFilter[] arr) {
		for(SFilter obj: arr) {
			mapper.deleteSFilter(obj);
		}
	}
	/**
	* @Description: 判断记录是否可以新增
	* @param  filter_id id; filter_url路径; remark备注
	* Request sFilter/sFilter.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-3-14
	*/
	public String checkForAdd(Map<String,Object> params){
		JSONObject json = new JSONObject();
		
		json.put("success", true);
		int count=mapper.getCountForAdd(params);
		json.put("status", count==0);
		return json.toString();
				
	}
	/**
	* @Description: 判断记录是否可以更新
	* @param  filter_id id; filter_url路径; remark备注
	* Request sFilter/sFilter.do?method=checkForUpdate
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date  2016-3-14 
	*/
	public String checkForUpdate(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getCountForUpdate(params);
		json.put("status", count==0);
		return json.toString();
	}
	/**
	* @Description: 判断记录是否可以被删除
	* @param filter_id id;
	* Request sFilter/sFilter.do?method=candeleted
	* 查询出该id下有一条数据则能删除
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-3-14
	*/
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==1);//查询出该id下有一条数据则能删除
		return json.toString();
	}
	

}
