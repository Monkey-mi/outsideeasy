package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfPurchaseOrderDetailsMapper;
import platform.contract.model.PfPurchaseOrderDetails;


@Service
public class PfPurchaseOrderDetailsService {
	@Autowired
	private PfPurchaseOrderDetailsMapper mapper;


	public List<PfPurchaseOrderDetails> getPfPurchaseOrderDetailsList(Map<String,Object> params) {
		return mapper.getPfPurchaseOrderDetailsList(params);
	}
	public void addPfPurchaseOrderDetails(PfPurchaseOrderDetails obj) {
			mapper.addPfPurchaseOrderDetails(obj);
	}
	public void updatePfPurchaseOrderDetails(PfPurchaseOrderDetails[] arr) {
		for(PfPurchaseOrderDetails obj: arr) {
			mapper.updatePfPurchaseOrderDetails(obj);
		}
	}
	public void deletePfPurchaseOrderDetails(PfPurchaseOrderDetails[] arr) {
		for(PfPurchaseOrderDetails obj: arr) {
			mapper.deletePfPurchaseOrderDetails(obj);
		}
	}
}
