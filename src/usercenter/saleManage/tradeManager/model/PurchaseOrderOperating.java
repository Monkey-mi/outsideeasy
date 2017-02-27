package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;


/**
 * 订单操作流程表
 * @author chenlong
 */
public class PurchaseOrderOperating implements Serializable{
	private static final long serialVersionUID = 6224531184567261264L;
	private int			operating_id;//订单操作流程表主键
	private int			pur_order_id;//订单ID
	private Date		opreate_dt;//操作时间
	private int		order_status;//订单状态

	public Date getOpreate_dt() {
		return opreate_dt;
	}
	public void setOpreate_dt(Date opreate_dt) {
		this.opreate_dt = opreate_dt;
	}
	public int getOperating_id() {
		return operating_id;
	}
	public void setOperating_id(int operating_id) {
		this.operating_id = operating_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public int getOrder_status() {
		return order_status;
	}
	public void setOrder_status(int order_status) {
		this.order_status = order_status;
	}

}
