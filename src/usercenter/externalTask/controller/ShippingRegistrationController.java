package usercenter.externalTask.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.externalTask.TaskResponse.SelectDownVo;
import usercenter.externalTask.TaskResponse.ShippingAndDetailVo;
import usercenter.externalTask.model.ShippingRegistration;
import usercenter.externalTask.service.ShippingRegistrationService;
import usercenter.externalTask.service.TaskDeliverGoodsService;
import util.Const;
import util.SysSerialId;
import util.WebUtil;

@Controller
@RequestMapping(value="shippingRegistration")
public class ShippingRegistrationController {
	@Autowired
	private ShippingRegistrationService service;
	@Autowired
	private TaskDeliverGoodsService taskDeliverGoodsService;
	/**
	 * 查询出运货单列表
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-5 上午11:30:39
	 */
	@RequestMapping(value="/getShippingRegistrationList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getShippingRegistrationList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("company_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "公司不存在");
			return respMap;
		}
		List<ShippingRegistration> list = service.getShippingRegistrationList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;		
	}
	/**
	 * 增加一条运单信息
	* @Description:
	* ShippingRegistrationController
	* addShippingRegistration
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-5 上午11:30:39
	 */
	@RequestMapping(value="/addShippingRegistration.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addShippingRegistration(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("arrpro"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "发货清单不能为空！！");
			return respMap;
		}
		boolean flag = service.addShippingRegistration(qryParam);
		if(!flag){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);			
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "发货量大于生产量！！请重新录入");
			return respMap;
		}
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);	
		return respMap;	
	}
	/**
	 * 生成一条运单的单号
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
	@RequestMapping(value="/getShippingIdForSend.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getNewNextSerialIdForSend1(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String strID = SysSerialId.getNewNextSerialIdForSend1();
		taskDeliverGoodsService.deletedeliverGoods(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, strID);
		return respMap;		
	}
	/**
	 * 生成一条运单的单号
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
	@RequestMapping(value="/getForSelect.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getForSelect(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		SelectDownVo selectDownVo = service.getForSelect(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,selectDownVo);
		return respMap;		
	}
	/**
	 *查询运单的详细信息
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
	@RequestMapping(value="/getShippingForDetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getShippingForDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("shipping_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "运单不存在");
			return respMap;
		}
		ShippingAndDetailVo shippingAndDetailVo = service.getShippingForDetails(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,shippingAndDetailVo);
		return respMap;		
	}
	/**
	 *运单内容的更新
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
	@RequestMapping(value="/updateShippingRegistration.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateShippingRegistration(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("shipping_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "运单不存在");
			return respMap;
		}
		String message = service.updateShippingRegistration(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,message);
		return respMap;		
	}
	/**
	* 取消运单
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
	@RequestMapping(value="/cancelShippingOne.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> cancelShippingOne(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("shipping_number"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "运单不存在");
			return respMap;
		}
		String message = service.cancelShippingOne(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,message);
		return respMap;		
	}
}
