package usercenter.saleManage.tradeManager.data;

import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderEndRecord;


public interface OrderEndRecordMapper {
	public OrderEndRecord getOrderEndRecordById(Map<String,Object> params);
	public void addOrderEndRecord(Map<String,Object> params);
	public void updateOrderEndRecord(Map<String,Object> params);
	public void deleteOrderEndRecord(OrderEndRecord obj);
	public OrderEndRecord getOrderEndRecordByIdForOut(Map<String,Object> params);
	public void updateOrderEndRecordStop(Map<String,Object> params);
}
