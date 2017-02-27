package usercenter.common.main.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.common.main.model.LicensePlate;
import usercenter.common.main.service.LicensePlateService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping(value="licensePlate")
public class LicensePlateController {
	@Autowired
	private LicensePlateService licensePlateService;
	/**
	 * 增加一个车牌
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
	@RequestMapping(value="/addLicensePlate.do")
	@ResponseBody 
	public Map<String, Object> addLicensePlate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean flag = licensePlateService.addLicensePlate(qryParam);
		respMap.put(Const.AJAX_COMPLETE_MSG, Const.AJAX_SERVICE_SUCCESS);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, flag);
		return respMap;		
	}
	/**
	 * 获得车牌的维护列表
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
	@RequestMapping(value="/getLicensePlateList.do")
	@ResponseBody 
	public Map<String, Object> getLicensePlateList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<LicensePlate> list = licensePlateService.getLicensePlateList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;		
	}
	/**
	 * 验证一个车牌
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
	@RequestMapping(value="/regLicensePlate.do")
	@ResponseBody 
	public Map<String, Object> regLicensePlate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean flag = licensePlateService.regLicensePlate(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,flag);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;		
	}
	/**
	 * 更新一个车牌信息
	* @Description:
	* LicensePlateController
	* updateLicensePlate
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-6 下午4:32:12
	 */
	@RequestMapping(value="/updateLicensePlate.do")
	@ResponseBody 
	public Map<String, Object> updateLicensePlate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean flag = licensePlateService.updateLicensePlate(qryParam);
		respMap.put(Const.AJAX_COMPLETE_MSG, Const.AJAX_SERVICE_SUCCESS);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, flag);
		return respMap;		
	}
}
