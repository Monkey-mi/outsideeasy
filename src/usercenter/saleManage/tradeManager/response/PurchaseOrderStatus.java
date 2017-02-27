package usercenter.saleManage.tradeManager.response;
/**
 * 
 * @author chenlong
 */
public class PurchaseOrderStatus {
	private int			    pur_order_id;//主键
	private int			    status;//订单状态
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
}
