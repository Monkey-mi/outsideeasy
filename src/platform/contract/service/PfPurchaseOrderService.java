package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.model.PfCompany;
import platform.contract.data.PfPurchaseOrderMapper;
import platform.contract.model.PfPurchaseOrder;


@Service
public class PfPurchaseOrderService {
	@Autowired
	private PfPurchaseOrderMapper mapper;


	public List<PfPurchaseOrder> getPfPurchaseOrderList(Map<String,Object> params) {
		return mapper.getPfPurchaseOrderList(params);
	}
	public void addPfPurchaseOrder(PfPurchaseOrder[] arr) {
		for(PfPurchaseOrder obj: arr) {
			mapper.addPfPurchaseOrder(obj);
		}
	}
	public void updatePfPurchaseOrder(PfPurchaseOrder[] arr) {
		for(PfPurchaseOrder obj: arr) {
			mapper.updatePfPurchaseOrder(obj);
		}
	}
	public void deletePfPurchaseOrder(PfPurchaseOrder[] arr) {
		for(PfPurchaseOrder obj: arr) {
			mapper.deletePfPurchaseOrder(obj);
		}
	}
	public List<PfCompany> getCampanyInfoBycid(Map<String,Object> params){
		return mapper.getCampanyInfoBycid(params);
	}
	public int getSupplierId(Map<String,Object> params){
		return mapper.getSupplierId(params);
	}
	public int getOrderid(Map<String,Object> params){
		return mapper.getOrderid(params);
	}
	public String getOrderDetialId(Map<String,Object> params){
		return mapper.getOrderDetialId(params);
	}
	public String getContractStatus(Map<String,Object> params){
		return mapper.getContractStatus(params);
	}
}
