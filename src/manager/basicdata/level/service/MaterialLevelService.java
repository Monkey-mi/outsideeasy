package manager.basicdata.level.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import manager.basicdata.level.data.MaterialLevelMapper;
import manager.basicdata.level.model.MaterialLevel;
import manager.basicdata.materialClass.data.MaterialClassMapper;
import common.model.TreeModel;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import util.Const;


@Service
public class MaterialLevelService {
	@Autowired
	private MaterialLevelMapper mapper;
	@Autowired
	private MaterialClassMapper classmapper;

	public List<MaterialLevel> getMaterialLevelList(Map<String,Object> params) {
		return mapper.getMaterialLevelList(params);
	}
	@Transactional
	public void addMaterialLevel(MaterialLevel[] arr) {
		for(MaterialLevel obj: arr) {
			mapper.addMaterialLevel(obj);
		}
	}
	@Transactional
	public void updateMaterialLevel(MaterialLevel[] arr) {
		for(MaterialLevel obj: arr) {
			mapper.updateMaterialLevel(obj);
		}
	}
	@Transactional
	public void deleteMaterialLevel(MaterialLevel[] arr) {
		for(MaterialLevel obj: arr) {
			mapper.deleteMaterialLevel(obj);
		}
	}
	/**
	* @Description: 判断记录是否可以新增
	* @param   level_name 类别名
	* Request materialLevel/materialLevel.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-4
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
	* @param   level_name 类别名;level_id 类别id
	* Request materialLevel/materialLevel.do?method=checkForUpdate
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-4
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
	* @param level_id 类别id
	* Request materialLevel/materialLevel.do?method=candeleted
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-4
	*/
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=classmapper.getCountBylevel(params);
		json.put("status", count==0);
		return json.toString();
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request materialClass/materialLevel.do?method=getMaterialLevelTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author 杨丽平
	* @date 2015-11-24
	*/
	public List<TreeModel> getMaterialLevelTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MaterialLevel> list=getMaterialLevelList(params);
		
		for(MaterialLevel sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getLevel_id());
			st.setParentId(0);
			if(sa.getLevel_name()!=null)
			{
			st.setText(sa.getLevel_name());
			}
			else 
			{
				st.setText("空");
			}
			st.setLeaf(Const.YESNO_TYPE_YES);
			st.setExpanded(Const.YESNO_TYPE_YES);
			
			st.setType("MaterialClass");
			stlist.add(st);
			
		}
		
		return stlist;
	}
}
