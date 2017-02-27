package manager.sysmodule.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

import common.sysmodule.service.SysFunctionClassService;
import common.sysmodule.service.SysRoleService;
import common.sysmodule.service.WsIdentityService;


@Controller
@RequestMapping("sysmodule")
public class SysCtrl {

	@Autowired
	private SysFunctionClassService sysFunctionClassService;
	@Autowired
	private SysRoleService sysRoleService;
	@Autowired
	private WsIdentityService wsIdentityService;
	
	
	
	
	//业务分类
	@RequestMapping(value="/sysFunctionClass.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> sysFunctionClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,sysFunctionClassService);
	}
	//角色控制
	@RequestMapping(value="/sysRole.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> sysRole(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,sysRoleService);
	}
	//webservice身份
	@RequestMapping(value="/wsIdentity.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> wsIdentity(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,wsIdentityService);
	}
	
}
