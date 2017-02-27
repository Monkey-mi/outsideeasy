/**    
 * 文件名：PfGoodsCtrl.java    
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

import platform.company.service.PfGoodsService;

import util.Const;
import util.WebUtil;

/**    
 * 产品
 * 项目名称：outsideeasy    
 * 类名称：PfGoodsCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-4-20 下午3:27:38    
 * 修改人：mishengliang
 * 修改时间：2016-4-20 下午3:27:38    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfGoodsCtrl")
public class PfGoodsCtrl {
	@Autowired
	private PfGoodsService service;

	/**
	 * 插入
	*insertGoods
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:02
	 */
	@RequestMapping(value="/insertGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertGoods(HttpServletRequest request,HttpServletResponse response){
		return null;
	}
	
	/**
	 * 删除
	*deleteGoods
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:07
	 */
	@RequestMapping(value="/deleteGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteGoods(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		Integer goodsId = Integer.parseInt(request.getParameter("goodsId")); 
		params.put("goodsId", goodsId);
		try {
			service.deleteGoods(params);//删除产品记录
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "faile");
		}
		return resMap;
	}
	@RequestMapping(value="/deleteGoodss.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteGoodss(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> paramsMap =  WebUtil.getDefaultParamsMap(request);
		try {
			service.deleteGoodss(paramsMap);//删除产品记录
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
	*updateGoods
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-20下午3:39:15
	 */
	@RequestMapping(value="/updateGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateGoods(HttpServletRequest request,HttpServletResponse response){
		return null;
	}	
	
}
