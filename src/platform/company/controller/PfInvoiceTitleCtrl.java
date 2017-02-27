/**    
 * 文件名：PfInvoiceTitleCtrl.java    
 *    
 * 版本信息：    
 * 日期：2016-4-25    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;

import platform.company.service.PfInvoiceTitleService;

import usercenter.saleManage.model.AccessInvoiceTitle;
import usercenter.saleManage.service.AccessInvoiceTitleService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfInvoiceTitleCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-4-25 下午2:09:58    
 * 修改人：mishengliang    
 * 修改时间：2016-4-25 下午2:09:58    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfInvoiceTitleCtrl")
public class PfInvoiceTitleCtrl {
	@Autowired
	private PfInvoiceTitleService service;
	@Autowired
	private AccessInvoiceTitleService aService;
	/**
	 * 插入
	*insertInvoiceTitle
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-25下午2:14:24
	 */
	@RequestMapping(value="/insertInvoiceTitle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertInvoiceTitle(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			service.addInvoiceTitle(qryParam);
			respMap.put("success", true);
		} catch (Exception e) {
			respMap.put("success", false);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return respMap;
	}
	
	/**
	 * 删除
	*deleteInvoiceTitle
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-25下午2:14:38
	 */
	@RequestMapping(value="/deleteInvoiceTitle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteInvoiceTitle(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		Integer invoiceTitleId = Integer.parseInt(request.getParameter("invoiceTitleId")); 
		
		params.put("invoiceTitleId", invoiceTitleId);
		
		try {
			service.deleteInvoiceTitle(params);//删除产品记录
			
			resMap.put("success", true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return resMap;
	}
	
	/**
	 * 更新
	*updateBankAccount
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-25下午2:14:47
	 */
	@RequestMapping(value="/updateInvoiceTitle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateInvoiceTitle(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			service.updateInvoiceTitleByTitleId(qryParam);
			respMap.put("success", true);
		} catch (Exception e) {
			respMap.put("success", false);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return respMap;
	}	
	

	/**重置默认标记
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/resetDefaultId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> resetDefaultId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			service.resetDefaultId(qryParam);
			respMap.put("success", true);
		} catch (Exception e) {
			respMap.put("success", false);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return respMap;
	}	
	/**判断发票抬头是否使用
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/checkInvoiceUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> checkInvoiceUsed(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessInvoiceTitle> list=aService.getAccessInvoiceTitleList(qryParam);
		if (list.size()>0){
			respMap.put(Const.AJAX_DATA_ROOT, true);
		}else {
			respMap.put(Const.AJAX_DATA_ROOT, false);
		}
		return respMap;
	}	
	
	/**
	 * @Description:删除多个发票抬头
	 * PfInvoiceTitleCtrl
	 * deleteBankAccount
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-5 上午10:27:36
	 */
	@RequestMapping(value="/deleteInvoiceTitles.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteInvoiceTitles(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		service.deleteInvoiceTitles(qryParam);
		return respMap;
	}
}
