package manager.common.user.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import manager.common.main.model.Function;
import manager.common.orgunit.data.OrgUnitMapper;
import manager.common.user.data.UserMapper;
import manager.common.user.model.Role;
import manager.common.user.model.RoleConfig;
import manager.common.user.model.RoleFunc;
import manager.common.user.model.RoleModule;
import manager.common.user.model.UserFunc;
import manager.common.user.model.UserInfo;
import manager.common.user.model.UserModule;
import manager.common.user.model.UserOrg;
import manager.common.user.model.UserRole;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import util.Const;
import util.MD5Util;
import util.PublishInfo;
import util.SendEmail;
import util.SessionUtil;

@Service
public class UserService {
	@Autowired
	private UserMapper usersMapper;
	@Autowired
	private OrgUnitMapper orgMapper;
	/**
	 * @Description: 获取用户功能列表
	 * @param @param paramMap
	 * @param @return   
	 * @return List<UserFunc>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-7
	 */
	public List<UserFunc> getUserFuncList(Map<String,Object> paramMap){
		return usersMapper.getUserFuncList(paramMap);
	}
	
	public void addUserFunc(UserFunc[] userFunc){
		for(UserFunc item:userFunc){
			usersMapper.addUserFunc(item);
		}
	}
	public void deleteUserFunc(UserFunc[] userFunc){
		for(UserFunc item:userFunc){
			item.setU_id(0);
			item.setOu_id(0);
			usersMapper.deleteUserFunc(item);
		}
	}
	
	/**
	 * @Description: 获取用户功能菜单列表
	 * @param @param paramMap
	 * @param @return   
	 * @return List<UserModule>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-7
	 */
	public List<UserModule> getUserModuleList(Map<String,Object> paramMap){
		return usersMapper.getUserModuleList(paramMap);
	}
	@Transactional
	public void addUserModule(UserModule[] userModule){
		for(UserModule item:userModule){
			usersMapper.addUserModule(item);
		}
	}
	@Transactional
	public void deleteUserModule(UserModule[] userModule){
		for(UserModule item:userModule){
			usersMapper.deleteUserModule(item);
		}
	}
	/**
	 * 获得可选择配置角色清单
	 * @param params  u_id --用户id  ou_id --目标组织id
	 * @return
	 */
	public List<Role> getCanChooseRoleList(Map<String, Object> params){
		if(SessionUtil.isAdmin())
			params.put("is_admin", Const.YESNO_TYPE_YES);
		return usersMapper.getCanChooseRoleList(params);		
	}
	
	/**
	 * 取得角色功能列表信息
	 * Request main/Users.do?method=getRoleFuncList <br/><br/>
	 * Response {data:[{@link RoleFunc}]} <br/><br/>
	 * @param paramMap r_id,f_id
	 * @return RoleFunc
	 */
	public List<RoleFunc> getRoleFuncList(Map<String, Object> paramMap) {
		return usersMapper.getRoleFuncList(paramMap);
	}
	/**
	 * 角色功能关联权限增加
	 * Request user/Users.do?method=addRoleFunc <br/><br/>
	 * Response {data:[{@link RoleFunc}]} <br/><br/>
	 * @param RoleFunc {@link RoleFunc}
	 */
	@Transactional
	public void addRoleFunc(RoleFunc[] roleFunc) {
		for (RoleFunc rf : roleFunc) {
			usersMapper.addRoleFunc(rf);
		}
	}
	/**
	 * 删除角色功能关联权限
	 * Request user/Users.do?method=deleteRoleFunc <br/><br/>
	 * Response {} <br/><br/>
	 * @param roleFunc {@link RoleFunc}
	 */
	@Transactional
	public void deleteRoleFunc(RoleFunc[] roleFunc) {
		for (RoleFunc rf : roleFunc) {
			usersMapper.deleteRoleFunc(rf);
		}
	}
	
	/**
	 * @Description: 增加角色模块关联权限
	 * @param @param roleModule   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-8
	 */
	@Transactional
	public void addRoleModule(RoleModule[] roleModule) {
		for (RoleModule rm : roleModule) {
			usersMapper.addRoleModule(rm);
		}
	}
	/**
	 * @Description:  删除角色模块关联权限
	 * @param @param roleModule   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-8
	 */
	@Transactional
	public void deleteRoleModule(RoleModule[] roleModule) {
		for (RoleModule rm : roleModule) {
			usersMapper.deleteRoleModule(rm);
		}
	}
	
