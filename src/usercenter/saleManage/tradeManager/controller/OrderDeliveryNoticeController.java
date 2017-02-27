package usercenter.saleManage.tradeManager.controller;

import java.util.ArrayList;
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

import usercenter.saleManage.tradeManager.response.OrderDeleveryNoticeVo;
import usercenter.saleManage.tradeManager.response.OrderDeliveryNoticeInfo;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVo;
import usercenter.saleManage.tradeManager.service.OrderDeliveryNoticeService;
import usercenter.saleManage.tradeManager.service.OrderDeliveryNoticedetailsService;

import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("orderDeliveryNotice")
public class OrderDeliveryNoticeController {
	@Autowired
    private OrderDeliveryNoticeService orderDeliveryNoticeService;
	@Autowired
	private OrderDeliveryNoticedetailsService orderDeliveryNoticedetailsService;
	
	@RequestMapping(value = { "/deliveryNotifyDetailSale/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_deliveryNotifyDetailSale(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/deliveryManage/deliveryNotifyDetailSale");
		return modelAndView;
	}
	@RequestMapping(value = { "/deliveryNotifySale" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_deliveryNotifySale(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/deliveryManage/deliveryNotifySale");
		return modelAndView;
	}
	@RequestMapping(value = { "/deliveryNotifyDetailPurchase/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_deliveryNotifyDetailPurchase(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/deliveryManage/deliveryNotifyDetailPurchase");
		return modelAndView;
	}
	@RequestMapping(value = { "/deliveryNotifyPurchase" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_deliveryNotifyPurchase(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/deliveryManage/deliveryNotifyPurchase");
		return modelAndView;
	}
	
	/**
	 * 查询出送货通知
	* @Description:
	* OrderDeliveryNoticeController
	* getOrderDeliveryNoticeList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-25 下午2:11:07
	 */
	@RequestMapping(value="/getOrderDeliveryNoticeList.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderDeliveryNoticeList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		List<OrderDeleveryNoticeVo> list = orderDeliveryNoticeService.getOrderDeliveryNoticeList(qryParam);
		Integer count = orderDeliveryNoticeService.getOrderDeliveryNoticeListCount(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, count);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 查询所有通知明细
	* @Description:
	* OrderDeliveryNoticeController
	* getOrderDeliveryNoticeList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-25 下午2:11:07
	 */
	@RequestMapping(value="/getOrderDeliveryNoticedetailsListAll.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderDeliveryNoticedetailsListAll(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("delivery_notice_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定通知！联系管理员");
			return respMap;
		}	
		List<OrderDeliveryVo>  list = orderDeliveryNoticedetailsService.getOrderDeliveryNoticedetailsListAll(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 查询出送货通知
	* @Description:
	* OrderDeliveryNoticeController
	* getOrderDeliveryNoticeList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-25 下午2:11:07
	 */
	@RequestMapping(value="/getOrderDeliveryNoticeListForOut.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderDeliveryNoticeListForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		List<OrderDeleveryNoticeVo> list = orderDeliveryNoticeService.getOrderDeliveryNoticeList(qryParam);
		Integer count = orderDeliveryNoticeService.getOrderDeliveryNoticeListCount(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, count);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 查询出送货通知
	* @Description:
	* OrderDeliveryNoticeController
	* getOrderDeliveryNoticeList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-25 下午2:11:07
	 */
	@RequestMapping(value="/getOrderDeliveryNoticeListInfo.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderDeliveryNoticeListInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0,detailLimit=0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		detailLimit =qryParam.get("detailLimit")!=null?Integer.parseInt(qryParam.get("detailLimit").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		qryParam.put("limit",nLimit);
		qryParam.put("detailLimit",detailLimit);
		List<OrderDeliveryNoticeInfo> list = orderDeliveryNoticeService.getOrderDeliveryNoticeListInfo(qryParam);
		int noticeStatus = qryParam.get("noticeStatus") == ""|| qryParam.get("noticeStatus") == null ? -1:Integer.parseInt(qryParam.get("noticeStatus").toString());
		qryParam.put("noticeStatus", null);
		Integer count = orderDeliveryNoticeService.getOrderDeliveryNoticeListInfoCount(qryParam);
		qryParam.put("noticeStatus", 0);
		Integer count0 = orderDeliveryNoticeService.getOrderDeliveryNoticeListInfoCount(qryParam);
		qryParam.put("noticeStatus", 1);
		Integer count1 = orderDeliveryNoticeService.getOrderDeliveryNoticeListInfoCount(qryParam);
		qryParam.put("noticeStatus", 2);
		Integer count2 = orderDeliveryNoticeService.getOrderDeliveryNoticeListInfoCount(qryParam);
		List<Integer> counts = new ArrayList<Integer>();
		counts.add(count);
		counts.add(count0);
		counts.add(count1);
		counts.add(count2);
		respMap.put("counts", counts);
		respMap.put(Const.AJAX_SERVICE_TOTAL, counts.get(noticeStatus+1));
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	
	/**
	 * @Description: 修改送货通知状态
	 * OrderDeliveryNoticeController
	 * updateDeliveryStatue
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-31 上午10:27:57
	 */
	@RequestMapping(value="/updateDeliveryStatue.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateDeliveryStatue(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		orderDeliveryNoticeService.updateDeliveryStatue(qryParam);
		return respMap;
	}
	

	/**
	 * @Description: 确认送货通知
	 * OrderDeliveryNoticeController
	 * updateConfirmDeliveryStatue
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-9-7 下午6:42:32
	 */
	@RequestMapping(value="/updateConfirmDeliveryStatue.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateConfirmDeliveryStatue(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		orderDeliveryNoticeService.updateConfirmDeliveryStatue(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 批量修改确认时间
	 * OrderDeliveryNoticeController
	 * updateConfirmDate
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-9-6 下午6:01:30
	 */
	@RequestMapping(value="/updateConfirmDate.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateConfirmDate(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		orderDeliveryNoticeService.updateConfirmDate(qryParam);
		return respMap;
	}
	
	@RequestMapping(value="/getDeliveryStatu.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getDeliveryStatu(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Integer statu = orderDeliveryNoticeService.getDeliveryStatu(qryParam);
		respMap.put("staut", statu);
		return respMap;
	}
	@RequestMapping(value="/getDeliveryUdt.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getDeliveryUdt(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> updateInfo = orderDeliveryNoticeService.getDeliveryUdt(qryParam);
		respMap.put("updateInfo", updateInfo);
		return respMap;
	}
}
