package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 送货通知明细表
 * @author lenovo
 */
public class OrderDeliveryNoticedetails implements Serializable{
	private static final long serialVersionUID = 6766322086891317433L;
	private int			details_id;//主键
	private int			delivery_notice_id;//送货通知表ID
	private int			order_detail_id;//产品明细表ID
	private Date		notice_delivery_time;//通知交期日期
	private Date		confirm_delivery_time;//确认交期日期
	private int			number;//交期数量
	private int	        pur_order_id;//订单id
	private String      delivery_address;//送货仓库

	public String getDelivery_address() {
		return delivery_address;
	}
	public void setDelivery_address(String delivery_address) {
		this.delivery_address = delivery_address;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public int getDetails_id() {
		return details_id;
	}
	public void setDetails_id(int details_id) {
		this.details_id = details_id;
	}
	public int getDelivery_notice_id() {
		return delivery_notice_id;
	}
	public void setDelivery_notice_id(int delivery_notice_id) {
		this.delivery_notice_id = delivery_notice_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public Date getNotice_delivery_time() {
		return notice_delivery_time;
	}
	public void setNotice_delivery_time(Date notice_delivery_time) {
		this.notice_delivery_time = notice_delivery_time;
	}
	public Date getConfirm_delivery_time() {
		return confirm_delivery_time;
	}
	public void setConfirm_delivery_time(Date confirm_delivery_time) {
		this.confirm_delivery_time = confirm_delivery_time;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
}
