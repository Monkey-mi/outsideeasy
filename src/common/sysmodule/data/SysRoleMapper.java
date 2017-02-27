package common.sysmodule.data;

import java.util.List;
import java.util.Map;

import common.sysmodule.model.SysRole;
import common.sysmodule.model.SysRoleAuthority;
import common.sysmodule.model.SysRolePage;
import common.sysmodule.model.SysRolePageFunc;



public interface SysRoleMapper {
	public List<SysRole> getSysRoleList(Map<String,Object> params);
	public void addSysRole(SysRole obj);
	public void updateSysRole(SysRole obj);
	public void deleteSysRole(SysRole obj);
	int getCountForRole_name(Map<String,Object> params);
	List<String> getVisitorPage(Map<String,Object> params);
	List<String> getUrlListByRole_id(Map<String,Object> params);
	public List<SysRoleAuthority> getSysRoleAuthorityList(Map<String,Object> params);
	public void addSysRoleAuthority(SysRoleAuthority obj);
	public void updateSysRoleAuthority(SysRoleAuthority obj);
	public void deleteSysRoleAuthority(SysRoleAuthority obj);
	public SysRole getSysRoleByName(Map<String,Object> params);
	public List<SysRolePageFunc> getSysRolePageFuncList(Map<String,Object> params);
	public void addSysRolePageFunc(SysRolePageFunc obj);
	public void updateSysRolePageFunc(SysRolePageFunc obj);
	public void deleteSysRolePageFunc(SysRolePageFunc obj);
	public List<SysRolePage> getSysRolePageList(Map<String,Object> params);
	public void addSysRolePage(SysRolePage obj);
	public void updateSysRolePage(SysRolePage obj);
	public void deleteSysRolePage(SysRolePage obj);
	int getCountForRoleFuncAuth(Map<String,Object> params);
	int getCountForRolePageAuth(Map<String,Object> params);
	
	/**
	 * @Description: 获取账号对应的角色ID
	 * SysRoleMapper
	 * getAccountRole
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-9-20 上午9:58:34
	 */
	public Integer getMainAccountRole(Map<String, Object> params);
	/**
	 * @Description:根据登录账号的role_id查询所有class_id
	 * SysRoleMapper
	 * getAllClassIdByRoleId
	 * @param params
	 * @return List<Integer>
	 * @author yukai
	 * 2016-9-26 上午9:17:28
	 */
	public List<Integer> getAllClassIdByRoleId(Map<String, Object> params);
	public void updateRoleStatus(Map<String, Object> params);
}
