package manager.basicdata.materialClass.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.basicdata.materialClass.service.MaterialClassService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("materialClass")
public class MaterialClassCtrl {

	@Autowired
	private MaterialClassService materialClassService;
	
	/**
	 *材料类别*/
	@RequestMapping(value="/materialClass.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,materialClassService);
	}
}
