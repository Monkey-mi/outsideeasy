package usercenter.saleManage.deliveryManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.deliveryManage.model.DeliveryAttached;


public interface DeliveryAttachedMapper {
	public List<DeliveryAttached> getDeliveryAttachedList(Map<String,Object> params);
	public void addDeliveryAttached(Map<String,Object> params);
	public void updateDeliveryAttached(Map<String,Object> params);
	public void deleteDeliveryAttached(Map<String,Object> params);
}
