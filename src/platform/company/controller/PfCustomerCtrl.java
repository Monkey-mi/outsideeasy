/**    
 * 文件名：PfCustomerCtrl.java    
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

import platform.company.service.PfMainCustomerService;
import util.Const;
import util.WebUtil;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfCustomerCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-4-20 下午6:45:17    
 * 修改人：mishengliang
 * 修改时间：2016-4-20 下午6:45:17    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfCustomerCtrl")
public class PfCustomerCtrl {
	@Autowired
	private PfMainCustomerService service;
	
	/**
	 * 插入
	*insertCustomer
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:02
	 */
	@RequestMapping(value="/insertCustomer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertCustomer(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
	
	/**
	 * 单条删除设备记录
	*deleteCustomer
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:07
	 */
	@RequestMapping(value="/deleteCustomer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteCustomer(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		String customerIds = request.getParameter("customerIds"); 
		
		params.put("customerIds", customerIds);//将多条记录传到service
		
		try {
			service.deleteCustomer(params);//删除客户记录
			
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
		}
		return resMap;
	}
	
	/**
	 * 更改
	*updateCustomer
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:15
	 */
	@RequestMapping(value="/updateCustomer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateCustomer(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
}
