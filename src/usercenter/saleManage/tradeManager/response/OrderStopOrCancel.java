package usercenter.saleManage.tradeManager.response;

import usercenter.saleManage.tradeManager.model.OrderCancelRecord;
/**
 * 查看终止和取消的原因
 * @author chenlong
 */
public class OrderStopOrCancel {
	private OrderStopDetails orderStopDetails;//终止详情
	private OrderCancelRecord orderCancelRecord;//取消记录
	public OrderStopDetails getOrderStopDetails() {
		return orderStopDetails;
	}
	public void setOrderStopDetails(OrderStopDetails orderStopDetails) {
		this.orderStopDetails = orderStopDetails;
	}
	public OrderCancelRecord getOrderCancelRecord() {
		return orderCancelRecord;
	}
	public void setOrderCancelRecord(OrderCancelRecord orderCancelRecord) {
		this.orderCancelRecord = orderCancelRecord;
	}
	

}
