package usercenter.subAccount.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.subAccount.data.UcSysRoleMapper;
import usercenter.subAccount.model.UcSysRole;
@Service
public class UcSysRoleService {

	@Autowired
	private UcSysRoleMapper mapper;
	
	/**按照角色名获取角色对象**/
	public UcSysRole getUcSysRoleByName(Map<String,Object> params){
		return mapper.getUcSysRoleByName(params);
	}
	
	public UcSysRole getUcSysRoleASSupplierSubAccount(){
		Map<String,Object> roleparams=new HashMap<String,Object>();
		roleparams.put("role_name", "SupplierSubAccount");
		return getUcSysRoleByName(roleparams);
	}
}
