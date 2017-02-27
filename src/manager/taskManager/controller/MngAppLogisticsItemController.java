package manager.taskManager.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.taskManager.service.MngAppLogisticsItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;
@Controller
@RequestMapping("appLogisticsItem")
public class MngAppLogisticsItemController {
	@Autowired
	private MngAppLogisticsItemService appLogisticsItemService;
	@RequestMapping(value="/appLogisticsItembg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,appLogisticsItemService);
	}
}
