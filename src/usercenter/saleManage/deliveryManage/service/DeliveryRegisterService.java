package usercenter.saleManage.deliveryManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.dictionary.model.DictionaryInfo;
import common.dictionary.service.DictionaryInfoService;
import common.mongodb.service.FileOptService;

import platform.company.model.PfCompanySimpleInfo;
import platform.company.service.CompanyForPlateFormService;

import usercenter.saleManage.deliveryManage.data.DeliveryRegisterMapper;
import usercenter.saleManage.deliveryManage.model.DeliveryAttached;
import usercenter.saleManage.deliveryManage.model.DeliveryRegister;
import usercenter.saleManage.deliveryManage.model.DeliveryRegisterDetails;


@Service
public class DeliveryRegisterService {
	@Autowired
	private DeliveryRegisterMapper mapper;
	@Autowired
	private CompanyForPlateFormService supplierService;
	@Autowired
	private DictionaryInfoService  dictionaryInfoService;
	@Autowired
	private DeliveryAttachedService daService;
	@Autowired
	private DeliveryRegisterDetailsService drdService;
	@Autowired
	private FileOptService fileService;

	public List<DeliveryRegister> getDeliveryRegisterList(Map<String,Object> params) {
		List<DeliveryRegister> deliveryRegisters= mapper.getDeliveryRegisterList(params);
		Map<String, Object> map=new HashMap<String, Object>();
		for (DeliveryRegister deliveryRegister : deliveryRegisters) {
			map.put("register_id", deliveryRegister.getRegister_id());
			List<DeliveryRegisterDetails> deliveryRegisterDetails=drdService.getDeliveryRegisterDetailsList(map);
			deliveryRegister.setDeliveryRegisterDetails(deliveryRegisterDetails);
			List<DeliveryAttached> deliveryAttacheds=daService.getDeliveryAttachedList(map);
			deliveryRegister.setDeliveryAttacheds(deliveryAttacheds);
		}
		return deliveryRegisters;
	}
	public void addDeliveryRegister(Map<String, Object> params) {
			mapper.addDeliveryRegister(params);
	}
	public void updateDeliveryRegister(DeliveryRegister[] arr) {
		for(DeliveryRegister obj: arr) {
			mapper.updateDeliveryRegister(obj);
		}
	}
	public void deleteDeliveryRegister(Map<String,Object> params) {
		List<DeliveryRegisterDetails> deliveryRegisterDetails=drdService.getDeliveryRegisterDetailsList(params);
		Map<String, Object> map=new HashMap<String, Object>();
		for (DeliveryRegisterDetails drd : deliveryRegisterDetails) {
			map.put("detail_id", drd.getDetail_id());
			drdService.deleteDeliveryRegisterDetails(map);
		}
		List<DeliveryAttached> deliveryAttacheds=daService.getDeliveryAttachedList(params);
		for (DeliveryAttached deliveryAttached : deliveryAttacheds) {
			map.put("id", deliveryAttached.getId());
			daService.deleteDeliveryAttached(map);
		}
		mapper.deleteDeliveryRegister(params);
	}
	/**
	 * @Description:提交送货单
	 * DeliveryRegisterService
	 * submitDeliveryRegister
	 * @param params void
	 * @author yukai
	 * 2016-8-24 上午11:01:58
	 */
	public void submitDeliveryRegister(Map<String, Object> params) {
		int send_company_id=Integer.parseInt(params.get("send_company_id").toString());
		 Map<String, Object> companyInfoMap=supplierService.getCompanyInfoByCompanyId(send_company_id);
		 if (companyInfoMap.get("companyBaseInfo")!=null) {
			 PfCompanySimpleInfo companyBaseInfo=(PfCompanySimpleInfo) companyInfoMap.get("companyBaseInfo");
			 params.put("send_cpyname_cn", companyBaseInfo.getCpyname_cn());
		}
		 DictionaryInfo dictionaryInfo=dictionaryInfoService.getDictionaryInfo("TPS_purchaser");
		 int receive_company_id=Integer.parseInt(dictionaryInfo.getDictionary_value());
		 params.put("receive_company_id", receive_company_id); 
		 companyInfoMap=supplierService.getCompanyInfoByCompanyId(receive_company_id);
		 if (companyInfoMap.get("companyBaseInfo")!=null) {
			 PfCompanySimpleInfo companyBaseInfo=(PfCompanySimpleInfo) companyInfoMap.get("companyBaseInfo");
			 params.put("receive_cpyname_cn", companyBaseInfo.getCpyname_cn());
		}
		addDeliveryRegister(params);
		int register_id=Integer.parseInt(params.get("register_id").toString());
		String arrayStr=params.get("fileIds").toString();
		String[] arrayfile_id=arrayStr.split(",");
		for(int i=0;i<arrayfile_id.length;i++){
			params.put("id", arrayfile_id[i]);
			params.put("register_id", register_id);
			daService.updateDeliveryAttached(params);
		}
		int count=Integer.parseInt(params.get("count").toString());
		for (int i = 0; i < count; i++) {
			params.put("pur_order_id", params.get("deliveryRegisterDetails["+i+"][pur_order_id]"));
			params.put("order_bh", params.get("deliveryRegisterDetails["+i+"][order_bh]"));
			params.put("agreement_bh", params.get("deliveryRegisterDetails["+i+"][agreement_bh]"));
			params.put("go_type", 0);
			drdService.addDeliveryRegisterDetails(params);
		}
	}
}
