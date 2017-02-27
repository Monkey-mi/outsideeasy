package manager.basicdata.level.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.basicdata.level.service.MaterialLevelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;
@Controller
@RequestMapping("materialLevel")
public class MaterialLevelCtrl {

	@Autowired
	private MaterialLevelService materialLevelService;
	
	/**
	 *材料采购登记*/
	@RequestMapping(value="/materialLevel.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialLevelService);
	}
}
