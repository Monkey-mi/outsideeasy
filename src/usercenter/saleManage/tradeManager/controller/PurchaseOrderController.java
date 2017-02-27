package usercenter.saleManage.tradeManager.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
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

import common.user.model.LoginAccount;

import usercenter.saleManage.tradeManager.model.OrderCancelRecord;
import usercenter.saleManage.tradeManager.model.OrderRequirement;
import usercenter.saleManage.tradeManager.model.ProductList;
import usercenter.saleManage.tradeManager.response.OrderStopDetails;
import usercenter.saleManage.tradeManager.response.OrderStopOrCancel;
import usercenter.saleManage.tradeManager.response.PurchaseOrderListVo;
import usercenter.saleManage.tradeManager.response.PurchaseOrderRemark;
import usercenter.saleManage.tradeManager.response.PurchaseOrderVo;
import usercenter.saleManage.tradeManager.response.StateCountsVo;
import usercenter.saleManage.tradeManager.service.OrderCancelRecordService;
import usercenter.saleManage.tradeManager.service.OrderRequirementService;
import usercenter.saleManage.tradeManager.service.ProductListService;
import usercenter.saleManage.tradeManager.service.PurchaseOrderService;
import util.Const;
import util.SessionUtil;
import util.TansferData;
import util.WebUtil;

@Controller
@RequestMapping("purchaseorder")
public class PurchaseOrderController {
@Autowired
private PurchaseOrderService purchaseOrderService;
@Autowired
private ProductListService productListService;
@Autowired
private OrderCancelRecordService orderCancelRecordService;
@Autowired
private OrderRequirementService orderRequirementService;
/** 上传路径*/
private final static String uploadFolderPath = WebUtil.getUpLoadFileRoot();
private final String partpath="temp2importOrder";

@RequestMapping(value = { "/orderDetailForSale/{d+}" }, method = { RequestMethod.GET })
public ModelAndView gojsp_orderDetailForSale(ModelAndView modelAndView ){
	modelAndView.setViewName("/usercenter/saleManage/tradeManage/orderDetail");
	return modelAndView;
}
@RequestMapping(value = { "/orderManageForSale" }, method = { RequestMethod.GET })
public ModelAndView gojsp_orderManageForSale(ModelAndView modelAndView ){
	modelAndView.setViewName("/usercenter/saleManage/tradeManage/orderManage");
	return modelAndView;
}

/**
 * @Description:跳转采购端订单详情
 * PurchaseOrderController
 * gojsp_orderDetailForPurchase
 * @param modelAndView
 * @return ModelAndView
 * @author yukai
 * 2016-12-15 上午10:18:44
 */
@RequestMapping(value = { "/orderDetailForPurchase/{d+}" }, method = { RequestMethod.GET })
public ModelAndView gojsp_orderDetailForPurchase(ModelAndView modelAndView ){
	modelAndView.setViewName("/usercenter/purchaseManage/tradeManage/orderDetail");
	return modelAndView;
}

/**
 * @Description:跳转采购端订单管理
 * PurchaseOrderController
 * gojsp_orderManageForPurchase
 * @param modelAndView
 * @return ModelAndView
 * @author yukai
 * 2016-12-15 上午10:18:48
 */
@RequestMapping(value = { "/orderManageForPurchase" }, method = { RequestMethod.GET })
public ModelAndView gojsp_orderManageForPurchase(ModelAndView modelAndView ){
	modelAndView.setViewName("/usercenter/purchaseManage/tradeManage/orderManage");
	return modelAndView;
}

/**
 * 销售查询出任务单列表
* @Description:
* PurchaseOrderController
* getPurchaseOrderList
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:24:22
 */
@RequestMapping(value="/getPurchaseOrderListForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getPurchaseOrderListForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("company_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "公司为空");
		return respMap;
	}
	int nLimit =0,npage =0;
	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
	int nStart=nLimit*npage;
	qryParam.put("start",nStart);
	int type = Integer.parseInt(qryParam.get("order_date_type").toString());
	switch(type){
	case 1://提交订单日期
		if(!WebUtil.isEmpty(qryParam.get("end_date"))){
		    qryParam.put("end_date_v", qryParam.get("end_date"));
		}
		if(!WebUtil.isEmpty(qryParam.get("start_date"))){
			qryParam.put("start_date_v", qryParam.get("start_date"));
			}
		break;
	case 2://接收订单日期
		if(!WebUtil.isEmpty(qryParam.get("end_date"))){
		    qryParam.put("end_date_o", qryParam.get("end_date"));
		}
		if(!WebUtil.isEmpty(qryParam.get("start_date"))){
			qryParam.put("start_date_o", qryParam.get("start_date"));
			}
		break;	
	}
	qryParam.put("status_3", "0");
	qryParam.put("str_order", 20);//接受订单的状态值
	String status = qryParam.get("status").toString();
	if(status.equals("10")||status.equals("20")||status.equals("30")||status.equals("40")){
		 qryParam.put("status_1", status);
	}else if(status.equals("50")){
		 qryParam.put("status_2", "50");
	}else if(status.equals("100")){
		 qryParam.put("status_3", "1");
	}
	List<PurchaseOrderListVo> taskList=purchaseOrderService.getPurchaseOrderListForOut(qryParam);
