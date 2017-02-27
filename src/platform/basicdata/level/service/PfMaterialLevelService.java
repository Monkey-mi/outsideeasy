package platform.basicdata.level.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.basicdata.level.data.PfMaterialLevelMapper;
import util.Const;

import com.outsideasy.ws.erp.supplier.vo.MaterialClassOut;
import com.outsideasy.ws.erp.supplier.vo.MaterialLevelOut;
import common.model.TreeModel;

@Service
public class PfMaterialLevelService {

	@Autowired
	private PfMaterialLevelMapper pfMaterialLevelMapper;
	
	public List<MaterialLevelOut> getMaterialLevelOutList(Map<String,Object> params) {
		return pfMaterialLevelMapper.getMaterialLevelOutList(params);
	}
	public List<TreeModel> getMaterialLevelTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MaterialLevelOut> list=getMaterialLevelOutList(params);
		
		for(MaterialLevelOut sa:list) 
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
	public List<MaterialClassOut> getMaterialClassOutList(Map<String,Object> params) {
		return pfMaterialLevelMapper.getMaterialClassOutList(params);
	}
	public List<TreeModel> getMaterialClassTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<MaterialClassOut> list=getMaterialClassOutList(params);
		
		for(MaterialClassOut sa:list) 
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
}
