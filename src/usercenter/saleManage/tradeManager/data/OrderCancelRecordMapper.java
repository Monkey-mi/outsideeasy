package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderCancelRecord;


public interface OrderCancelRecordMapper {
	public OrderCancelRecord getOrderCancelRecordById(Map<String,Object> params);
	public void addOrderCancelRecord(Map<String,Object> params);
	public void updateOrderCancelRecord(OrderCancelRecord obj);
	public void deleteOrderCancelRecord(OrderCancelRecord obj);
}