//	for(int i=0;i<taskList.size();i++){
//		Task tempt=taskList.get(i);
//		tempt.setProduct_name(SRMStringUtil.escapeHtml(tempt.getProduct_name()));
//		tempt.setRemark(SRMStringUtil.escapeHtml(tempt.getRemark()));
//		tempt.setProducers_company_name(SRMStringUtil.escapeHtml(tempt.getProducers_company_name()));
//		tempt.setSend_company_name(SRMStringUtil.escapeHtml(tempt.getSend_company_name()));
//		tempt.setReceive_company_name(SRMStringUtil.escapeHtml(tempt.getReceive_company_name()));
//	}
	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
	respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
	respMap.put(Const.AJAX_DATA_ROOT, taskList);
	return respMap;
}

/**
 * 外协查询出任务单列表
* @Description:
* PurchaseOrderController
* getPurchaseOrderList
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:24:22
 */
@RequestMapping(value="/getPurchaseOrderList.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getPurchaseOrderList(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("company_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "公司为空");
		return respMap;
	}
	int nLimit =0,npage =0;
	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
	int nStart=nLimit*npage;
	qryParam.put("start",nStart);
	int type = Integer.parseInt(qryParam.get("order_date_type").toString());
	switch(type){
	case 1://提交订单日期
		if(!WebUtil.isEmpty(qryParam.get("end_date"))){
		    qryParam.put("end_date_v", qryParam.get("end_date"));
		}
		if(!WebUtil.isEmpty(qryParam.get("start_date"))){
			qryParam.put("start_date_v", qryParam.get("start_date"));
			}
		break;
	case 2://接收订单日期
		if(!WebUtil.isEmpty(qryParam.get("end_date"))){
		    qryParam.put("end_date_o", qryParam.get("end_date"));
		}
		if(!WebUtil.isEmpty(qryParam.get("start_date"))){
			qryParam.put("start_date_o", qryParam.get("start_date"));
			}
		break;	
	}
	qryParam.put("status_3", "0");
	qryParam.put("str_order", 20);//接受订单的状态值
	String status = qryParam.get("status").toString();
	if(status.equals("10")||status.equals("20")||status.equals("30")||status.equals("40")){
		 qryParam.put("status_1", status);
	}else if(status.equals("50")){
		 qryParam.put("status_2", "50");
	}else if(status.equals("100")){
		 qryParam.put("status_3", "1");
	}
	List<PurchaseOrderListVo> taskList=purchaseOrderService.getPurchaseOrderList(qryParam);
//	for(int i=0;i<taskList.size();i++){
//		Task tempt=taskList.get(i);
//		tempt.setProduct_name(SRMStringUtil.escapeHtml(tempt.getProduct_name()));
//		tempt.setRemark(SRMStringUtil.escapeHtml(tempt.getRemark()));
//		tempt.setProducers_company_name(SRMStringUtil.escapeHtml(tempt.getProducers_company_name()));
//		tempt.setSend_company_name(SRMStringUtil.escapeHtml(tempt.getSend_company_name()));
//		tempt.setReceive_company_name(SRMStringUtil.escapeHtml(tempt.getReceive_company_name()));
//	}
	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
	respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
	respMap.put(Const.AJAX_DATA_ROOT, taskList);
	return respMap;
}
/**
 * 销售查询出各种状态的订单量
* @Description:
* PurchaseOrderController
* getOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-31 下午3:29:42
 */
@RequestMapping(value="/getStatusCountForSub.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getStatusCountForSub(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("company_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定公司");
		return respMap;
	}
	qryParam.put("flag", 1);
	StateCountsVo stateCountsVo = purchaseOrderService.getStatusCount(qryParam);
	respMap.put(Const.AJAX_DATA_ROOT, stateCountsVo);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 得到采购要求
* @Description:
* PurchaseOrderController
* getOrderRequirement
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2017-1-20 下午5:25:42
 */
