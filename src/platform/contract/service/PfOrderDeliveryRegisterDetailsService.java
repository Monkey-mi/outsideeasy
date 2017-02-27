package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOrderDeliveryRegisterDetailsMapper;
import platform.contract.model.PfOrderDeliveryRegisterDetails;


@Service
public class PfOrderDeliveryRegisterDetailsService {
	@Autowired
	private PfOrderDeliveryRegisterDetailsMapper mapper;


	public List<PfOrderDeliveryRegisterDetails> getPfOrderDeliveryRegisterDetailsList(Map<String,Object> params) {
		return mapper.getPfOrderDeliveryRegisterDetailsList(params);
	}
	public void addPfOrderDeliveryRegisterDetails(PfOrderDeliveryRegisterDetails[] arr) {
		for(PfOrderDeliveryRegisterDetails obj: arr) {
			mapper.addPfOrderDeliveryRegisterDetails(obj);
		}
	}
	public void updatePfOrderDeliveryRegisterDetails(PfOrderDeliveryRegisterDetails[] arr) {
		for(PfOrderDeliveryRegisterDetails obj: arr) {
			mapper.updatePfOrderDeliveryRegisterDetails(obj);
		}
	}
	public void deletePfOrderDeliveryRegisterDetails(PfOrderDeliveryRegisterDetails[] arr) {
		for(PfOrderDeliveryRegisterDetails obj: arr) {
			mapper.deletePfOrderDeliveryRegisterDetails(obj);
		}
	}
}
