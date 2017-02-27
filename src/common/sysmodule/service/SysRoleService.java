package common.sysmodule.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.basicdata.sFilter.model.SFilter;
import manager.basicdata.sFilter.service.SFilterService;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.CacheData;

import common.sysmodule.data.SysRoleMapper;
import common.sysmodule.model.SysRole;
import common.sysmodule.model.SysRoleAuthority;
import common.sysmodule.model.SysRolePage;
import common.sysmodule.model.SysRolePageFunc;


@Service
public class SysRoleService {
	@Autowired
	private SysRoleMapper mapper;
	
	@Autowired
	private SFilterService service;


	public List<SysRole> getSysRoleList(Map<String,Object> params) {
		return mapper.getSysRoleList(params);
	}
	public void addSysRole(SysRole[] arr) {
		for(SysRole obj: arr) {
			mapper.addSysRole(obj);
		}
	}
	public void updateSysRole(SysRole[] arr) {
		for(SysRole obj: arr) {
			mapper.updateSysRole(obj);
		}
	}
	public void deleteSysRole(SysRole[] arr) {
		for(SysRole obj: arr) {
			mapper.deleteSysRole(obj);
		}
	}
	/**
	* @Description: 判断角色名称是否存在
	* @param  role_id role_name 
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2016-03-11
	*/
	public String checkrole_name(Map<String,Object> params){
		JSONObject json = new JSONObject();
		int count=mapper.getCountForRole_name(params);
		json.put("status", count==0);
		return json.toString();
	}
	public List<SysRoleAuthority> getSysRoleAuthorityList(Map<String,Object> params) {
		return mapper.getSysRoleAuthorityList(params);
	}
	public void addSysRoleAuthority(SysRoleAuthority[] arr) {
		for(SysRoleAuthority obj: arr) {
			mapper.addSysRoleAuthority(obj);
		}
	}
	public void updateSysRoleAuthority(SysRoleAuthority[] arr) {
		for(SysRoleAuthority obj: arr) {
			mapper.updateSysRoleAuthority(obj);
		}
	}
	public void deleteSysRoleAuthority(SysRoleAuthority[] arr) {
		for(SysRoleAuthority obj: arr) {
			mapper.deleteSysRoleAuthority(obj);
		}
	}
	/**
	* @Description: 获取游客可访问列表
	* @param  null
	* @author xufeng
	* @date 2016-03-11
	*/
	public List<String> getVisitorUrls(Map<String,Object> params){
		List<String> urllist=mapper.getVisitorPage(params);
		return urllist;
	}
	/**
	* @Description: 获取用户可访问列表
	* @param  role_id
	* @author xufeng
	* @date 2016-03-11
	*/
	public List<String> getUrlListByRole_id(Map<String,Object> params){
		List<String> urllist=mapper.getUrlListByRole_id(params);
		return urllist;
	}
	/**按照角色名获取角色对象**/
	public SysRole getSysRoleByName(Map<String,Object> params){
		return mapper.getSysRoleByName(params);
	}
	
	/*
	 * 角色页面关联表相关方法
	 * */
	public List<SysRolePage> getSysRolePageList(Map<String,Object> params) {
		return mapper.getSysRolePageList(params);
	}
	public void addSysRolePage(SysRolePage[] arr) {
		for(SysRolePage obj: arr) {
			mapper.addSysRolePage(obj);
		}
	}
	public void updateSysRolePage(SysRolePage[] arr) {
		for(SysRolePage obj: arr) {
			mapper.updateSysRolePage(obj);
		}
	}
	public void deleteSysRolePage(SysRolePage[] arr) {
		for(SysRolePage obj: arr) {
			mapper.deleteSysRolePage(obj);
		}
	}
	/*
	 * 角色页面功能关联表相关方法
	 * */
	public List<SysRolePageFunc> getSysRolePageFuncList(Map<String,Object> params) {
		return mapper.getSysRolePageFuncList(params);
	}
	public void addSysRolePageFunc(SysRolePageFunc[] arr) {
		for(SysRolePageFunc obj: arr) {
			mapper.addSysRolePageFunc(obj);
		}
	}
	public void updateSysRolePageFunc(SysRolePageFunc[] arr) {
		for(SysRolePageFunc obj: arr) {
			mapper.updateSysRolePageFunc(obj);
		}
	}
	public void deleteSysRolePageFunc(SysRolePageFunc[] arr) {
		for(SysRolePageFunc obj: arr) {
			mapper.deleteSysRolePageFunc(obj);
		}
	}
	
	/**
	 * 当前角色是否有某个页面下的功能权限
	 * @param params
	 * @return true or false
	 * @author yangliping
	 */
	public boolean hasRoleFuncAuth(Map<String,Object> params)
	{
		int count=mapper.getCountForRoleFuncAuth(params);
		return count>0;
	}
	
	/**
	 * @Description:当前角色是否有某个页面权限
	 * SysRoleService
	 * hasRolePageAuth
	 * @param params
	 * @return boolean
	 * @author yangliping
	 * 2016-8-11 下午1:18:36
	 */
	public boolean hasRolePageAuth(Map<String,Object> params)
	{
		int count=mapper.getCountForRolePageAuth(params);
		return count>0;
	}
	/**
	 * @Description:根据登录账号的role_id查询所有class_id
	 * SysRoleService
	 * getAllClassIdByRoleId
	 * @param params
	 * @return List<Integer>
	 * @author yukai
	 * 2016-9-26 上午9:18:38
	 */
	public List<Integer> getAllClassIdByRoleId(Map<String,Object> params){
		return	mapper.getAllClassIdByRoleId(params);
	}
	/**
	 * @Description:修改角色启用、禁用状态
	 * SysRoleService
	 * updateRoleStatus
	 * @param params void
	 * @author yukai
	 * 2016-11-7 上午9:42:26
	 */
	public void updateRoleStatus(Map<String,Object> params) {
			mapper.updateRoleStatus(params);
	}
	/**
	 * @Description:修改缓存中过滤列表
	 * SysRoleService
	 * updateSysFilter
	 * @param params void
	 * @author yukai
	 * 2017-1-20 上午10:34:07
	 */
	public void updateSysFilter(Map<String, Object> params) {
		CacheData cache=CacheData.getInstance();
		List<String> str_list=new ArrayList<String>();
		// 后端访问不受限的url
		List<SFilter> list = service
				.getSFilterList(new HashMap<String, Object>());

		for (SFilter sf : list) {
			str_list.add(sf.getFilter_url());
		}
		// 平台访问不受限的url
		List<String> plat_list = getVisitorUrls(params);
		// 合并
		str_list.addAll(plat_list);
		cache.put("SysFilter", str_list);
	}
}
