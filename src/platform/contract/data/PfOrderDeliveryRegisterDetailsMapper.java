package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderDeliveryRegisterDetails;


public interface PfOrderDeliveryRegisterDetailsMapper {
	public List<PfOrderDeliveryRegisterDetails> getPfOrderDeliveryRegisterDetailsList(Map<String,Object> params);
	public void addPfOrderDeliveryRegisterDetails(PfOrderDeliveryRegisterDetails obj);
	public void updatePfOrderDeliveryRegisterDetails(PfOrderDeliveryRegisterDetails obj);
	public void deletePfOrderDeliveryRegisterDetails(PfOrderDeliveryRegisterDetails obj);
}
