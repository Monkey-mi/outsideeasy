package usercenter.saleManage.tradeManager.response;
/**
 * 返回订单信息
 * @author chenlong
 */
public class PurchaseOrderRemark {
	private int			    pur_order_id;//主键
	private String			memo;//订单备忘

	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}

	 
}
