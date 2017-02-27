/**
 *outsideeasyplatform.common.main.controllerCommon.java
 *	2016-3-15下午8:03:16
 * mishengliang
 */
package common.user.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.user.model.UserInfo;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

import common.model.MenuModel;
import common.sysmodule.service.SysFunctionClassService;
import common.sysmodule.service.SysRoleService;
import common.user.model.LoginAccount;

/**
 * @author mishengliang
 *
 */
@Controller
@RequestMapping("plateFormCommon")
public class PlateFormCommon {
	@Autowired
	private SysRoleService sysRoleService;
	
	@Autowired
	private SysFunctionClassService sysFunctionClassService;
	
    
    /**
     * @Description: 判断是否登录 取代checkLoginForPlateForm方法
     * PlateFormCommon
     * isLoginForPlateForm
     * @param request
     * @param response
     * @return
     * @throws Exception String
     * @author mishengliang
     * 2016-8-12 下午2:47:56
     */
    @RequestMapping(value="/isLoginForPlateForm.do",method = RequestMethod.POST)
    @ResponseBody
    public String isLoginForPlateForm(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
    	JSONObject jsonRegAccout = JSONObject.fromObject(loginAccount);
    	if(loginAccount != null){
    		json.put("data",jsonRegAccout.toString());
    		json.put("success", 1);
    		json.put("ajaxErrorCode", 200);
    	}else{
    		json.put("success", 0);
    	}
    	return json.toString();
    }
    
    /**
     * 用户注销,内外网使用同一个session，注销也是一起注销
     *2016-3-16下午3:49:43
     *doLogout
     *return:Map<String,Object>
     * mishengliang
     */
    @DocLogger(explain="前台退出")
	@RequestMapping(value="/doLogout.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> doLogout(HttpServletRequest request,HttpServletResponse response)throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		UserInfo userInfo = (UserInfo)SessionUtil.getAttribute(Const.SESSION_USER);
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		
		if(loginAccount!=null){
			SessionUtil.removeAllAttributes(Const.SESSION_PLATFORM_LOGIN_USER);
			//保存当前登录用户信息到session中，key：platform_user			
			SessionUtil.removeAttribute(Const.SESSION_PLATFORM_USER);
			SessionUtil.removeAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
			SessionUtil.removeAttribute(Const.SESSION_URL_LIST);
			if(userInfo==null){
			SessionUtil.removeAttribute(Const.LOGIN_TYPE);
			SessionUtil.removeAttribute(Const.SESSION_IP);
			}
		}
		return respMap;
	}
	
