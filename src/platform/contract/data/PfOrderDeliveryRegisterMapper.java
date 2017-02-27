package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderDeliveryRegister;


public interface PfOrderDeliveryRegisterMapper {
	public List<PfOrderDeliveryRegister> getPfOrderDeliveryRegisterList(Map<String,Object> params);
	public void addPfOrderDeliveryRegister(PfOrderDeliveryRegister obj);
	public void updatePfOrderDeliveryRegisterIsGet(Map<String,Object> params);
	public void deletePfOrderDeliveryRegister(PfOrderDeliveryRegister obj);
}
