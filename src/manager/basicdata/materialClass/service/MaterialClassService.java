package manager.basicdata.materialClass.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import manager.basicdata.materialClass.data.MaterialClassMapper;
import manager.basicdata.materialClass.model.MaterialClass;
import common.model.TreeModel;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.Const;


@Service
public class MaterialClassService {
	@Autowired
	private MaterialClassMapper mapper;


	public List<MaterialClass> getMaterialClassList(Map<String,Object> params) {
		return mapper.getMaterialClassList(params);
	}
	public void addMaterialClass(MaterialClass[] arr) {
		for(MaterialClass obj: arr) {
			mapper.addMaterialClass(obj);
		}
	}
	public void updateMaterialClass(MaterialClass[] arr) {
		for(MaterialClass obj: arr) {
			mapper.updateMaterialClass(obj);
		}
	}
	public void deleteMaterialClass(MaterialClass[] arr) {
		for(MaterialClass obj: arr) {
			mapper.deleteMaterialClass(obj);
		}
	}
	/*
	 * 根据多个父级Id获取材料类别集合
	 */
	public List<MaterialClass> getMaterialClassListByFids(Map<String,Object> params){
		//JSONObject json = new JSONObject();
		String fidArrayString=params.get("fidArray").toString();
		String[] fidArray=fidArrayString.split(",");
		List<MaterialClass> allList=new ArrayList<MaterialClass>();
		List<MaterialClass> list=new ArrayList<MaterialClass>();
		for(int i=0;i<fidArray.length;i++)
		{
			params.put("f_id", fidArray[i]);
			list=mapper.getMaterialClassListByFid(params);
			for(int j=0;j<list.size();j++)
			{
				if(!allList.contains(list.get(j)))
				{
					allList.add(list.get(j));
				}
			}
//			if(!list.isEmpty())
//			{
//				
//				allList.addAll(list);
//			}
			
		}
		
		return allList;
	}
	
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request materialClass/materialClass.do?method=getMaterialClassTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2015-11-03
	*/
	public List<TreeModel> getMaterialClassTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MaterialClass> list=getMaterialClassList(params);
		
		for(MaterialClass sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getMc_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getMc_name());
			st.setLeaf(sa.getLeaf());
			st.setExpanded("false");
			
			st.setType("MaterialClass");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	/**
	* @Description: 判断记录是否可以新增
	* @param  f_id 上级id; mc_name 类别名
	* Request materialClass/materialClass.do?method=checkForAdd
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
	* @param  f_id 上级id; mc_name 类别名;mc_id 类别id
	* Request materialClass/materialClass.do?method=checkForUpdate
	* Response  resultType：1  可以；2 同名 ；3 有下级
	* @author xufeng
	* @date 2015-10-23
	*/
	public String checkForUpdate(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getCountForUpdate(params);
		int resultType=1;
		if(count>0){
			resultType=2;
		}
		json.put("resultType", resultType);
		int xiajicount=mapper.getXiajiCount(params);
		if(xiajicount>0 && Const.YESNO_TYPE_YES.equalsIgnoreCase((String) params.get("leaf"))){
			json.put("resultType", 3);
		}
		return json.toString();
	}
	
	/**
	* @Description: 判断记录是否可以被删除
	* @param mc_id 类别id
	* Request materialClass/materialClass.do?method=candeleted
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
