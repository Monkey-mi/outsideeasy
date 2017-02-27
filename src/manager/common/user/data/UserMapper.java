package manager.common.user.data;

import java.util.List;
import java.util.Map;

import manager.common.main.model.Function;
import manager.common.user.model.Role;
import manager.common.user.model.RoleConfig;
import manager.common.user.model.RoleFunc;
import manager.common.user.model.RoleModule;
import manager.common.user.model.UserFunc;
import manager.common.user.model.UserInfo;
import manager.common.user.model.UserModule;
import manager.common.user.model.UserOrg;
import manager.common.user.model.UserRole;


public interface UserMapper {
	public  List<UserInfo> getUserList(Map<String,Object> params);
	public void updateUser(UserInfo obj);
	void addUser(UserInfo userInfo);
	void deleteUser(UserInfo userInfo);
	Integer getEmailCount(Map<String,Object> params); 
	Integer getLogin_idCount(Map<String,Object> params); 
	void update_company_id(Map<String,Object> params); 
	public List<UserInfo> getAllOrgnization(Map<String,Object> params);
	
	public  List<UserInfo> getUserByDefaultOu(Map<String,Object> params);
	List<UserInfo> getInvalidUserByEmail(Map<String,Object> params);
	
	void deleteUserRole(UserRole userRole);
	void deleteUserRoleByUid(int uid);
	void deleteUserMenuByUid(int u_id);
	void deleteUserModuleByUid(int u_id);
	void  deleteUserFuncByUid(int u_id);
	
	public List<Role> getCanChooseRoleList(Map<String,Object> params);
	public List<Role> getRoleListByLoginId(Map<String,Object> params);
	void deleteRoleFuncByFId(int mId);
	
	List<Function> getFuncListByUserModule(Map<String,Object> paramMap);
	void addUserModule(UserModule obj);
	void deleteUserModule(UserModule obj);
	
	List<UserFunc> getUserFuncList(Map<String,Object> paramMap);
	void addUserFunc(UserFunc uc);
	void deleteUserFunc(UserFunc userFunc);
	void deleteUserFuncByfid(int f_id);
	List<UserModule> getUserModuleList(Map<String,Object> paramMap);
	List<RoleFunc>getRoleFuncList(Map<String,Object> paramMap);
	List<RoleModule>getRoleModuleList(Map<String,Object> paramMap);
	void updateUserPwd(UserInfo userInfo);
	
	int getUserCount(Map<String,Object> paramsMap);
	void addRoleFunc(RoleFunc obj);
	void deleteRoleFunc(RoleFunc obj);
	void addRoleModule(RoleModule obj);
	void deleteRoleModule(RoleModule obj);
	
	void deleteRoleModuleByMId(int mId);
	void deleteUserMenuByMid(int mod_id);
	
	List<UserRole> getUserRoleList(Map<String,Object> paramMap);
	Integer getUserRoleCount(Map<String,Object> paramMap);
	void addUserRole(UserRole userRole);
	//角色相关
	List<Role> getRoleList(Map<String,Object> params);
	Role getSupplierRegisterRole();
	void addRole(Role role);
	void updateRole(Role role);
	void deleteRole(Role role);
	void deleteRoleModuleByRId(int rId);
	void deleteRoleFuncByRId(int rId);
	//用户组织相关
	public List<UserOrg> getUserOrgListByUid(int uId);
	public List<UserOrg>getUserOrgList(Map<String,Object> paramMap);
	//角色归属
	List<RoleConfig> getRoleCfgList(Map<String,Object> paramMap);
	void addRoleCfg(RoleConfig role);
	void updateRoleCfg(RoleConfig role);
	void deleteRoleCfg(RoleConfig role);
	List<RoleConfig> getRoleCfgByUid(Map<String,Object> paramMap);
}
