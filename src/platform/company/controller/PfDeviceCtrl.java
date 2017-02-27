/**    
 * 文件名：PfDeviceCtrl.java    
 *    
 * 版本信息：    
 * 日期：2016-4-20    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import platform.company.service.PfDeviceService;
import util.Const;
import util.WebUtil;

/**    
 * 设备
 * 项目名称：outsideeasy    
 * 类名称：PfDeviceCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-4-20 下午3:27:03    
 * 修改人：mishengliang    
 * 修改时间：2016-4-20 下午3:27:03    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfDeviceCtrl")
public class PfDeviceCtrl {
	@Autowired
	private PfDeviceService service;
	
	/**
	 * 插入
	*insertDevice
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:02
	 */
	@RequestMapping(value="/insertDevice.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertDevice(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
	
	/**
	 * 单条删除设备记录
	*deleteDevice
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:07
	 */
	@RequestMapping(value="/deleteDevice.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteDevice(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		Integer deviceId = Integer.parseInt(request.getParameter("deviceId")); 
		
		params.put("deviceId", deviceId);
		
		try {
			service.deleteDevice(params);//删除设备记录
			
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "faile");
		}
		return resMap;
	}
	
	/**
	 * @Description: 批量删除设备
	 * PfDeviceCtrl
	 * deleteDevices
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-10-25 下午6:17:21
	 */
	@RequestMapping(value="/deleteDevices.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteDevices(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = WebUtil.getDefaultParamsMap(request);
		try {
			service.deleteDevices(params);//删除设备记录
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "faile");
		}
		return resMap;
	}
	
	/**
	 * 更改
	*updateDevice
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:15
	 */
	@RequestMapping(value="/updateDevice.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateDevice(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
}
