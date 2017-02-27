package platform.supplierAccess.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.supplierAccess.data.PfAccessBasetableMapper;
import platform.supplierAccess.model.PfAccessBasetable;
import util.Const;

import common.model.TreeModel;

@Service
public class PfAccessBasetableService {

	@Autowired
	private PfAccessBasetableMapper pfAccessBasetableMapper;
	
	public List<PfAccessBasetable> getPfAccessBasetableList(Map<String,Object> params){
		return pfAccessBasetableMapper.getPfAccessBasetableList(params);
	}
	
	/*获取准入评估项树结构,只取第一层*/
	public List<TreeModel> getEvaluateItemTree(Map<String,Object> params)
	{
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<PfAccessBasetable> list=getPfAccessBasetableList(params);
		for(PfAccessBasetable sa:list) 
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
			
			st.setType("PfAccessBasetable");
			stlist.add(st);
		}
		
		return stlist;
	}
}
