package manager.basicdata.file.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.Const;

import common.model.TreeModel;

import manager.basicdata.file.data.MngBaseFileTypeMapper;
import manager.basicdata.file.model.MngBaseFileType;


@Service
public class MngBaseFileTypeService {
	@Autowired
	private MngBaseFileTypeMapper mapper;


	public List<MngBaseFileType> getMngBaseFileTypeList(Map<String,Object> params) {
		return mapper.getMngBaseFileTypeList(params);
	}
	public void addMngBaseFileType(MngBaseFileType[] arr) {
		for(MngBaseFileType obj: arr) {
			mapper.addMngBaseFileType(obj);
		}
	}
	public void updateMngBaseFileType(MngBaseFileType[] arr) {
		for(MngBaseFileType obj: arr) {
			mapper.updateMngBaseFileType(obj);
		}
	}
	public void deleteMngBaseFileType(MngBaseFileType[] arr) {
		for(MngBaseFileType obj: arr) {
			mapper.deleteMngBaseFileType(obj);
		}
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request basefile/basefilebg.do?method=getFileTypeTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author chenlong
	* @date 2016-04-7
	*/
	public List<TreeModel> getFileTypeTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MngBaseFileType> list=getMngBaseFileTypeList(params);
		
		for(MngBaseFileType sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getFt_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getType_name());
			st.setLeaf(sa.getLeaf());
			st.setExpanded("false");
			
			st.setType("MngBaseFileType");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	
	/**
	* @Description: 判断记录是否可以新增
	* @param  f_id 上级id; type_name 类型名
	* Request basefile/basefilebg.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-04-7
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
	* @param  f_id 上级id; class_name 类别名;class_id 类别id
	* Request basefile/basefilebg.do?method=checkForUpdate
	* Response resultType：1  可以；2 同名 ；3 有下级
	* @author chenlong
	* @date 2016-04-7
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
	* @param class_id 类别id
	* Request basefile/basefilebg.do?method=candeleted
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-04-7
	*/
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==0);
		return json.toString();
	}
}
