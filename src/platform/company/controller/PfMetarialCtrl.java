/**    
 * 文件名：PfMetarialCtrl.java    
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

import platform.company.service.PfMetarialService;
import util.Const;
import util.WebUtil;

/**    
 * 原材料    
 * 项目名称：outsideeasy    
 * 类名称：PfMetarialCtrl    
 * 创建人：mishengliang
 * 创建时间：2016-4-20 下午3:29:01    
 * 修改人：mishengliang    
 * 修改时间：2016-4-20 下午3:29:01    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfMetarialCtrl")
public class PfMetarialCtrl {
	@Autowired
	private PfMetarialService service; 
	
	/**
	 * 插入
	*insertMetarial
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:02
	 */
	@RequestMapping(value="/insertMetarial.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertMetarial(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
	
	/**
	 * 删除
	*deleteMetarial
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:07
	 */
	@RequestMapping(value="/deleteMetarial.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteMetarial(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		Integer metarialId = Integer.parseInt(request.getParameter("metarialId")); 
		params.put("metarialId", metarialId);
		try {
			service.deleteMetarial(params);//删除单条原材料记录
			
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "faile");
		}
		return resMap;
	}
	@RequestMapping(value="/deleteMetarials.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteMetarials(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> paramsMap = WebUtil.getDefaultParamsMap(request);
		try {
			service.deleteMetarials(paramsMap);//删除单条原材料记录
			
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
	*updateMetarial
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:15
	 */
	@RequestMapping(value="/updateMetarial.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateMetarial(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
}
