package usercenter.saleManage.deliveryManage.controller;

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

import usercenter.saleManage.deliveryManage.model.QualityFeedback;
import usercenter.saleManage.deliveryManage.service.QualityFeedbackService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("qualityFeedback")
public class QualityFeedbackCtrl {
	@Autowired
	private QualityFeedbackService qfService;
	
	/**
	 * @Description:跳转采购端质检反馈
	 * QualityFeedbackCtrl
	 * gojsp_qualityFeedbackListForPurchase
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午8:54:52
	 */
	@RequestMapping(value = { "/qualityFeedbackListForPurchase" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_qualityFeedbackListForPurchase(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/deliveryManage/qualityTestFeedback");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转销售端质检反馈
	 * QualityFeedbackCtrl
	 * gojsp_qualityFeedbackListForSale
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午8:55:40
	 */
	@RequestMapping(value = { "/qualityFeedbackListForSale" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_qualityFeedbackListForSale(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/deliveryManage/qualityTestFeedback");
		return modelAndView;
	}
	
	/**
	 * @Description:获取质检信息列表
	 * QualityFeedbackCtrl
	 * getPurchaseOrderList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-22 上午11:40:52
	 */
	@RequestMapping(value="/getQualityFeedbackList.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getQualityFeedbackList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		if (qryParam.get("date_type")!=null) {
			int type = Integer.parseInt(qryParam.get("date_type").toString());
			switch(type){
			case 1://送货日期
				if(!WebUtil.isEmpty(qryParam.get("end_date"))){
				    qryParam.put("end_date_v", qryParam.get("end_date"));
				}
				if(!WebUtil.isEmpty(qryParam.get("start_date"))){
					qryParam.put("start_date_v", qryParam.get("start_date"));
					}
				break;
			case 2://质检日期
				if(!WebUtil.isEmpty(qryParam.get("end_date"))){
				    qryParam.put("end_date_o", qryParam.get("end_date"));
				}
				if(!WebUtil.isEmpty(qryParam.get("start_date"))){
					qryParam.put("start_date_o", qryParam.get("start_date"));
					}
				break;	
			}
		}
		List<QualityFeedback> list=qfService.getQualityFeedbackList(qryParam);

		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
