package usercenter.externalTask.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import usercenter.externalTask.TaskResponse.DeliverGoods;
import usercenter.externalTask.TaskResponse.DeliverListAndCount;
import usercenter.externalTask.TaskResponse.SendDeliverManagerVo;
import usercenter.externalTask.TaskResponse.ShippingAndDetailVo;
import usercenter.externalTask.service.TaskDeliverGoodsService;
import util.Const;
import util.SysSerialId;
import util.WebUtil;

@Controller
@RequestMapping("taskDeliverGood")
public class TaskDeliverGoodController {
	@Autowired
	private TaskDeliverGoodsService taskDeliverGoodsService;
	/**
	 * 接收方收货列表页面
	* @Description:
	* TaskDeliverGoodController
	* gojsp_outsourceReceiptManaget
	* @param modelAndView
	* @return ModelAndView
	* @author chenlong
	* 2017-1-3 上午10:19:36
	 */
	@RequestMapping(value = { "/receiptManage" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceReceiptManaget(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/receiptManage/receiptManage");
		return modelAndView;
	}
    /**
     * 采购之收货详情
    * @Description:
    * TaskDeliverGoodController
    * gojsp_outsourceReceiptInfo
    * @param modelAndView
    * @return ModelAndView
    * @author chenlong
    * 2017-1-3 上午11:02:56
     */
	@RequestMapping(value = { "/receiptInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceReceiptInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/receiptManage/receiptInfo");
		return modelAndView;
	}
	/**
	 * 生产方发货列表页面
	* @Description:
	* TaskDeliverGoodController
	* gojsp_outsourceDeliveryManage
	* @param modelAndView
	* @return ModelAndView
	* @author chenlong
	* 2017-1-3 上午10:19:41
	 */
	@RequestMapping(value = { "/deliveryManage" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceDeliveryManage(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/sendOutManage/deliveryManage");
		return modelAndView;
	}
	/**
	 * 添加发货的页面
	* @Description:
	* TaskDeliverGoodController
	* gojsp_outsourceDeliveryManage
	* @param modelAndView
	* @return ModelAndView
	* @author chenlong
	* 2017-1-3 上午10:27:02
	 */
	@RequestMapping(value = { "/deliveryRegister" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceDeliveryRegister(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/sendOutManage/deliveryRegister");
		return modelAndView;
	}
	/**
	 * 销售之发货单详情页面
	* @Description:
	* TaskDeliverGoodController
	* gojsp_outsourceInvoiceInfo
	* @param modelAndView
	* @return ModelAndView
	* @author chenlong
	* 2017-1-3 上午10:45:31
	 */
	@RequestMapping(value = { "/invoiceInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceInvoiceInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/sendOutManage/invoiceInfo");
		return modelAndView;
	}
	/**
	 * 销售运单详情页面
	* @Description:
	* TaskDeliverGoodController
	* gojsp_outsourceWaybillInfo
	* @param modelAndView
	* @return ModelAndView
	* @author chenlong
	* 2017-1-3 上午10:56:09
	 */
	@RequestMapping(value = { "/waybillInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceWaybillInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/sendOutManage/waybillInfo");
		return modelAndView;
	}
	/**
	 *生产 获得发货单列表
	* @Description:
	* TaskDeliverGoodController
	* updateTaskState2toBeSendList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-9 下午3:01:44
	 */
	@RequestMapping(value="/getTaskDeliverGoodsList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskDeliverGoodsList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("company_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定公司");
			return respMap;
		}
		int nLimit =0,npage =0;		
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);	
    	SendDeliverManagerVo sendDeliverManagerVo = taskDeliverGoodsService.getTaskDeliverGoodsList(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, sendDeliverManagerVo);
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 外协获得发货单列表
	* @Description:
	* TaskDeliverGoodController
	* updateTaskState2toBeSendList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-9 下午3:01:44
	 */
	@RequestMapping(value="/getTaskDeliverGoodsListForReceive.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskDeliverGoodsListForReceive(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("company_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定公司");
			return respMap;
		}
		int nLimit =0,npage =0;		
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);	
    	SendDeliverManagerVo sendDeliverManagerVo = taskDeliverGoodsService.getTaskDeliverGoodsListForReceive(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, sendDeliverManagerVo);
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 
	* @Description:
	* TaskDeliverGoodController
	* updateTaskState2toBeSendList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-9 下午3:01:44
	 */
	@RequestMapping(value="/addTaskDeliverGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addTaskDeliverGoods(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			qryParam.put("deliver_number", SysSerialId.getNewNextSerialIdForSend2());
		}	
		DeliverGoods deliverGoods = taskDeliverGoodsService.addTaskDeliverGoods(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, deliverGoods);
		return respMap;
	}
	/**
	 * 删除发货清单中的任务单
	* @Description:
	* TaskDeliverGoodController
	* deleteTaskDeliverGoods
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-14 下午2:46:46
	 */
	@RequestMapping(value="/deleteTaskDeliverGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskDeliverGoods(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("arr"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		taskDeliverGoodsService.deleteTaskDeliverGoods(qryParam);		
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		return respMap;
	}
	/**
	 * 更新任务单的
	* @Description:
	* TaskDeliverGoodController
	* updateDeliverGoodsForQuantity
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-16 上午10:36:40
	 */
	@RequestMapping(value="/updateDeliverGoodsForQuantity.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateDeliverGoodsForQuantity(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		boolean flag = taskDeliverGoodsService.updateDeliverGoodsForQuantity(qryParam);	
		if(flag){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);		
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "发货数量大于生产数量");
			return respMap;
		}
	}
	/**
	 * 在编辑发货时用---更新发货单的发货量
	* @Description:
	* TaskDeliverGoodController
	* updateDeliverGoodsForQuantity
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-16 上午10:36:40
	 */
	@RequestMapping(value="/updateDeliverGoodsForQuantitys.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateDeliverGoodsForQuantitys(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("tids"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		String message = taskDeliverGoodsService.updateDeliverGoodsForQuantitys(qryParam);		
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);		
		respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
		return respMap;
	}
	/**
	 * 查询出发货单的信息
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-12 上午11:30:39
	 */
	@RequestMapping(value="/getdeliverGoodsForNumber.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getdeliverGoodsForNumber(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		ShippingAndDetailVo shippingAndDetailVo = taskDeliverGoodsService.getdeliverGoodsForNumber(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,shippingAndDetailVo);
		return respMap;		
	}
	/**
	 * 取消一个任务的发货单
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-12 上午11:30:39
	 */
	@RequestMapping(value="/updateCancelDertail.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateCancelDertail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		String shippingAndDetailVo = taskDeliverGoodsService.updateCancelDertail(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,shippingAndDetailVo);
		return respMap;		
	}
	/**
	 * 取消一批发货单
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-12 上午11:30:39
	 */
	@RequestMapping(value="/updateCancelDertailVo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateCancelDertailVo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("deliver_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}		
		String shippingAndDetailVo = taskDeliverGoodsService.updateCancelDertaillist(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,shippingAndDetailVo);
		return respMap;		
	}
	/**
	 * 收取一批发货单
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-12 上午11:30:39
	 */
	@RequestMapping(value="/updateReciveDertailVo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateReciveDertailVo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		if(WebUtil.isEmpty(qryParam.get("receive_no"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("deliver_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定发货清单");
			return respMap;
		}
		String flag = taskDeliverGoodsService.updateReciveDertailVo(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,flag);
		return respMap;		
	}  
	/**
	 * 返回发货单下所有的该任务单的情况
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-12 上午11:30:39
	 */
	@RequestMapping(value="/getTaskDeliverGoodsforOneTask.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskDeliverGoodsforOneTask(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();		
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}	
		int nLimit =0,npage =0;		
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		DeliverListAndCount deliverListAndCount = taskDeliverGoodsService.getTaskDeliverGoodsforOneTask(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,deliverListAndCount);
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;		
	}  
	/**
	 *检查当前修改发货信息时对发货单和运单的状态检查（必须验证）
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-12 上午11:30:39
	 */
	@RequestMapping(value="/getDeliverGoodsStatesInNumberVos.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getDeliverGoodsStatesInNumberVos(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();				
		String message = taskDeliverGoodsService.getDeliverGoodsStatesInNumberVos(qryParam);			
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);		
		respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
		return respMap;
	} 
}
