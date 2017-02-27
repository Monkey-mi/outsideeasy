package usercenter.organize.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.organize.data.OrganizationMapper;
import usercenter.organize.model.MaxLimit;
import usercenter.organize.model.Organization;
import usercenter.company.data.CompanyMapper;
import usercenter.company.model.Company;
import util.Const;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;


@Service
public class OrganizationService {
	@Autowired
	private OrganizationMapper mapper;
	@Autowired
	private CompanyMapper supplierMapper;
	
	
	public List<Organization> getOrganizationList(Map<String,Object> params) {
		LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
		params.put("reg_id", loginAccount.getLogin_id());
		initTreeRoot(params);
		
		return mapper.getOrganizationList(params);
	}
	public List<Organization> getOrganizationListByName(Map<String,Object> params) {
		List<Organization> recs_in_company=getOrganizationList(new HashMap<String,Object>());
		List<Organization> recsByName=getOrganizationList(params);
		List<Organization> recsReturn=new ArrayList<Organization>();//返回的部门列表
		recsReturn.addAll(recsByName);
		//按照记录，对每个部门，循环查找上级部门
		for(Organization org:recsByName){
			addOrg2ReturnList(org.getParentId(),recs_in_company,recsReturn);
		}
		return recsReturn;
	}
	/**从起始ID开始循环查找，添加组织到 返回的列表。
	 * 终止条件：到根节点 或者 添加的记录已经存在
	 * 参数：起始ID，该公司所有组织，返回的列表
	 * */
	private void addOrg2ReturnList(int parentId,List<Organization> recs_in_company,List<Organization> recsReturn){
		while(parentId!=0){
			for(Organization org:recs_in_company){
				if(parentId==org.getOrg_id()){
					//检验是否父节点已经存在
					boolean exist=false;
					for(Organization rec:recsReturn){
						if(parentId==rec.getOrg_id()){
							exist=true;
							return;//直接终止该方法，而不仅仅是break中断循环
						}
					}
					if(!exist){
						recsReturn.add(org);
						parentId=org.getParentId();
					}
					break;//终止循环，已经找到父节点
				}
			}
		}
		
	}
	//共用的节点,开始就存在于数据库
	public Organization initTreeRoot(Map<String,Object> params){
		Organization org=mapper.getTreeRoot(params);
		if(org==null){
			org=new Organization();
			org.setReg_id(Integer.parseInt(params.get("reg_id").toString()));
			org.setName("组织架构");
			org.setIsParent(Const.YESNO_TYPE_YES);
			org.setIsvalid(Const.YESNO_TYPE_YES);
			org.setParentId(0);
			mapper.addOrganization(org);
		}
		return org;
	}
	/**查询是否已经存在
	 * parentId   name org_id
	 * true 存在；false 不存在**/
	public boolean findOrganizationExist(Map<String,Object> params){
		return mapper.findOrganization(params)>0;
	}
	/**查询下级是否存在
	 * org_id*/
	public boolean findChildrenOrganizationExist(Map<String,Object> params){
		return mapper.findChildrenOrganization(params)>0;
	}
	public void addOrganization(Organization obj) {
		mapper.addOrganization(obj);
	}
	public void updateOrganization(Map<String,Object> params) {
		mapper.updateOrganization(params);
	}
	public void updateOrganizationParentId(Map<String,Object> params){
		mapper.updateOrganizationParentId(params);
	}
	public void deleteOrganization(Map<String,Object> params) {
		mapper.deleteOrganization(params);		
	}
	//查询最大人数
	public int findMaxNumByCompanyId(Map<String,Object> params){
		LoginAccount ra=SessionUtil.getCurrentPlateLoginAccount();
		params.put("reg_id", ra.getLogin_id());
		MaxLimit ml=mapper.findMaxNumByRegId(params);
		if (ml!=null) {
			int count=ml.getMaxnum();
			return count;
		}else {
			return 500;
		}
	}
	public Organization findOrganizationByName(Map<String,Object> params) {
		return mapper.findOrganizationByName(params);		
	}
	
	public List<Integer> findAllChildrenIds(Map<String,Object> params) {
		List<Integer>allChildrenIds=new ArrayList<Integer>();
		return  findAllChildrenId(params,allChildrenIds);
	}
	
	public List<Integer> findAllChildrenId(Map<String,Object> params,List<Integer> allChildrenIds) {
		List<Integer>childrenIds=mapper.findChildren(params);
		if (childrenIds.size()>0) {
			for (Integer children : childrenIds) {
				allChildrenIds.add(children);
				params.put("org_id", children);
				findAllChildrenId(params,allChildrenIds);
			}
		}
		return  allChildrenIds;
	}
	
	public List<Organization> getOrganizationListByOrg_id(int org_id){
		Organization organization=new Organization();
		List<Organization>organizations=new ArrayList<Organization>();
		while(org_id!=0){
			organization=mapper.getOrganizationByOrg_id(org_id);
			organizations.add(organization);
			org_id=organization.getParentId();
		}
		return organizations;
	}
	
	public List<Organization> findAllChildrenOrganizations(Map<String,Object> params) {
		List<Organization>allChildrenOrganizations=new ArrayList<Organization>();
		return  findAllChildrenOrganization(params,allChildrenOrganizations);
	}
	
	public List<Organization> findAllChildrenOrganization(Map<String,Object> params,List<Organization> allChildrenOrganizations) {
		List<Organization>childrenOrganizations=mapper.findChildrenOrganizations(params);
		if (childrenOrganizations.size()>0) {
			for (Organization organization : childrenOrganizations) {
				allChildrenOrganizations.add(organization);
				params.put("org_id", organization.getOrg_id());
				findAllChildrenOrganization(params,allChildrenOrganizations);
			}
		}
		return  allChildrenOrganizations;
	}
}