	/**
	 * 获得角色模块的列表信息
	 * Request main/Users.do?method=getRoleModuleList <br/><br/>
	 * Response {data:[{@link RoleModule}]} <br/><br/>
	 * @param paramMap
	 * @return RoleModule
	 */
	public List<RoleModule> getRoleModuleList(Map<String, Object> paramMap) {
		return usersMapper.getRoleModuleList(paramMap);
	}
	
	/**
	 * @Description:  通过用户模块获得角色功能列表
	 * @param @param paramMap
	 * @param @return   
	 * @return List<Function>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-2
	 */
	public List<Function> getFuncListByUserModule(Map<String, Object> paramMap) {
		return usersMapper.getFuncListByUserModule(paramMap);
	}
	/**
	 * 登录校验
	 * Request main/Users.do?method=chkUserPwd<br/><br/>
	 * Response {data:true|false} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数：login_id && pwd
	 * @return true-用户ID(login_id)/密码(pwd)正确    false-不正确
	 */
	public boolean chkUserPwd(Map<String, Object> paramsMap) {
		paramsMap.put("is_valid", Const.YESNO_TYPE_YES);
		return usersMapper.getUserCount(paramsMap)>0;
	}
	/**
	 * @Description: 根据用户组织代码，获取用户清单
	 * @param @param paramMap
	 * @param @return   
	 * @return List<UserInfo>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-3
	 */
	public List<UserInfo> getUserByDefault(Map<String,Object> paramMap){
		//组织代码
//		String ouCode = paramMap.get("ou_code") != null? paramMap.get("ou_code").toString().trim():"";
		//根据组织筛选用户
		return usersMapper.getUserByDefaultOu(paramMap);
	}
	@Transactional
	public void initUserOrgCache(){
		List<UserOrg> luo = usersMapper.getUserOrgListByUid(SessionUtil.getCurrentUser().getU_id());
		SessionUtil.setAttribute(Const.SESSION_USERORG, luo);
		for(UserOrg node: luo){
				if(node.getIs_default()==1)
				{
					SessionUtil.setAttribute(Const.SESSION_DEFAULT_ORG, orgMapper.getOrgUnitListByCode(node.getOu_code()));
				}
		}
	}
	
