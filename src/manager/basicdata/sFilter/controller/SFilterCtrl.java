package manager.basicdata.sFilter.controller;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import manager.basicdata.sFilter.service.SFilterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("sFilter")
public class SFilterCtrl {

	@Autowired
	private SFilterService sFilterService;
	
	/**
	 *过滤列表*/
	@RequestMapping(value="/sFilter.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> sFilterClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,sFilterService);
		
	}
}

