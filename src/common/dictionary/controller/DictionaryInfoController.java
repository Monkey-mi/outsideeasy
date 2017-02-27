
package common.dictionary.controller;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

import common.dictionary.service.DictionaryInfoService;

@Controller
@RequestMapping(value="DictionaryInfo")
public class DictionaryInfoController {
	@Autowired
	private DictionaryInfoService  dictionaryInfoService;
	@RequestMapping(value="/mngAccessTempletbg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,dictionaryInfoService);
	}
}
