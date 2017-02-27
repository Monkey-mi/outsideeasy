package usercenter.saleManage.deliveryManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.deliveryManage.model.DeliveryRegisterDetails;


public interface DeliveryRegisterDetailsMapper {
	public List<DeliveryRegisterDetails> getDeliveryRegisterDetailsList(Map<String,Object> params);
	public void addDeliveryRegisterDetails(Map<String,Object> params);
	public void updateDeliveryRegisterDetails(DeliveryRegisterDetails obj);
	public void deleteDeliveryRegisterDetails(Map<String,Object> params);
}
