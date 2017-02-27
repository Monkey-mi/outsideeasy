package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 订单取消记录表
 * @author chnelong
 */
public class OrderCancelRecord implements Serializable{
	private static final long serialVersionUID = -4302427200058635441L;
	private int			order_cancel_id;//主键
	private int			pur_order_id;//订单ID
	private int			cancel_reason;//取消原因
	private String		cancel_description;//取消说明
	private Date		create_dt;//创建时间

	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getOrder_cancel_id() {
		return order_cancel_id;
	}
	public void setOrder_cancel_id(int order_cancel_id) {
		this.order_cancel_id = order_cancel_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public int getCancel_reason() {
		return cancel_reason;
	}
	public void setCancel_reason(int cancel_reason) {
		this.cancel_reason = cancel_reason;
	}
	public String getCancel_description() {
		return cancel_description;
	}
	public void setCancel_description(String cancel_description) {
		this.cancel_description = cancel_description;
	}
}
