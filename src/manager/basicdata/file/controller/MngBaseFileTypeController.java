package manager.basicdata.file.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.basicdata.file.service.MngBaseFileTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("basefile")
public class MngBaseFileTypeController {
	@Autowired
	private MngBaseFileTypeService baseFileTypeService;
	
	/**
	 *文件类型列表*/
	@RequestMapping(value="/basefilebg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> sFilterClass(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,baseFileTypeService);
		
	}
}
