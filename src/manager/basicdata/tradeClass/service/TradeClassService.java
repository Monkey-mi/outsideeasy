package manager.basicdata.tradeClass.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import manager.basicdata.tradeClass.data.TradeClassMapper;
import manager.basicdata.tradeClass.model.TradeClass;
import common.model.TreeModel;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import util.Const;


@Service
public class TradeClassService {
	@Autowired
	private TradeClassMapper mapper;


	public List<TradeClass> getTradeClassList(Map<String,Object> params) {
		return mapper.getTradeClassList(params);
	}
	@Transactional
	public void addTradeClass(TradeClass[] arr) {
		for(TradeClass obj: arr) {
			mapper.addTradeClass(obj);
		}
	}
	@Transactional
	public void updateTradeClass(TradeClass[] arr) {
		for(TradeClass obj: arr) {
			mapper.updateTradeClass(obj);
		}
	}
	@Transactional
	public void deleteTradeClass(TradeClass[] arr) {
		for(TradeClass obj: arr) {
			mapper.deleteTradeClass(obj);
		}
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request tradeClass/tradeClass.do?method=getTradeClassTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2015-10-23
	*/
	public List<TreeModel> getTradeClassTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<TradeClass> list=getTradeClassList(params);
		
		for(TradeClass sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getClass_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getClass_name());
			st.setLeaf(sa.getLeaf());
			st.setExpanded("false");
			
			st.setType("TradeClass");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	
	/**
	* @Description: 判断记录是否可以新增
	* @param  f_id 上级id; class_name 类别名
	* Request tradeClass/tradeClass.do?method=checkForAdd
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
	* @param  f_id 上级id; class_name 类别名;class_id 类别id
	* Request tradeClass/tradeClass.do?method=checkForUpdate
	* Response resultType：1  可以；2 同名 ；3 有下级
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
	* @param class_id 类别id
	* Request tradeClass/tradeClass.do?method=candeleted
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
