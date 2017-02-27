package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngPurchaseOrderMapper;
import manager.orderManager.model.MngPurchaseOrder;


@Service
public class MngPurchaseOrderService {
	@Autowired
	private MngPurchaseOrderMapper mapper;


	public List<MngPurchaseOrder> getMngPurchaseOrderList(Map<String,Object> params) {
		return mapper.getMngPurchaseOrderList(params);
	}
	public void addMngPurchaseOrder(MngPurchaseOrder[] arr) {
		for(MngPurchaseOrder obj: arr) {
			mapper.addMngPurchaseOrder(obj);
		}
	}
	public void updateMngPurchaseOrder(MngPurchaseOrder[] arr) {
		for(MngPurchaseOrder obj: arr) {
			mapper.updateMngPurchaseOrder(obj);
		}
	}
	public void deleteMngPurchaseOrder(MngPurchaseOrder[] arr) {
		for(MngPurchaseOrder obj: arr) {
			mapper.deleteMngPurchaseOrder(obj);
		}
	}
}
