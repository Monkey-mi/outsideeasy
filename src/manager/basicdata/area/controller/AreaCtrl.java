package manager.basicdata.area.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.basicdata.area.service.AreaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("area")
public class AreaCtrl {
	@Autowired
	private AreaService areaService;
	
	/**
	 *省市区*/
	@RequestMapping(value="/area.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> tradeClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,areaService);
	}
}
