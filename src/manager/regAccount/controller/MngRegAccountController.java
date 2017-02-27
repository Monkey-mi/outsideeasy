
package manager.regAccount.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.regAccount.service.MngRegAccoutService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import common.model.LoginUser;

import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("mngregAccount")
public class MngRegAccountController {
	@Autowired
	private MngRegAccoutService mngRegAccoutService;
	/**
	 * 后台对主账号的管理
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 */
	@RequestMapping(value="/reAccountServiceBg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> regAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngRegAccoutService);
	}
	/**
	 * 后台对在线账户的管理
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-7-20
	 */
	@RequestMapping(value="/getAccountCountBg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getAccountCount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<LoginUser> list = mngRegAccoutService.getAccountCount(qryParam);		
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, list.size());
		return respMap;
	}
	/**
	 * 后台对在线账户的人数
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-7-20
	 */
	@RequestMapping(value="/getAccountCount2Bg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getAccountCount2(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String str = mngRegAccoutService.getAccountCount2(qryParam);		
		respMap.put(Const.AJAX_DATA_ROOT, str);
		return respMap;
	}
	
	/**
	 * 后台对在线账户的强制下线
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-7-20
	 */
	@RequestMapping(value="/OutlineBg.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> Outline(HttpServletRequest request,HttpServletResponse response) throws Exception{		
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("session_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的用户为空");
			return respMap;
		}
		mngRegAccoutService.updateOutline(qryParam);	
		respMap.put(Const.AJAX_DATA_ROOT, "success");
		return respMap;
	}
}
