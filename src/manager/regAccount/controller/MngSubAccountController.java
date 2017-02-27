
package manager.regAccount.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.regAccount.service.MngSubAccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("mngsubAccount")
public class MngSubAccountController {
	@Autowired
	private MngSubAccountService mngSubAccountService;
	/**
	 * 后台对子账户账号的管理
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 */
	@RequestMapping(value="/reAccountServiceBg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> regAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngSubAccountService);
	}
	
}
