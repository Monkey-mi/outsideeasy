package usercenter.saleManage.tradeManager.response;

import usercenter.saleManage.tradeManager.model.OrderAttchedFile;
import usercenter.saleManage.tradeManager.model.OrderEndRecord;
/**
 * 终止详情
 * @author chenlong
 */
public class OrderStopDetails {
private OrderAttchedFile orderAttchedFile;
private OrderEndRecord orderEndRecord;
public OrderAttchedFile getOrderAttchedFile() {
	return orderAttchedFile;
}
public void setOrderAttchedFile(OrderAttchedFile orderAttchedFile) {
	this.orderAttchedFile = orderAttchedFile;
}
public OrderEndRecord getOrderEndRecord() {
	return orderEndRecord;
}
public void setOrderEndRecord(OrderEndRecord orderEndRecord) {
	this.orderEndRecord = orderEndRecord;
}

}
