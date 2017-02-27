package usercenter.saleManage.deliveryManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.deliveryManage.model.DeliveryRegister;


public interface DeliveryRegisterMapper {
	public List<DeliveryRegister> getDeliveryRegisterList(Map<String,Object> params);
	public void addDeliveryRegister(Map<String,Object> params);
	public void updateDeliveryRegister(DeliveryRegister obj);
	public void deleteDeliveryRegister(Map<String,Object> params);
}
