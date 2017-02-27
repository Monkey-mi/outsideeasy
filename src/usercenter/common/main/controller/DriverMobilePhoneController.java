package usercenter.common.main.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.common.main.model.DriverMobilePhone;
import usercenter.common.main.service.DriverMobilePhoneService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping(value="driverMobilePhone")
public class DriverMobilePhoneController {
	@Autowired
	private DriverMobilePhoneService driverMobilePhoneService;
	/**
	 * 增加一个司机、手机号信息
	* @Description:
	* DriverMobilePhoneController
	* addDriverMobilePhone
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-5 下午3:18:41
	 */
	@RequestMapping(value="/addDriverMobilePhone.do")
	@ResponseBody 
	public Map<String, Object> addDriverMobilePhone(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean flag = driverMobilePhoneService.addDriverMobilePhone(qryParam);
		respMap.put(Const.AJAX_COMPLETE_MSG, Const.AJAX_SERVICE_SUCCESS);
		respMap.put(Const.AJAX_DATA_ROOT, flag);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;		
	}
	/**
	 *  查询司机手机号的列表
	* @Description:
	* DriverMobilePhoneController
	* addDriverMobilePhone
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-5 下午3:18:41
	 */
	@RequestMapping(value="/getDriverMobilePhoneList.do")
	@ResponseBody 
	public Map<String, Object> getDriverMobilePhoneList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		 List<DriverMobilePhone>  list = driverMobilePhoneService.getDriverMobilePhoneList(qryParam);
		 respMap.put(Const.AJAX_DATA_ROOT, list);
		 respMap.put(Const.AJAX_COMPLETE_MSG, Const.AJAX_SERVICE_SUCCESS);
		 respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		 return respMap;		
	}
	/**
	 *  验证添加的是否重复
	* @Description:
	* DriverMobilePhoneController
	* addDriverMobilePhone
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-6 下午3:18:41
	 */
	@RequestMapping(value="/regDriverMobilePhone.do")
	@ResponseBody 
	public Map<String, Object> regDriverMobilePhone(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		 boolean flag = driverMobilePhoneService.regDriverMobilePhone(qryParam);
		 respMap.put(Const.AJAX_DATA_ROOT, flag);
		 respMap.put(Const.AJAX_COMPLETE_MSG, Const.AJAX_SERVICE_SUCCESS);
		 respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		 return respMap;		
	}
	/**
	 * 更新司机手机号，是否禁用
	* @Description:
	* DriverMobilePhoneController
	* updateDriverMobilePhone
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-6 下午5:35:58
	 */
	@RequestMapping(value="/updateDriverMobilePhone.do")
	@ResponseBody 
	public Map<String, Object> updateDriverMobilePhone(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		 boolean flag = driverMobilePhoneService.updateDriverMobilePhone(qryParam);
		 respMap.put(Const.AJAX_COMPLETE_MSG, Const.AJAX_SERVICE_SUCCESS);
		 respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		 respMap.put(Const.AJAX_DATA_ROOT, flag);
		 return respMap;		
	}
}
