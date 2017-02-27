package manager.basicdata.area.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import manager.basicdata.area.data.AreaMapper;
import manager.basicdata.area.model.Area;
import common.model.TreeModel;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class AreaService {
	@Autowired
	private AreaMapper mapper;


	public List<Area> getAreaList(Map<String,Object> params) {
		return mapper.getAreaList(params);
	}
	@Transactional
	public void addArea(Area[] arr) {
		for(Area obj: arr) {
			mapper.addArea(obj);
		}
	}
	@Transactional
	public void updateArea(Area[] arr) {
		for(Area obj: arr) {
			mapper.updateArea(obj);
		}
	}
	@Transactional
	public void deleteArea(Area[] arr) {
		for(Area obj: arr) {
			mapper.deleteArea(obj);
		}
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request area/area.do?method=getAreaTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2015-11-03
	*/
	public List<TreeModel> getAreaTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<Area> list=getAreaList(params);
		
		for(Area sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getArea_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getArea_name());
			st.setLeaf("false");
			st.setExpanded("false");
			
			st.setType("Area");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	
	/**
	* @Description: 判断记录是否可以新增
	* @param  f_id 上级id; class_name 类别名
	* Request area/area.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-03
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
	* Request area/area.do?method=checkForUpdate
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-03
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
	* @param class_id 类别id
	* Request area/area.do?method=candeleted
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2015-11-03
	*/
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==0);
		return json.toString();
	}
}
