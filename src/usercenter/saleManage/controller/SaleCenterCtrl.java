package usercenter.saleManage.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import usercenter.common.communication.model.AppCommunication;
import usercenter.externalTask.TaskResponse.AllStateVo;
import usercenter.externalTask.model.Task;
import usercenter.saleManage.deliveryManage.model.QualityFeedbackDetail;
import usercenter.saleManage.model.CheckfactoryReport;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.saleManage.model.Materialcheck;
import usercenter.saleManage.response.CountOfAccessState;
import usercenter.saleManage.service.SaleCenterService;
import usercenter.saleManage.tradeManager.model.OrderDeliveryNotice;
import usercenter.saleManage.tradeManager.model.PurchaseOrder;
import usercenter.saleManage.tradeManager.response.StateCountsVo;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("saleCenterCtrl")
public class SaleCenterCtrl {
	@Autowired
	private SaleCenterService service;
	
	@RequestMapping(value = { "/saleCenter" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_saleCenter(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/saleCenter");
		return modelAndView;
	}
	
	/**
	 * 获取最新三条质检反馈信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAllSaleCenterInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAllSaleCenterInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> saleCenterInfoMap =service.getAllSaleCenterInfo(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, saleCenterInfoMap);
		return respMap;
	}
	/**
	 * @Description:获取最新三条订单留言回复
	 * SaleCenterCtrl
	 * getLastThreeAppCommunication
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-7 下午4:39:25
	 */
	@RequestMapping(value="/getLastThreeOrderAppCommunication.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getLastThreeOrderAppCommunication(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AppCommunication> list =service.getLastThreeOrderAppCommunication(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:获取最新三条订单留言回复
	 * SaleCenterCtrl
	 * getLastThreeAppCommunication
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-7 下午4:39:25
	 */
	@RequestMapping(value="/getLastThreeTaskrAppCommunication.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getLastThreeTaskrAppCommunication(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AppCommunication> list =service.getLastThreeTaskrAppCommunication(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:删除留言插入账号与留言删除关系表
	 * SaleCenterCtrl
	 * getLastThreeAppCommunication
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-7 下午5:27:22
	 */
	@RequestMapping(value="/addAccountCommunDel.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccountCommunDel(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		service.addAccountCommunDel(qryParam);
		return respMap;
	}
}
