package usercenter.purchaseManage.purchaseCenter.controller;

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

import usercenter.purchaseManage.purchaseCenter.service.PurchaseCenterService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("purchaseCenterCtrl")
public class PurchaseCenterCtrl {
	@Autowired
	private PurchaseCenterService purchaseCenterService;
	
	/**
	 * @Description:跳转采购中心页面
	 * PurchaseCenterCtrl
	 * gojsp_purchaseCenter
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午10:35:55
	 */
	@RequestMapping(value = { "/purchaseCenter" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_purchaseCenter(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/purchaseCenter");
		return modelAndView;
	}
	
	
	/**
	 * @Description:获取所有采购中心页面数据
	 * PurchaseCenterCtrl
	 * getAllPurchaseInfo
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-12 下午3:41:44
	 */
	@RequestMapping(value="/getAllPurchaseInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAllPurchaseInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		Map<String, Object> purchaseInfoMap = purchaseCenterService.getAllPurchaseInfo(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, purchaseInfoMap);
		
		return respMap;
	}
	
	/**
	 * @Description:根据登录账号的role_id查询所有class_id
	 * PurchaseCenterCtrl
	 * getAllClassIdByRoleId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-26 上午9:39:07
	 */
	@RequestMapping(value="/getAllClassIdByRoleId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAllClassIdByRoleId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<Integer> list = purchaseCenterService.getAllClassIdByRoleId(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		
		return respMap;
	}
}
