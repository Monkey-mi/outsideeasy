package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderDeliveryAttached;


public interface PfOrderDeliveryAttachedMapper {
	public List<PfOrderDeliveryAttached> getPfOrderDeliveryAttachedList(Map<String,Object> params);
	public void addPfOrderDeliveryAttached(PfOrderDeliveryAttached obj);
	public void updatePfOrderDeliveryAttached(PfOrderDeliveryAttached obj);
	public void deletePfOrderDeliveryAttached(PfOrderDeliveryAttached obj);
}
