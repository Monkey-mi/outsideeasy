package manager.common.user.data;

import java.util.List;
import java.util.Map;

import manager.common.user.model.Role;


public interface RoleMapper {

	List<Role> getRoleList(Map<String,Object> params);
	void addRole(Role role);
	void updateRole(Role role);
	void deleteRole(Role role);
	int getCountUserRoleByRole_id(int role_id);
}
