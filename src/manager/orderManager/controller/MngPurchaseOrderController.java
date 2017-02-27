package manager.orderManager.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.orderManager.service.MngCommunicationService;
import manager.orderManager.service.MngOrderAgreementFileService;
import manager.orderManager.service.MngOrderAttchedFileService;
import manager.orderManager.service.MngOrderCheckDetailsService;
import manager.orderManager.service.MngOrderDeliveryAttachedService;
import manager.orderManager.service.MngOrderDeliveryNoticeService;
import manager.orderManager.service.MngOrderDeliveryNoticedetailsService;
import manager.orderManager.service.MngOrderDeliveryRegisterDetailsService;
import manager.orderManager.service.MngOrderDeliveryRegisterService;
import manager.orderManager.service.MngOrderQualitycheckService;
import manager.orderManager.service.MngOrderRequirementService;
import manager.orderManager.service.MngPurchaseOrderDetailsService;
import manager.orderManager.service.MngPurchaseOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.WebUtil;

@Controller
@RequestMapping("mngPurchaseOrder")
public class MngPurchaseOrderController {
	@Autowired
	private MngPurchaseOrderService purchaseOrderService;
	@Autowired
	private MngPurchaseOrderDetailsService purchaseOrderDetailsService;
	@Autowired
	private MngOrderAttchedFileService orderAttchedFileService;
	@Autowired
	private MngOrderAgreementFileService orderAgreementFileService;
	@Autowired
	private MngOrderDeliveryNoticedetailsService  orderDeliveryNoticedetailsService;
	@Autowired
	private MngCommunicationService  communicationService;
	@Autowired 
	private MngOrderRequirementService  mngOrderRequirementService;
	@Autowired 
	private MngOrderDeliveryNoticeService mngOrderDeliveryNoticeService;
	@Autowired
	private MngOrderDeliveryRegisterService mngorderdeliveryregisterService;
	@Autowired
	private MngOrderDeliveryRegisterDetailsService mngOrderDeliveryRegisterDetailsService;
	@Autowired
	private MngOrderQualitycheckService mngOrderQualitycheckService;
	@Autowired
	private MngOrderCheckDetailsService mngOrderCheckDetailsService;
	@Autowired
	private MngOrderDeliveryAttachedService mngOrderDeliveryAttachedService;
	
	@RequestMapping(value="/mngPurchaseOrder.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngPurchaseOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,purchaseOrderService);
	}
	@RequestMapping(value="/mngPurchaseOrderDetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngPurchaseOrderDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,purchaseOrderDetailsService);
	}
	@RequestMapping(value="/mngOrderAttchedFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderAttchedFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orderAttchedFileService);
	}
	@RequestMapping(value="/mngOrderAgreementFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderAgreementFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orderAgreementFileService);
	}
	@RequestMapping(value="/mngOrderDeliveryNoticedetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderDeliveryNoticedetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,orderDeliveryNoticedetailsService);
	}
	@RequestMapping(value="/mngOrderCommunication.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderCommunication(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,communicationService);
	}
	@RequestMapping(value="/mngOrderRequirement.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderRequirement(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,mngOrderRequirementService);
	}
	@RequestMapping(value="/mngOrderDeliveryNotice.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderDeliveryNotice(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,mngOrderDeliveryNoticeService);
	}
	@RequestMapping(value="/mngOrderDeliveryRegister.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngorderdeliveryregister(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngorderdeliveryregisterService);
	}
	@RequestMapping(value="/mngOrderDeliveryRegisterDetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderDeliveryRegisterDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngOrderDeliveryRegisterDetailsService);
	}
	@RequestMapping(value="/mngOrderQualitycheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderQualitycheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngOrderQualitycheckService);
	}	
	@RequestMapping(value="/mngOrderCheckDetails.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderCheckDetails(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngOrderCheckDetailsService);
	}
	@RequestMapping(value="/mngOrderDeliveryAttached.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> mngOrderDeliveryAttached(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, mngOrderDeliveryAttachedService);
	}
}
