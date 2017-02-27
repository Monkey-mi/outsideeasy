package common.sysmodule.data;

import java.util.List;
import java.util.Map;

import common.sysmodule.model.SysFunctionClass;
import common.sysmodule.model.SysPageAuthority;
import common.sysmodule.model.SysPageFunc;



public interface SysFunctionClassMapper {
	public List<SysFunctionClass> getSysFunctionClassList(Map<String,Object> params);
	public void addSysFunctionClass(SysFunctionClass obj);
	public void updateSysFunctionClass(SysFunctionClass obj);
	public void deleteSysFunctionClass(SysFunctionClass obj);
	void deleteSysRoleAuthorityByclass_id(Map<String,Object> params);
	public List<SysPageAuthority> getSysPageAuthorityList(Map<String,Object> params);
	public void addSysPageAuthority(SysPageAuthority obj);
	public void updateSysPageAuthority(SysPageAuthority obj);
	public void deleteSysPageAuthority(SysPageAuthority obj);
	public int getCountForUpdate(Map<String,Object> params);
	public List<SysPageFunc> getSysPageFuncList(Map<String,Object> params);
	public void addSysPageFunc(SysPageFunc obj);
	public void updateSysPageFunc(SysPageFunc obj);
	public void deleteSysPageFunc(SysPageFunc obj);
	public void deleteSysPageFuncByauthId(Integer obj);
	public int getSysPageFuncCount(Integer obj);
	public List<SysFunctionClass> getSysMenusByRole(Map<String,Object> params);
	public List<SysPageAuthority> getSysMenuPagesByRole(Map<String,Object> params);
}
