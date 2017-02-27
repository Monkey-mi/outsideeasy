/**    
 * 文件名：PfCompetitorCtrl.java    
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

import platform.company.service.PfCompetitorService;

import util.Const;
import util.WebUtil;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfCompetitorCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-4-20 下午6:45:59    
 * 修改人：mishengliang    
 * 修改时间：2016-4-20 下午6:45:59    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfCompetitorCtrl")
public class PfCompetitorCtrl {
	@Autowired
	private PfCompetitorService service;
	
	/**
	 * 插入
	*insertCompetitor
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:02
	 */
	@RequestMapping(value="/insertCompetitor.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertCompetitor(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
	
	/**
	 * 单条删除设备记录
	*deleteCompetitor
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:07
	 */
	@RequestMapping(value="/deleteCompetitor.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteCompetitor(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		String competitorIds = request.getParameter("competitorIds"); 
		
		params.put("competitorIds", competitorIds);
		
		try {
			service.deleteCompetitor(params);//删除竞争记录
			
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return resMap;
	}
	
	/**
	 * 更改
	*updateCompetitor
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:15
	 */
	@RequestMapping(value="/updateCompetitor.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateCompetitor(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
}
