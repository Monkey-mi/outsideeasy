package usercenter.organize.data;

import java.util.List;
import java.util.Map;

import usercenter.organize.model.MaxLimit;
import usercenter.organize.model.Organization;


public interface OrganizationMapper {
	public List<Organization> getOrganizationList(Map<String,Object> params);
	public void addOrganization(Organization obj);
	public void updateOrganization(Map<String,Object> params);
	public void updateOrganizationParentId(Map<String,Object> params);
	public void deleteOrganization(Map<String,Object> params);
	int findOrganization(Map<String,Object> params);
	public int findChildrenOrganization(Map<String,Object> params);
	public List<Integer> findChildren(Map<String,Object> params);
	public MaxLimit findMaxNumByRegId(Map<String,Object> params);
	Organization getTreeRoot(Map<String,Object> params);
	public	Organization findOrganizationByName(Map<String,Object> params);
	public Organization getOrganizationByOrg_id(int org_id);
	public List<Organization> findChildrenOrganizations(Map<String,Object> params);
}