	/**
	 * 检验验证码是否匹配
	*vcodeJudge
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-18下午4:00:31
	 */
	@RequestMapping(value="/vcodeJudge.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> vcodeJudge(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		String vcodeFromPage = request.getParameter("vcode");
		String vcodeFromSession = (String) SessionUtil.getAttribute("verify_code");
		
		if(!vcodeFromPage.equalsIgnoreCase(vcodeFromSession)){//验证码是否匹配
			respMap.put("statu", false);
		}else{
			respMap.put("statu", true);
		}
		
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_200_OK);
		respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		
		return respMap;
	}
	
	/**
	 * 判断当前用户所属角色是否有某个页面下某个功能按钮权限
	 * @param role_id:角色ID;func_code:功能代码，如add_btn;page_path:当前页面路径
	 * @return true or false
	 * @author 杨丽平
	 * @date 2016-7-25 10:31:35
	 */
	@RequestMapping(value="/hasRoleFuncAuth.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> hasRoleFuncAuth(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> reqtMap=WebUtil.getDefaultParamsMap(request);
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		//注册账号role_id存在loginAccount.getRole_id()中，而子账号的role_id是多个的，存在loginAccount.getSubRoles()中
		String roleIdsStr="";
		if(loginAccount.getRole_id()>0)
		{
			roleIdsStr=String.valueOf(loginAccount.getRole_id());
		}
		
		if(loginAccount.getSubRoles()!=null)
		{
			List<Integer> roleIds=loginAccount.getSubRoles();
			if(roleIds.size()>0)
			{
				if(!roleIdsStr.equals(""))
				{
					roleIdsStr=roleIdsStr.concat(",");
				}
				roleIdsStr=roleIdsStr.concat(StringUtils.join(roleIds.toArray(),","));
				
			}
		}
		roleIdsStr=roleIdsStr.concat(",4");
		reqtMap.put("role_id",roleIdsStr);
		
		boolean hasAuth=sysRoleService.hasRoleFuncAuth(reqtMap);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		if(hasAuth)
		{
			respMap.put("data",true);
			respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
		}
		else
		{
			respMap.put("data",false);
			respMap.put(Const.AJAX_SERVICE_TOTAL, 0);
		}
		
		return respMap;
	}
	/**
	 * 
	 * @Description:获取某个角色是否有某张页面的权限
	 * PlateFormCommon
	 * hasRolePageAuth
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yangliping
	 * 2016-8-11 下午1:20:16
	 */
	@RequestMapping(value="/hasRolePageAuth.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> hasRolePageAuth(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> reqtMap=WebUtil.getDefaultParamsMap(request);
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		
		//注册账号role_id存在loginAccount.getRole_id()中，而子账号的role_id是多个的，存在loginAccount.getSubRoles()中
		String roleIdsStr="";
		if(loginAccount.getRole_id()>0)
		{
			roleIdsStr=String.valueOf(loginAccount.getRole_id());
		}
		
		if(loginAccount.getSubRoles()!=null)
		{
			List<Integer> roleIds=loginAccount.getSubRoles();
			if(roleIds.size()>0)
			{
				if(!roleIdsStr.equals(""))
				{
					roleIdsStr=roleIdsStr.concat(",");
				}
				roleIdsStr=roleIdsStr.concat(StringUtils.join(roleIds.toArray(),","));
			}
		}
		roleIdsStr=roleIdsStr.concat(",4");
		reqtMap.put("role_id",roleIdsStr);
		//reqtMap.put("role_id", loginAccount.getRole_id());
		boolean hasAuth=sysRoleService.hasRolePageAuth(reqtMap);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		if(hasAuth)
		{
			respMap.put("data",true);
			respMap.put(Const.AJAX_SERVICE_TOTAL, 1);
		}
		else
		{
			respMap.put("data",false);
			respMap.put(Const.AJAX_SERVICE_TOTAL, 0);
		}
		
		return respMap;
	}
	/**
	 * 
	 * @Description:获取当前用户系统授权菜单
	 * PlateFormCommon
	 * getSysAuthMenus
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yangliping
	 * 2016-8-11 下午4:38:45
	 */
	@RequestMapping(value="/getSysAuthMenus.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSysAuthMenus(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> reqtMap=WebUtil.getDefaultParamsMap(request);
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		//注册账号role_id存在loginAccount.getRole_id()中，而子账号的role_id是多个的，存在loginAccount.getSubRoles()中
		String roleIdsStr="";
		
		if(loginAccount.getRole_id()>0)
		{
			roleIdsStr=String.valueOf(loginAccount.getRole_id());
		}
		
		if(loginAccount.getSubRoles()!=null)
		{
			List<Integer> roleIds=loginAccount.getSubRoles();
			if(roleIds.size()>0)
			{
				if(!roleIdsStr.equals(""))
				{
					roleIdsStr=roleIdsStr.concat(",");
				}
				roleIdsStr=roleIdsStr.concat(StringUtils.join(roleIds.toArray(),","));
				
			}
		}
		
		//reqtMap.put("role_id", loginAccount.getRole_id());
		roleIdsStr=roleIdsStr.concat(",4");
		reqtMap.put("role_id", roleIdsStr);
		
		List<MenuModel> menus=sysFunctionClassService.getSysAuthMenus(reqtMap);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		if(menus.size()>0)
		{
			respMap.put(Const.AJAX_SERVICE_TOTAL, menus.size());
			respMap.put("data", menus);
		}
		else
		{
			respMap.put(Const.AJAX_SERVICE_TOTAL, 0);
		}
		return respMap;
	}
	
}
