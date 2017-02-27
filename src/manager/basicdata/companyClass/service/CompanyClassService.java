package manager.basicdata.companyClass.service;

import java.util.List;
import java.util.Map;

import manager.basicdata.companyClass.data.CompanyClassMapper;
import manager.basicdata.companyClass.model.CompanyClass;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class CompanyClassService {
	@Autowired
	private CompanyClassMapper mapper;


	public List<CompanyClass> getCompanyClassList(Map<String,Object> params) {
		return mapper.getCompanyClassList(params);
	}
	@Transactional
	public void addCompanyClass(CompanyClass[] arr) {
		for(CompanyClass obj: arr) {
			mapper.addCompanyClass(obj);
		}
	}
	@Transactional
	public void updateCompanyClass(CompanyClass[] arr) {
		for(CompanyClass obj: arr) {
			mapper.updateCompanyClass(obj);
		}
	}
	@Transactional
	public void deleteCompanyClass(CompanyClass[] arr) {
		for(CompanyClass obj: arr) {
			mapper.deleteCompanyClass(obj);
		}
	}
	/**
	* @Description: 判断记录是否可以新增
	* @param  f_id 上级id; nature_name 类别名
	* Request companyClass/companyClass.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-10-23
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
	* @param  f_id 上级id; nature_name 类别名;nature_id 类别id
	* Request companyClass/companyClass.do?method=checkForUpdate
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-10-23
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
	* @param nature_id 类别id
	* Request companyClass/companyClass.do?method=candeleted
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-10-23
	*/
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==0);
		return json.toString();
	}
}