	public List<Role> getRoleList(Map<String, Object> params) {
		String mode= params.get("mode")!=null?params.get("mode").toString():null;
		String condition= params.get("condition")!=null?params.get("condition").toString():"";
		
		if(mode!=null&&mode.equals("allSearch")){
			params.put("role_name","%"+condition+"%");
		}
		if(SessionUtil.isAdmin())
		{
			params.put("mode","exists");
		}
		List<Role> roleList = usersMapper.getRoleList(params);
		return roleList;
	}
	/**
	 * 增加角色
	 * Request main/Users.do?method=addRole <br/><br/>
	 * Response {data:[{@link Role}]}
	 * @param roles 参数为需要增加的角色数组 {@link Role}
	 */
	@Transactional
	public void addRole(Role[] roles) {
		for(Role role:roles){
		usersMapper.addRole(role);
		}
	}
	/**
	 * 更新角色
	 * Request main/Users.do?method=updateRole <br/><br/>
	 * Response {data:[{@link Role}]}
	 * @param roles 参数为需要更新的角色数组 {@link Role}
	 */
	@Transactional
	public void updateRole(Role[] roles) {
		for(Role role:roles){
		usersMapper.updateRole(role);
		}
	}
	/**
	 *  删除用户的角色信息
	 *  Request main/Users.do?method=deleteRole <br/><br/>
	 *  Response {data:[{@link Role}]}
	 * @param roles {@link Role}
	 */
	@Transactional
	public void deleteRole(Role[] roles) {
		for(Role role:roles){
		usersMapper.deleteRoleModuleByRId(role.getRole_id());
		usersMapper.deleteRoleFuncByRId(role.getRole_id());
		usersMapper.deleteRole(role);
		}
	}
	public List<UserRole> getUserRoleList(Map<String,Object> params){
		return usersMapper.getUserRoleList(params);
	}
	@Transactional
	public void addUserRole(UserRole[] userole){
		for(UserRole item:userole){
			usersMapper.addUserRole(item);
		}
	}
	/**
	 * @Description: 检验用户ID合法性
	 * @param @param params
	 * @param @return   
	 * @return boolean  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-7
	 */
	public boolean isExistsUser(Map<String,Object> params){
		return usersMapper.getUserList(params).size()>0;
	}
	/**
	 * 修改密码
	 * Request main/Users.do?method=updateUserPwd <br/><br/>
	 * Response {data:[{@link UserInfo}}]}
	 * @param  userInfo {@link UserInfo}
	 *            需提供userInfo.login_id和userInfo.pwd 两个参数
	 * 
	 */
	public void updateUserPwd(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setModify_dt(new Date());
		usersMapper.updateUserPwd(userInfo);
		}
	}
	/**
	 * 获取用户列表
	 * Request main/Users.do?method=getUserList <br/><br/>
	 * Response {data:[{@link UserInfo}}]} <br/><br/>
	 * @param paramsMap
	 *            支持如下参数： login_id,u_type,login_type,name%
	 * @return UserInfo 列表
	 */
	public List<UserInfo> getUserList(Map<String, Object> paramsMap) {
		    return usersMapper.getUserList(paramsMap);
	}
	
	/**
	 * 新增用户
	 * Request main/Users.do?method=addUser <br/><br/>
	 * Response {data:[{UserInfo}]} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	@Transactional
	public void addUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setCreate_dt(new Date());
		usersMapper.addUser(userInfo);
		return;
		}
	}
	
	/**
	 * 更新用户
	 * Request main/Users.do?method=updateUser <br/><br/>
	 * Response {data:[{UserInfo}]} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	@Transactional
	public void updateUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
		userInfo.setModify_dt(new Date());
		usersMapper.updateUser(userInfo);
		return;
		}
	}
	@Transactional
	public void deleteUserRole(UserRole[] userrole){
		for(UserRole item:userrole){
			usersMapper.deleteUserRole(item);
		}
	}
	/**
	 * 删除用户 将同时删除用户角色授权
	 * Request main/Users.do?method=deleteUser <br/><br/>
	 * Response {} <br/><br/>
	 * @param userInfo {@link UserInfo}
	 */
	@Transactional
	public void deleteUser(UserInfo[] userInfos) {
		for(UserInfo userInfo:userInfos){
			int uId = userInfo.getU_id();
//			usersMapper.deleteUserMenuByUid(uId);    //用户菜单
			usersMapper.deleteUserRoleByUid(uId);    //用户角色
			usersMapper.deleteUserModuleByUid(uId);  //用户模块
			usersMapper.deleteUserFuncByUid(uId);    //用户功能
//			usersMapper.deleteUserOrgByUid(uId);       //用户组织
			Map<String,Object> param=new HashMap<String, Object>();
			param.put("login_id",userInfo.getLogin_id());
			// 最后删除用户信息
			usersMapper.deleteUser(userInfo);
		}
	}
	
	/**
	 * 获取角色配置列表
	 * request main/Users.do?method=getRoleConList <br/><br/>
	 * response {data:[{@link RoleConfig}]} <br/><br/>
	 * @param paramMap role_id,con_id
	 * @return RoleConfig
	 */
	public List<RoleConfig> getRoleCfgList(Map<String,Object> paramMap){
		return usersMapper.getRoleCfgList(paramMap);
	}
	
	/**
	 * @Description: 增加角色归属
	 * @param @param RoleCfgs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-8
	 */
	@Transactional
	public void addRoleCfg(RoleConfig[] RoleCfgs){
		for(RoleConfig obj:RoleCfgs){
			usersMapper.addRoleCfg(obj);
		}
	}
	/**
	 * @Description: 检验角色ID合法性
	 * @param @param params
	 * @param @return   
	 * @return boolean  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-7
	 */
	public boolean isExistsRole(Map<String,Object> params){
		return usersMapper.getRoleList(params).size()>0;
	}
	/**
	 * @Description: 修改角色归属
	 * @param @param RoleCfgs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-8
	 */
	@Transactional
	public void updateRoleCfg(RoleConfig[] RoleCfgs){
		for(RoleConfig obj:RoleCfgs){
			usersMapper.updateRoleCfg(obj);
		}
	}
	
	/**
	 * @Description: 删除角色归属
	 * @param @param RoleCfgs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-8
	 */
	@Transactional
	public void deleteRoleCfg(RoleConfig[] RoleCfgs){
		for(RoleConfig obj:RoleCfgs){
			usersMapper.deleteRoleCfg(obj);
		}
	}
	/**
	 * @Description: 获取指定账号数量
	 * @param login_id  
	 * @return true 存在；false 不存在 
	 * @throws
	 * @author 徐锋
	 * @date 2015-10-12
	 */
	public String login_idIsUsed(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=usersMapper.getLogin_idCount(params);
		json.put("statu", count>0);
		return json.toString();
	}
	/**
	 * @Description: 获取指定email的用户数
	 * @param email  
	 * @return true 存在；false 不存在 
	 * @throws
	 * @author 徐锋
	 * @date 2015-10-10
	 */
	public String emailIsUsed(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=usersMapper.getEmailCount(params);
		json.put("statu", count>0);
		return json.toString();
	}
	/**
	 * @Description: 新增无效的用户
	 * @param userinfo  
	 * @return void
	 * @throws
	 * @author 徐锋
	 * @date 2015-10-10
	 */
	@Transactional
	public void addInvalidUser(UserInfo ui){
		usersMapper.addUser(ui);
        String login_id=ui.getLogin_id();
        ui.setLogin_id(login_id);
        //激活码等于账号+密码的MD5码
        String validateCode=MD5Util.encode2hex(login_id+ui.getPwd());
        PublishInfo pi=PublishInfo.getInstance();
        String url=pi.getUrl();
        //邮件的内容
        StringBuffer sb=new StringBuffer("点击下面链接激活账号，48小时生效，否则重新注册账号，请尽快激活！</br>");
        
    	sb.append("<a href=\""+url+"/user/activate.do?email=");
        sb.append(ui.getEmail());
        sb.append("&validateCode=");
        sb.append(validateCode);
        sb.append("\">请点击激活账号");
        sb.append("</a>");
        //发送邮件
        SendEmail.send(ui.getEmail(), sb.toString());
	}
	/**
	 * @Description: 激活用户
	 * @param email validateCode  
	 * @return String
	 * @throws
	 * @author 徐锋
	 * @date 2015-10-12
	 */
	@Transactional
	public boolean activate(Map<String,Object> params,HttpServletRequest request){
		boolean success=false;
		
		List<UserInfo> list=usersMapper.getInvalidUserByEmail(params);//按邮箱获取所有未激活的账号
        if(list.size()>0){
        	String validateCode=(String)params.get("validateCode");
        	boolean flag=false;//表示存在该邮箱，但是没有正确的激活码
        	for(UserInfo ui:list){
        		String md5str=MD5Util.encode2hex(ui.getLogin_id()+ui.getPwd());
        		if(ui.getLogin_id()!=null && md5str.equals(validateCode)){
        			Map<String,Object> tempparams=new HashMap<String,Object>();
        			tempparams.put("email", ui.getEmail());
        			tempparams.put("login_id", ui.getLogin_id());
        			//检测邮箱是否已经被注册
        			if(usersMapper.getEmailCount(tempparams)>0){
        				request.setAttribute("activatemessage" , "邮箱已经被抢注");
        				return false;
        			}
        			//检测账号是否被注册
        			if(usersMapper.getLogin_idCount(tempparams)>0){
        				request.setAttribute("activatemessage" , "账号已经被抢注");
        				return false;
        			}
        			flag=true;
        			Date create_date=ui.getCreate_dt();
                	Calendar rightNow = Calendar.getInstance();
                	rightNow.add(Calendar.DAY_OF_MONTH, -2);
                	if(create_date.before(rightNow.getTime())){//超过两天
                		request.setAttribute("activatemessage" , "激活码已过期");
                	}else{
                		ui.setIs_valid(Const.YESNO_TYPE_YES);
                		usersMapper.updateUser(ui);
                		request.setAttribute("activatemessage" , "激活成功");
                		success=true;
                		//TODO:给 用户 赋予 角色
                		//获取角色SupplierRegister对象
                		Role role=usersMapper.getSupplierRegisterRole();
                		//判断权限是否已经存在
                		Map<String,Object> params2=new HashMap<String,Object>();
                		params2.put("role_id", role.getRole_id());
                		params2.put("u_id", ui.getU_id());
                		int count=usersMapper.getUserRoleCount(params2);
                		if(count==0){//权限不存在，需要添加
                			UserRole ur=new UserRole();
                    		ur.setRole_id(role.getRole_id());
                    		ur.setU_id(ui.getU_id());
                    		usersMapper.addUserRole(ur);
                		}
                		break;
                	}
        		}
        		
        	}
        	if(!flag){
    			request.setAttribute("activatemessage" , "激活码不对");
    		}
        	//其他同名邮箱的全部删除
        	for(UserInfo ui:list){
        		if(ui.getIs_valid()=="false"){
        			usersMapper.deleteUser(ui);
        		}
        	}
        }else{
        	request.setAttribute("activatemessage" , "邮箱已注册并激活");
        }
		return success;
	}
	//获取用户表中的所有不重复所属部门字段
	public List<UserInfo> getAllOrgnization(Map<String,Object> paramMap){
		return usersMapper.getAllOrgnization(paramMap);
	}
}
