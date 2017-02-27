package usercenter.subAccount.data;

import java.util.Map;

import usercenter.subAccount.model.UcSysRole;


public interface UcSysRoleMapper {
	public UcSysRole getUcSysRoleByName(Map<String,Object> params);
}
