package manager.regAccount.service;


import java.util.List;
import java.util.Map;

import manager.regAccount.data.MmgRegAccountMapper;
import manager.regAccount.model.RegAccountResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import common.user.model.RegAccout;



@Service
public class MmgRegAccountService {
	@Autowired
	private MmgRegAccountMapper mapper;


	public List<RegAccout> getRegAccoutList(Map<String,Object> params) {
		return mapper.getRegAccoutList(params);
	}
	
	/**
	 * 后台的主账号查询
	 * @param params
	 * @time 2016-03-22
	 * @author chenlong 
	 */
	public List<RegAccountResponse> getRegAccoutListbg(Map<String,Object> params){
		return mapper.getRegAccoutListbg(params);//返回包括账号的所关联的公司名
	}
	
	/**
	 * 后台的主账号添加
	 * @param params
	 * @time 2016-03-22
	 * @author chenlong
	 */
	@Transactional
	public void addReAccountbg(RegAccout[] params){
		for(RegAccout obj: params) {
		 mapper.addRegAccout(obj);
		}
		 
	}
	/**
	 * 后台主账号修改
	 * @param regAccout
	 * @time 2016-03-22
	 * @author chenlong
	 */
	@Transactional
	public void updateRegAccoutbg(RegAccout[] regAccout) {
		for(RegAccout obj: regAccout) {
		mapper.updateRegAccout(obj);
		}
}
	
	/**
	 * 删除主账号
	 * @param arr
	 * @time 2016-03-22
	 * @author chenlong
	 */
	@Transactional
	public void deleteRegAccoutbg(RegAccout[] arr) {
		for(RegAccout obj: arr) {
			mapper.deleteRegAccout(obj);
		}
	}
	/**
	 * 检查添加的账户名是否重复
	 * @param map
	 * @return json
	 * @time 2016-03-24
	 * @author chenlong
	 */
	public String checkForAdd(Map<String,Object> map){
		JSONObject jsonObject =new JSONObject();
		jsonObject.put("success", true);
		int count = mapper.getCountForAdd(map);
		jsonObject.put("status", count==0);	
		return jsonObject.toString();
	}
	/**
	 * 检查更新的账户名是否重复
	 * @param map
	 * @return json
	 * @time 2016-03-24
	 * @author chenlong
	 */
	public String checkForUpdate(Map<String,Object> map){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count =mapper.getCountForUpdate(map);
		json.put("status", count==0);
		return json.toString();
	}
	
	/**
	 * 检查账户是否存在子账户
	 * @param params
	 * @return json
	 * @time 2016-03-24
	 * @author chenlong
	 */
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getCountXiaji(params);
		json.put("status", count==0);
		return json.toString();
	}

	
	
	
}