@RequestMapping(value="/getOrderRequirement.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderRequirement(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();

	OrderRequirement orderRequirement = orderRequirementService.getOrderRequirement(qryParam);
	respMap.put(Const.AJAX_DATA_ROOT, orderRequirement);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 外协查询出各种状态的订单量
* @Description:
* PurchaseOrderController
* getOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-31 下午3:29:42
 */
@RequestMapping(value="/getStatusCountForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getStatusCountForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("company_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定公司");
		return respMap;
	}
	 //获取session中的账号的值
    LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
    if(loginAccount.getAccount_type()==0){//主账号
    	qryParam.put("reg_id", loginAccount.getLogin_id());
    }else if(loginAccount.getAccount_type()==1){//子账号
    	qryParam.put("sa_id", loginAccount.getLogin_id());
    }else {
    	respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "账号不存在");
		return respMap;	  
    }
    qryParam.put("flag", 2);
	StateCountsVo stateCountsVo = purchaseOrderService.getStatusCount(qryParam);
	respMap.put(Const.AJAX_DATA_ROOT, stateCountsVo);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 获得任务单的备注
* @Description:
* PurchaseOrderController
* getOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:42
 */
@RequestMapping(value="/getOrderRemark.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderRemark(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	PurchaseOrderRemark purchaseOrderRemark = purchaseOrderService.getOrderRemark(qryParam);
	respMap.put(Const.AJAX_DATA_ROOT, purchaseOrderRemark);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 外协获得任务单的备注
* @Description:
* PurchaseOrderController
* getOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:42
 */
@RequestMapping(value="/getOrderRemarkForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderRemarkForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	PurchaseOrderRemark purchaseOrderRemark = purchaseOrderService.getOrderRemarkForOut(qryParam);
	respMap.put(Const.AJAX_DATA_ROOT, purchaseOrderRemark);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 更新任务单的备注
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/updateOrderRemark.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> updateOrderRemark(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	purchaseOrderService.updateOrderRemark(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 外协更新任务单的备注
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/updateOrderRemarkForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> updateOrderRemarkForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	purchaseOrderService.updateOrderRemarkForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 批量更新任务单的备注
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/updateOrderRemarklist.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> updateOrderRemarklist(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	purchaseOrderService.updateOrderRemarklist(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 批量更新任务单的备注
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/updateOrderRemarklistForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> updateOrderRemarklistForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	purchaseOrderService.updateOrderRemarklistForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 批量删除任务单进入回收站
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderlist.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderlist(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.deletePurchaseOrderlist(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 批量删除任务单进入回收站
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderlistForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderlistForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.deletePurchaseOrderlistForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 单个删除任务单进入回收站
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrder.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.deletePurchaseOrder(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协单个删除任务单进入回收站
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.deletePurchaseOrderForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 销售单个还原任务单
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/returnPurchaseOrder.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> returnPurchaseOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.updatePurchaseOrderForProduct(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协单个还原任务单
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/returnPurchaseOrderForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> returnPurchaseOrderForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.updatePurchaseOrderForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协取消任务单
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/cancelPurchaseOrder.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> cancelPurchaseOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.updatePurchaseOrder(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协批量取消任务单
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/cancelPurchaseOrderList.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> cancelPurchaseOrderList(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.updatePurchaseOrderList(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 销售单个删除无法恢复
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderVo.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderVo(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.deletePurchaseOrderVo(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协单个删除无法恢复
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderVoForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderVoForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.deletePurchaseOrderVoForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 销售查询出订单的删除状态
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/getPurchaseOrderStatusFordelete.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getPurchaseOrderStatusFordelete(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int status = purchaseOrderService.getPurchaseOrderStatusFordelete(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, status);
	return respMap;
}
/**
 * 外协查询出订单的删除状态
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 未删除的数量
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/getPurchaseOrderStatusFordeleteForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getPurchaseOrderStatusFordeleteForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int status = purchaseOrderService.getPurchaseOrderStatusFordeleteForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, status);
	return respMap;
}
/**
 * 销售批量删除任务单无法恢复
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderlistVo.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderlistVo(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.deletePurchaseOrderlistVo(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协批量删除任务单无法恢复
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/deletePurchaseOrderlistVoForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deletePurchaseOrderlistVoForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.deletePurchaseOrderlistVoForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 销售批量还原任务单
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/returnPurchaseOrderlistVo.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> returnPurchaseOrderlistVo(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.updatePurchaseOrderlistVo(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 * 外协批量还原任务单
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-20 下午3:29:21
 */
@RequestMapping(value="/returnPurchaseOrderlistVoForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> returnPurchaseOrderlistVoForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	int count = purchaseOrderService.updatePurchaseOrderlistVoForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 *返回订单的状态
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 订单状态值
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午3:29:21
 */
@RequestMapping(value="/getPurchaseOrderStatus.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getPurchaseOrderStatus(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.getPurchaseOrderStatus(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, count);
	return respMap;
}
/**
 *为接受订单查询出订单的状态
* @Description:
* PurchaseOrderController
* updateOrderRemark
* @param request
* @param response
* @return 订单状态值
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午3:29:21
 */
@RequestMapping(value="/getPurchaseOrderStatusForAccept.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getPurchaseOrderStatusForAccept(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	Map<String,Object> map = purchaseOrderService.getPurchaseOrderStatusForAccept(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, map);
	return respMap;
}
/**
 * 接受订单
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/accpetOrderByID.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> accpetOrderByID(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	purchaseOrderService.saveAccpetOrderByID(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 销售查看更多产品
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/getProductListListForSearch.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getProductListListForSearch(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	List<ProductList> list = productListService.getProductListListForSearch(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, list);
	return respMap;
}
/**
 * 外协查看更多产品
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/getProductListListForSearchForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getProductListListForSearchForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	List<ProductList> list = productListService.getProductListListForSearch(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, list);
	return respMap;
}
/**
 * 销售查看更多产品
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/getOrderDetailsByID.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderDetailsByID(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	PurchaseOrderVo purchaseOrder = purchaseOrderService.getOrderDetailsByID(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT,purchaseOrder );
	return respMap;
}
/**
 * 外协查看更多产品
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-30 下午5:22:45
 */
@RequestMapping(value="/getOrderDetailsByIDForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderDetailsByIDForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	PurchaseOrderVo purchaseOrder = purchaseOrderService.getOrderDetailsByIDForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT,purchaseOrder );
	return respMap;
}
/**
 * 查看终止信息
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/getOrderStopDetails.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderStopDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	OrderStopDetails orderEndRecord = purchaseOrderService.getOrderStopDetails(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT,orderEndRecord );
	return respMap;
}
/**
 * 外协查看终止信息
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/getOrderStopDetailsForOut.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderStopDetailsForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	OrderStopDetails orderEndRecord = purchaseOrderService.getOrderStopDetailsForOut(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT,orderEndRecord );
	return respMap;
}
/**
 * 终止确认
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/OrderStopDetails.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> OrderStopDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.saveOrderStopDetails(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT,count );
	return respMap;
}
/**
 * 取消终止
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/updateOrderForStop.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> updateOrderForStop(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	int count = purchaseOrderService.updateOrderForStop(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT,count );
	return respMap;
}
/**
 * 查看取消信息
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-8-22 下午5:22:45
 */
@RequestMapping(value="/getOrderCancelRecord.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderCancelRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	OrderCancelRecord orderCancelRecord = orderCancelRecordService.getOrderCancelRecord(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, orderCancelRecord);
	return respMap;
}
/**
 * 查询出终止和取消的原因
* @Description:
* PurchaseOrderController
* getOrderStopOrCancel
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-9-22 上午11:23:29
 */
@RequestMapping(value="/getOrderStopOrCancel.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> getOrderStopOrCancel(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	OrderStopOrCancel  orderStopOrCancel = purchaseOrderService.getOrderStopOrCancel(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	respMap.put(Const.AJAX_DATA_ROOT, orderStopOrCancel);
	return respMap;
}
/**
 * 添加中止的信息
* @Description:
* PurchaseOrderController
* accpetOrderByID
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-9-1 下午5:22:45
 */
@RequestMapping(value="/addOrderEndRecord.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> addOrderEndRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	purchaseOrderService.addOrderEndRecord(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}

/**
 * 导出订单的列表
* @Description:
* PurchaseOrderController
* downloadSubAccountExcel
* @param request
* @param response
* @throws Exception void
* @author chenlong
* 2016-9-7 上午11:23:38
 */
@RequestMapping(value="/downloadOrderExcel.do",method=RequestMethod.GET)
@ResponseBody
public  void downloadSubAccountExcel(HttpServletRequest request,HttpServletResponse response ) throws Exception {
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);	
	String filePath=uploadFolderPath+partpath;
	File newFile = new File(filePath);
    if(!newFile.exists()){
      newFile.mkdirs();
    }
	//创建excel并放到指定目录下
	File file=purchaseOrderService.createOrderListExcel(filePath,qryParam);
	String filename=file.getName();
	OutputStream out = null;
    InputStream in = null;
    // 获得文件名
    // 定义输出类型(下载)
    response.setContentType("application/force-download");
    response.setHeader("Location", filename);

    // 定义输出文件头
    response.setHeader("Content-Disposition", "attachment;filename="
            + filename);
    out = response.getOutputStream();
    in = new FileInputStream(file.getPath());

    //限速
    TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);

    in.close();
    out.flush();
    out.close();
    // 删除文件,删除前关闭所有的Stream.
    file.delete();
}
@RequestMapping(value="/addCheckBoxForID.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> addCheckBoxForID(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
		return respMap;
	}
	
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
/**
 * 删除回签合同
* @Description:
* PurchaseOrderController
* deleteOrderAgreementFile
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2017-2-13 上午10:47:41
 */
@RequestMapping(value="/deleteOrderAgreementFile.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object> deleteOrderAgreementFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "所在页面订单不存在");
		return respMap;
	}
	purchaseOrderService.deleteOrderAgreementFile(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	return respMap;
}
}
