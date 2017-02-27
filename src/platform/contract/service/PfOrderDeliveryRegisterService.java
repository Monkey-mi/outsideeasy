package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOrderDeliveryRegisterMapper;
import platform.contract.model.PfOrderDeliveryRegister;


@Service
public class PfOrderDeliveryRegisterService {
	@Autowired
	private PfOrderDeliveryRegisterMapper mapper;


	public List<PfOrderDeliveryRegister> getPfOrderDeliveryRegisterList(Map<String,Object> params) {
		return mapper.getPfOrderDeliveryRegisterList(params);
	}
	public void addPfOrderDeliveryRegister(PfOrderDeliveryRegister[] arr) {
		for(PfOrderDeliveryRegister obj: arr) {
			mapper.addPfOrderDeliveryRegister(obj);
		}
	}
	public void updatePfOrderDeliveryRegisterIsGet(Map<String,Object> params) {
			mapper.updatePfOrderDeliveryRegisterIsGet(params);
	}
	public void deletePfOrderDeliveryRegister(PfOrderDeliveryRegister[] arr) {
		for(PfOrderDeliveryRegister obj: arr) {
			mapper.deletePfOrderDeliveryRegister(obj);
		}
	}
}
