package manager.orderManager.data;

import java.util.Map;

import manager.orderManager.model.MngOrderRequirement;


public interface MngOrderRequirementMapper {
	public MngOrderRequirement getOrderRequirementList(Map<String,Object> params);
	public void addOrderRequirement(MngOrderRequirement obj);
	public void updateOrderRequirement(MngOrderRequirement obj);
	public void deleteOrderRequirement(MngOrderRequirement obj);
}
