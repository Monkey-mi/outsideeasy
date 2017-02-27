package manager.common.user.service;

import java.util.List;
import java.util.Map;

import manager.common.user.data.RoleMapper;
import manager.common.user.model.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.Const;
import util.SessionUtil;

@Service
public class RoleService {
	@Autowired
	private RoleMapper mapper;
	
	public List<Role> getRoleList(Map<String, Object> params) {
		if(!SessionUtil.isAdmin())
		{
			params.put("hasAD","false");
		}
		List<Role> roleList = mapper.getRoleList(params);
		return roleList;
	}
	public void addRole(Role role) {
		mapper.addRole(role);
	}
	public void updateRole(Role role) {
		mapper.updateRole(role);
	}
	public void deleteRole(Role role,Map<String, Object> resp) {
		int count=mapper.getCountUserRoleByRole_id(role.getRole_id());
		if(count==0){
			mapper.deleteRole(role);
		}else{
			resp.put(Const.AJAX_ERR_CODE,300);
			resp.put(Const.AJAX_SERVICE_MESSAGE,"角色已经使用");
		}
		
	}
}
