package usercenter.saleManage.tradeManager.data;

import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderRequirement;


public interface OrderRequirementMapper {
	public OrderRequirement getOrderRequirement(Map<String,Object> params);
	public void addOrderRequirement(OrderRequirement obj);
	public void updateOrderRequirement(OrderRequirement obj);
	public void deleteOrderRequirement(OrderRequirement obj);
}
