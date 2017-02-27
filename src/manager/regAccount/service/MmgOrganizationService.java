package manager.regAccount.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import common.model.TreeModel;
import manager.regAccount.data.MmgOrganizationMapper;
import manager.regAccount.model.TreeModelOrganizationResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import usercenter.organize.model.Organization;
import util.Const;



@Service
public class MmgOrganizationService {
	@Autowired
	private MmgOrganizationMapper mapper;

	
	/**
	 * 后台显示某个主账号的组织架构
	 * @author chenlong
	 * @time 2016-03-22
	 * @param params
	 * @return
	 */
	public List<Organization> getOrganizationListbg(Map<String,Object> params){
		return mapper.getOrganizationList(params);
	}
	/**
	 * 后台添加主账号的组织架构
	 * @author chenlong
	 * @time 2016-03-22
	 * @param obj
	 */
	@Transactional
	public void addOrganizationbg(Organization[] obj){
		for(Organization param : obj){
			mapper.addOrganization(param);
		}
		
	}
	/**
	 * 后台修改主账号的组织架构
	 * @author chenlong
	 * @time 2016-03-22
	 * @param params
	 */
	@Transactional
	public void updateOrganizationbg(Organization[] params){
		for(Organization obj : params){
			mapper.updateOrganizationbg(obj);
		}
	}
    /**
     * 后台删除主账号的组织架构树
     * @author chenlong
	 * @time 2016-03-22
     * @param params
     */
	@Transactional
	public void deleteOrganizationbg(Organization[] params){
		for(Organization obj : params){
			mapper.deleteOrganizationbg(obj);
		}
	}
	
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request organization/organizationBg.do?method=getOrganizationTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author chenlong
	* @time 2016-03-24
	*/
	public List<TreeModelOrganizationResponse> getOrganizationTree(Map<String,Object> params) {
		List<TreeModelOrganizationResponse> stlist=new ArrayList<TreeModelOrganizationResponse>();
		List<Organization> list=getOrganizationListbg(params);//(params);		
		for(Organization sa:list) 
		{
			TreeModelOrganizationResponse st=new TreeModelOrganizationResponse();
			st.setId(sa.getOrg_id());
			st.setParentId(sa.getParentId());
			st.setText(sa.getName());
			st.setLeaf("false");
			st.setExpanded("false");			
			st.setType("Organization");
			st.setReg_id(sa.getReg_id());
			stlist.add(st);			
		}		
		return stlist;
	}
	
	/**
	* @Description: 后台判断记录是否可以新增
	* @param  company_id 上级id; dept_name 类别名
	* Request organization/organizationBg.do?method=checkForAdd
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-03-22
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
	* Request organization/organizationBg.do?method=checkForUpdate
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-03-25
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
		if(xiajicount>0 && Const.YESNO_TYPE_YES.equalsIgnoreCase((String) params.get("isParent"))){
			json.put("resultType", 3);
		}
		return json.toString();
	}
	
	/**
	 * 检查账户是否存在子账户
	 * @param params
	 * @return json
	 * @time 2016-03-31
	 * @author chenlong
	 */
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==0);
		return json.toString();
	}

	
}
