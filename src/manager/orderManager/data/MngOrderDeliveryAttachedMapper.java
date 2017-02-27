package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderDeliveryAttached;

public interface MngOrderDeliveryAttachedMapper {
	public List<MngOrderDeliveryAttached> getMngOrderDeliveryAttachedList(Map<String,Object> params);
	public void addMngOrderDeliveryAttached(MngOrderDeliveryAttached obj);
	public void updateMngOrderDeliveryAttached(MngOrderDeliveryAttached obj);
	public void deleteMngOrderDeliveryAttached(MngOrderDeliveryAttached obj);
}