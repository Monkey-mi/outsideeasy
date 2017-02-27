
package manager.templet.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.templet.service.MngAccessTempletElementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping(value="mngAccessTempletElement")
public class MngAccessTempletElementController {
	@Autowired
	private MngAccessTempletElementService mngAccessTempletElementService;
	@RequestMapping(value="/mngAccessTempletElementbg.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,mngAccessTempletElementService);
	}

}
