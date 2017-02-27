package usercenter.saleManage.tradeManager.response;

import java.util.List;

import usercenter.saleManage.tradeManager.model.OrderDeliveryNotice;
/**
 * 详情送货通知
 * @author chenlong
 */
public class OrderDeleveryNoticeVo {
private OrderDeliveryNotice orderDeliveryNotice;//送货
private List<OrderDeliveryVo> orderDeliveryVos;//明细
private Integer count;//明细条数
public OrderDeliveryNotice getOrderDeliveryNotice() {
	return orderDeliveryNotice;
}
public void setOrderDeliveryNotice(OrderDeliveryNotice orderDeliveryNotice) {
	this.orderDeliveryNotice = orderDeliveryNotice;
}
public List<OrderDeliveryVo> getOrderDeliveryVos() {
	return orderDeliveryVos;
}
public void setOrderDeliveryVos(List<OrderDeliveryVo> orderDeliveryVos) {
	this.orderDeliveryVos = orderDeliveryVos;
}
public Integer getCount() {
	return count;
}
public void setCount(Integer count) {
	this.count = count;
}

}
