package manager.taskManager.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import manager.taskManager.service.MngAppTaskBomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;
@Controller
@RequestMapping("appTaskBom")
public class MngAppTaskBomController {
	@Autowired
	private MngAppTaskBomService appTaskBomService;
	@RequestMapping(value="/appTaskBombg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,appTaskBomService);
	}
}
