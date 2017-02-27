package manager.regAccount.data;

import java.util.List;
import java.util.Map;

import usercenter.organize.model.Organization;

public interface MmgOrganizationMapper {
	public List<Organization> getOrganizationList(Map<String,Object> params);
	public void addOrganization(Organization obj);
	public void updateOrganizationName(Map<String,Object> params);
	public void updateOrganizationParentId(Map<String,Object> params);
	public void deleteOrganization(Map<String,Object> params);
	public void updateOrganizationbg(Organization params);
	public void deleteOrganizationbg(Organization params);
	int findOrganization(Map<String,Object> params);
	public int findChildrenOrganization(Map<String,Object> params);
	//Organization getTreeRoot();
	public int getCountForAdd(Map<String,Object> params);//添加时查询是否已存在该记录，有则int值大于0
	public int getXiajiCount(Map<String,Object> params);//查询查询出是否有下级
	public int getCountForUpdate(Map<String,Object> params);//更新时的名称是否已经存在，有则int值大于0
}
