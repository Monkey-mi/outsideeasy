package manager.common.orgunit.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.orgunit.service.OrgUnitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("org")
public class OrgUnitController {
	@Autowired
	private OrgUnitService orgService;
	
	@RequestMapping(value="/OrgUnit.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orgService);
	}
}
