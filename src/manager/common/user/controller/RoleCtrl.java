package manager.common.user.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.user.model.Role;
import manager.common.user.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("role")
public class RoleCtrl {
	@Autowired
	private RoleService roleService;
	//获取角色列表
  	@RequestMapping(value="/getRoleList.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> getRoleList(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
  		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
  		List<Role> list=roleService.getRoleList(qryParam);
  		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
  		respMap.put(Const.AJAX_DATA_ROOT, list);
  		return respMap;
  	}
  	//新增角色
  	@RequestMapping(value="/addRole.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> addRole(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
  		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
  		Role role=new Role();
  		
  		if(WebUtil.isEmpty(qryParam.get("role_name"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "角色名为空");
			return respMap;
		}
  		role.setRole_name(qryParam.get("role_name").toString());
  		role.setRole_desc(WebUtil.isEmpty(qryParam.get("role_desc"))?"":qryParam.get("role_desc").toString());
  		role.setOrder_seq(WebUtil.isEmpty(qryParam.get("order_seq"))?0:Integer.valueOf(qryParam.get("order_seq").toString()));
  		role.setOu_code("");
  		roleService.addRole(role);
  		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
  		respMap.put(Const.AJAX_DATA_ROOT, role);
  		return respMap;
  	}
  	//修改角色
  	@RequestMapping(value="/updateRole.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> updateRole(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
  		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
  		Role role=new Role();
  		if(WebUtil.isEmpty(qryParam.get("role_id"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "编号为空");
			return respMap;
		}
  		role.setRole_name(qryParam.get("role_name").toString());
  		role.setRole_id(Integer.valueOf(qryParam.get("role_id").toString()));
  		role.setRole_desc(WebUtil.isEmpty(qryParam.get("role_desc"))?"":qryParam.get("role_desc").toString());
  		role.setOrder_seq(WebUtil.isEmpty(qryParam.get("order_seq"))?0:Integer.valueOf(qryParam.get("order_seq").toString()));
  		roleService.updateRole(role);
  		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
  		respMap.put(Const.AJAX_DATA_ROOT, role);
  		return respMap;
  	}
  	//删除角色
  	@RequestMapping(value="/delrole.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> delrole(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
  		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
  		Role role=new Role();
  		if(WebUtil.isEmpty(qryParam.get("role_id"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "编号为空");
			return respMap;
		}
  		role.setRole_id(Integer.valueOf(qryParam.get("role_id").toString()));
  		roleService.deleteRole(role,respMap);
  		return respMap;
  	}
}
