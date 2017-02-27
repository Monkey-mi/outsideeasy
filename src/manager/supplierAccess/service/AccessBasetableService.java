package manager.supplierAccess.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import common.model.TreeModel;
import manager.supplierAccess.data.AccessBasetableMapper;
import manager.supplierAccess.model.AccessBasetable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.Const;


@Service
public class AccessBasetableService {
	@Autowired
	private AccessBasetableMapper mapper;


	public List<AccessBasetable> getAccessBasetableList(Map<String,Object> params) {
		return mapper.getAccessBasetableList(params);
	}
	public void addAccessBasetable(AccessBasetable[] arr) {
		for(AccessBasetable obj: arr) {
			mapper.addAccessBasetable(obj);
		}
	}
	public void updateAccessBasetable(AccessBasetable[] arr) {
		for(AccessBasetable obj: arr) {
			mapper.updateAccessBasetable(obj);
		}
	}
	public void deleteAccessBasetable(AccessBasetable[] arr) {
		for(AccessBasetable obj: arr) {
			mapper.deleteAccessBasetable(obj);
		}
	}
	
	
	/*获取准入评估项树结构,只取第一层*/
	public List<TreeModel> getEvaluateItemTree(Map<String,Object> params)
	{
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<AccessBasetable> list=getAccessBasetableList(params);
		for(AccessBasetable sa:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sa.getItem_id());
			st.setParentId(sa.getF_id());
			st.setText(sa.getItem_name());
			if(sa.getF_id()==0)
			{
				st.setLeaf("false");
			}
			else
			{
				st.setLeaf(Const.YESNO_TYPE_YES);
			}
			st.setExpanded(Const.YESNO_TYPE_YES);
			
			st.setType("EvaluateItem");
			stlist.add(st);
			
		}
		
		return stlist;
	}
}
