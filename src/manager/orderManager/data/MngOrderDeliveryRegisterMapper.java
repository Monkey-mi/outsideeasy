package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderDeliveryRegister;

public interface MngOrderDeliveryRegisterMapper {
	public List<MngOrderDeliveryRegister> getMngOrderDeliveryRegisterList(Map<String,Object> params);
	public void addMngOrderDeliveryRegister(MngOrderDeliveryRegister obj);
	public void updateMngOrderDeliveryRegister(MngOrderDeliveryRegister obj);
	public void deleteMngOrderDeliveryRegister(MngOrderDeliveryRegister obj);
}