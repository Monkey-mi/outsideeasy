
package manager.ipmanager.Controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.ipmanager.service.IpAddressService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("ipaddress")
public class IPAddressController {
	@Autowired
	private IpAddressService ipAddressService;
	@RequestMapping(value="/ipmanagerbg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> Modules(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,ipAddressService);
	}
	
	@RequestMapping(value="/getAllAccount.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getAllAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,ipAddressService);
	}
}
