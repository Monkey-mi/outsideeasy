package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngPurchaseOrderDetailsMapper;
import manager.orderManager.model.MngPurchaseOrderDetails;


@Service
public class MngPurchaseOrderDetailsService {
	@Autowired
	private MngPurchaseOrderDetailsMapper mapper;


	public List<MngPurchaseOrderDetails> getMngPurchaseOrderDetailsList(Map<String,Object> params) {
		return mapper.getMngPurchaseOrderDetailsList(params);
	}
	public void addMngPurchaseOrderDetails(MngPurchaseOrderDetails[] arr) {
		for(MngPurchaseOrderDetails obj: arr) {
			mapper.addMngPurchaseOrderDetails(obj);
		}
	}
	public void updateMngPurchaseOrderDetails(MngPurchaseOrderDetails[] arr) {
		for(MngPurchaseOrderDetails obj: arr) {
			mapper.updateMngPurchaseOrderDetails(obj);
		}
	}
	public void deleteMngPurchaseOrderDetails(MngPurchaseOrderDetails[] arr) {
		for(MngPurchaseOrderDetails obj: arr) {
			mapper.deleteMngPurchaseOrderDetails(obj);
		}
	}
}
