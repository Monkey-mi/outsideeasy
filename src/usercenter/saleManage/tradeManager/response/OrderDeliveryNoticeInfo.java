package usercenter.saleManage.tradeManager.response;

import java.util.List;


/**
 * 送货通知
 * @author chenlong
 */
public class OrderDeliveryNoticeInfo {
	private OrderDeliverNoticeVr orderDeliveryNotice;//送货
	private List<OrderDeliveryVoInfo> orderDeliveryVoInfos;//明细
	
	public OrderDeliverNoticeVr getOrderDeliveryNotice() {
		return orderDeliveryNotice;
	}
	public void setOrderDeliveryNotice(OrderDeliverNoticeVr orderDeliveryNotice) {
		this.orderDeliveryNotice = orderDeliveryNotice;
	}
	public List<OrderDeliveryVoInfo> getOrderDeliveryVoInfos() {
		return orderDeliveryVoInfos;
	}
	public void setOrderDeliveryVoInfos(
			List<OrderDeliveryVoInfo> orderDeliveryVoInfos) {
		this.orderDeliveryVoInfos = orderDeliveryVoInfos;
	}
	@Override
	public String toString() {
		return "OrderDeliveryNoticeInfo [orderDeliveryNotice="
				+ orderDeliveryNotice + ", orderDeliveryVoInfos="
				+ orderDeliveryVoInfos + "]";
	}

}
