package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOrderDeliveryAttachedMapper;
import platform.contract.model.PfOrderDeliveryAttached;


@Service
public class PfOrderDeliveryAttachedService {
	@Autowired
	private PfOrderDeliveryAttachedMapper mapper;


	public List<PfOrderDeliveryAttached> getPfOrderDeliveryAttachedList(Map<String,Object> params) {
		return mapper.getPfOrderDeliveryAttachedList(params);
	}
	public void addPfOrderDeliveryAttached(PfOrderDeliveryAttached[] arr) {
		for(PfOrderDeliveryAttached obj: arr) {
			mapper.addPfOrderDeliveryAttached(obj);
		}
	}
	public void updatePfOrderDeliveryAttached(PfOrderDeliveryAttached[] arr) {
		for(PfOrderDeliveryAttached obj: arr) {
			mapper.updatePfOrderDeliveryAttached(obj);
		}
	}
	public void deletePfOrderDeliveryAttached(PfOrderDeliveryAttached[] arr) {
		for(PfOrderDeliveryAttached obj: arr) {
			mapper.deletePfOrderDeliveryAttached(obj);
		}
	}
}
