package com.outsideasy.ws.erp.contract;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.vo.SupplierFileOut;


import platform.contract.model.PfOrderCheckDetails;
import platform.contract.model.PfOrderDeliveryAttached;
import platform.contract.model.PfOrderDeliveryNotice;
import platform.contract.model.PfOrderDeliveryNoticedetails;
import platform.contract.model.PfOrderDeliveryRegister;
import platform.contract.model.PfOrderDeliveryRegisterDetails;
import platform.contract.model.PfOrderQualitycheck;
import platform.contract.model.PfPurchaseOrderDetails;
import platform.contract.service.PfOrderDeliveryAttachedService;
import platform.contract.service.PfOrderDeliveryRegisterDetailsService;
import platform.contract.service.PfOrderDeliveryRegisterService;
import platform.contract.service.PfSynergyUrgeService;
import util.MyJsonUtil;

@WebService
@SOAPBinding(style = Style.RPC)
public class SynergyUrgeSyncImpl implements SynergyUrgeSyncInter{
	
	@Autowired
	private PfSynergyUrgeService pfSynergyUrgeService;
	//送货登记表
	@Autowired
	private PfOrderDeliveryRegisterService pfOrderDeliveryRegisterService;
	//送货明细表
	@Autowired
	private PfOrderDeliveryRegisterDetailsService pfOrderDeliveryRegisterDetailsService;
	//送货附件表
	@Autowired
	private PfOrderDeliveryAttachedService pfOrderDeliveryAttachedService;
	@Override
	public String getAddPfSynergyUrge(String jsonmap) {
		return pfSynergyUrgeService.addPfSynergyUrge(jsonmap);
	}
	@Override
	public String getPfOrderDeliveryNoticeList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderDeliveryNotice> lam=new CXFResponse<PfOrderDeliveryNotice>();
		List<PfOrderDeliveryNotice> list=pfSynergyUrgeService.getOrderDeliveryNoticeList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getPfOrderDeliveryNoticedetailsList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderDeliveryNoticedetails> lam=new CXFResponse<PfOrderDeliveryNoticedetails>();
		List<PfOrderDeliveryNoticedetails> list=pfSynergyUrgeService.getPfOrderDeliveryNoticedetailsList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String updatePfOrderDeliveryNotice(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		try {
			pfSynergyUrgeService.updatePfOrderDeliveryNotice(params);
		} catch (Exception e) {
			params.put("bool",false);
			params.put("msg",e.getMessage());
		}
		return MyJsonUtil.obj2string(params);
	}
	@Override
	@Transactional
	public String getUpdatePfOrderDetailSync(String jsonmap) {
		CXFResponse<PfPurchaseOrderDetails> sf=MyJsonUtil.str2CXFResponse(jsonmap, PfPurchaseOrderDetails.class);
		List<PfPurchaseOrderDetails> ppodList=sf.getList();
		for(PfPurchaseOrderDetails ppod:ppodList){
			pfSynergyUrgeService.updatePfOrderDetailSync(ppod);
		}
		return null;
	}
	@Override
	@Transactional
	public String getAddPfOrderQualitycheck(String jsonmap) {
		CXFResponse<PfOrderCheckDetails> sf=MyJsonUtil.str2CXFResponse(jsonmap, PfOrderCheckDetails.class);
		Map<String,Object> params=sf.getParams();
		Map<String,Object> json=new HashMap<String, Object>();
		json.put("bool", true);
		//获取质检主表信息
		if(params.get("OrderQualitycheck")==null){
			json.put("bool", true);
			json.put("msg", "OrderQualitycheck 参数缺失");
		}
		if(params.get("record_id")==null){
			json.put("msg", "record_id 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		if(params.get("pur_company_id")==null){
			json.put("msg", "pur_company_id 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		PfOrderQualitycheck odc=MyJsonUtil.str2obj(params.get("OrderQualitycheck").toString(), PfOrderQualitycheck.class);
		String record_id=params.get("record_id").toString();
		
		if(params.get("pur_company_id")==null){
			json.put("msg", "pur_company_id 参数缺失！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		String pur_company_id=params.get("pur_company_id").toString();
		//通过准入帐号获取供方id和供方档案id
		int sup_company_id,supplier_id;
		params.put("record_id", record_id);
		List<PfOrderDeliveryNotice> podnList = pfSynergyUrgeService.getPfSup_company_idAndSupplier_idList(params);
		if(podnList.size()==0){
			json.put("msg", "供应商企业id 获取失败！！！");
			json.put("bool", false);
			return MyJsonUtil.obj2string(json);
		}
		sup_company_id=podnList.get(0).getSup_company_id();
		supplier_id=podnList.get(0).getSupplier_id();
		odc.setPur_company_id(Integer.valueOf(pur_company_id));
		odc.setSup_company_id(sup_company_id);
		odc.setSupplier_id(supplier_id);
		pfSynergyUrgeService.addPfOrderQualitycheck(odc);
		List<PfOrderCheckDetails> ppodList=sf.getList();
		for(PfOrderCheckDetails obj:ppodList){
			obj.setCheck_id(odc.getCheck_id());
			pfSynergyUrgeService.addPfOrderCheckDetails(obj);
		}
		return MyJsonUtil.obj2string(json);
	}
	@Override
	public String getAddPfOrderCheckDetails(String jsonmap) {
		// TODO Auto-generated method stub
		CXFResponse<PfOrderCheckDetails> sf=MyJsonUtil.str2CXFResponse(jsonmap, PfOrderCheckDetails.class);
		List<PfOrderCheckDetails> ppodList=sf.getList();
		for(PfOrderCheckDetails obj:ppodList){
			pfSynergyUrgeService.addPfOrderCheckDetails(obj);
		}
		return null;
	}
	@Override
	public String getPfOrderDeliveryAttachedList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderDeliveryAttached> lam=new CXFResponse<PfOrderDeliveryAttached>();
		List<PfOrderDeliveryAttached> list=pfOrderDeliveryAttachedService.getPfOrderDeliveryAttachedList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getPfOrderDeliveryRegisterDetailsList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderDeliveryRegisterDetails> lam=new CXFResponse<PfOrderDeliveryRegisterDetails>();
		List<PfOrderDeliveryRegisterDetails> list=pfOrderDeliveryRegisterDetailsService.getPfOrderDeliveryRegisterDetailsList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getUpdatePfOrderDeliveryRegisterIsGet(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderDeliveryRegister> lam=new CXFResponse<PfOrderDeliveryRegister>();
		pfOrderDeliveryRegisterService.updatePfOrderDeliveryRegisterIsGet(params);
		lam.setSuccessResponseInfo(null, params);
		return MyJsonUtil.obj2string(lam);
	}
	@Override
	public String getPfOrderDeliveryRegisterList(String jsonmap) {
		Map<String,Object> params=MyJsonUtil.str2map(jsonmap);
		CXFResponse<PfOrderDeliveryRegister> lam=new CXFResponse<PfOrderDeliveryRegister>();
		List<PfOrderDeliveryRegister> list=pfOrderDeliveryRegisterService.getPfOrderDeliveryRegisterList(params);
		lam.setSuccessResponseInfo(list, params);
		return MyJsonUtil.obj2string(lam);
	}
	
}
