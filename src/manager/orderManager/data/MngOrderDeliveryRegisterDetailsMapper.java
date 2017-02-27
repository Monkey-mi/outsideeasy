package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderDeliveryRegisterDetails;

public interface MngOrderDeliveryRegisterDetailsMapper {
	public List<MngOrderDeliveryRegisterDetails> getMngOrderDeliveryRegisterDetailsList(Map<String,Object> params);
	public void addMngOrderDeliveryRegisterDetails(MngOrderDeliveryRegisterDetails obj);
	public void updateMngOrderDeliveryRegisterDetails(MngOrderDeliveryRegisterDetails obj);
	public void deleteMngOrderDeliveryRegisterDetails(MngOrderDeliveryRegisterDetails obj);
}