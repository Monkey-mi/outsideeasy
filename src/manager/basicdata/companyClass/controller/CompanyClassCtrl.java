package manager.basicdata.companyClass.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.basicdata.companyClass.service.CompanyClassService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("companyClass")
public class CompanyClassCtrl {

	@Autowired
	private CompanyClassService companyClassService;
	
	/**
	 *企业性质*/
	@RequestMapping(value="/companyClass.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,companyClassService);
	}
}
