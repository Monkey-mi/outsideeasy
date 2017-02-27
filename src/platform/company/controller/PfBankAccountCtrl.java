/**    
 * 文件名：PfBankAccountCtrl.java    
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

import com.mysql.jdbc.log.Log;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;

import platform.company.service.PfBankAccountService;
import usercenter.saleManage.model.AccessAccount;
import usercenter.saleManage.service.AccessAccountService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfBankAccountCtrl    
 * 创建人：mishengliang
 * 创建时间：2016-4-25 下午2:09:06    
 * 修改人：mishengliang    
 * 修改时间：2016-4-25 下午2:09:06    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfBankAccountCtrl")
public class PfBankAccountCtrl {
	@Autowired
	private PfBankAccountService service;
	@Autowired
	private AccessAccountService asService;
	/**
	 * 插入
	*insertBankAccount
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-25下午2:14:24
	 */
	@RequestMapping(value="/insertBankAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> insertBankAccount(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			service.addBankAccount(qryParam);
			respMap.put("success", true);
		} catch (Exception e) {
			respMap.put("success", false);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return respMap;
	}
	
	/**
	 * 删除
	*deleteBankAccount
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-25下午2:14:38
	 */
	@RequestMapping(value="/deleteBankAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteBankAccount(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		Integer bankAccountId = Integer.parseInt(request.getParameter("bankAccountId")); 
		
		params.put("accountId", bankAccountId);
		
		try {
			service.deleteBankAccount(params);//删除产品记录
			
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
	@RequestMapping(value="/updateBankAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateBankAccount(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			service.updateBankAccountByAccountId(qryParam);
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
	
	/**判断银行账号是否使用
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/checkBankUsed.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> checkBankUsed(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessAccount> list=asService.getAccessAccountList(qryParam);
		if (list.size()>0){
			respMap.put(Const.AJAX_DATA_ROOT, true);
		}else {
			respMap.put(Const.AJAX_DATA_ROOT, false);
		}
		return respMap;
	}	
	/**
	 * @Description:删除多个银行账号
	 * PfBankAccountCtrl
	 * deleteBankAccount
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-5 上午10:27:36
	 */
	@RequestMapping(value="/deleteBankAccounts.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> deleteBankAccounts(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		service.deleteBankAccounts(qryParam);
		return respMap;
	}
}
