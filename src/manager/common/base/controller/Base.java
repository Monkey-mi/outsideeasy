package manager.common.base.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.base.service.CodeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

/**
 * ClassName: Base
 * @Description: 基础数据控制类
 * @author 华慧
 * @date 2015-9-7
 */
@Controller
@RequestMapping("base")
public class Base {
	@Autowired
	private CodeService codeService;
	@RequestMapping(value="/Codes.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Code(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,codeService);
	}
	@RequestMapping(value="/CodeCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> CodeCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCheck(request, response, codeService);
	}
}
