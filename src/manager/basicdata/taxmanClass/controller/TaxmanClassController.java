package manager.basicdata.taxmanClass.controller;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import manager.basicdata.taxmanClass.service.TaxmanClassService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;
@Controller
@RequestMapping("taxmanClass")
public class TaxmanClassController{
	@Autowired
	private TaxmanClassService taxmanClassService;
	
	//物料确认检测类目
	@RequestMapping(value="/TaxmanClass.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> taxmanClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,taxmanClassService);
	}
}
