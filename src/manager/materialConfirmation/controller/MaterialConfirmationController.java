package manager.materialConfirmation.controller;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import manager.materialConfirmation.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import util.WebUtil;

@Controller
@RequestMapping("materialConfirmation")
public class MaterialConfirmationController{
	@Autowired
	private MaterialCheckclassService materialCheckclassService;
	@Autowired
	private MaterialCheckDetailService materialCheckDetailService;
	@Autowired
	private MaterialConfirmationService materialConfirmationService;
	@Autowired
	private MaterialSampleService materialSampleService;
	
	
	//物料确认检测类目
	@RequestMapping(value="/MaterialCheckclass.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesMaterialCheckclass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialCheckclassService);
	}
	
	//物料检测确认明细表
	@RequestMapping(value="/MaterialCheckDetail.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesMaterialCheckDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialCheckDetailService);
	}
	//物料确认主表
	@RequestMapping(value="/MaterialConfirmation.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialConfirmationService);
	}
	//物料确认明细表
	@RequestMapping(value="/MaterialSample.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> ModulesSample(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialSampleService);
	}
}