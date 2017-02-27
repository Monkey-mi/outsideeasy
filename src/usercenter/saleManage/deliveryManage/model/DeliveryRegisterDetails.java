package usercenter.saleManage.deliveryManage.model;

public class DeliveryRegisterDetails {
	private int			detail_id;
	private int			register_id;
	private int			order_detail_id;
	private int			pur_order_id;
	private String			order_bh;
	private String			agreement_bh;
	private int			go_type;

	public int getDetail_id() {
		return detail_id;
	}
	public void setDetail_id(int detail_id) {
		this.detail_id = detail_id;
	}
	public int getRegister_id() {
		return register_id;
	}
	public void setRegister_id(int register_id) {
		this.register_id = register_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public int getGo_type() {
		return go_type;
	}
	public void setGo_type(int go_type) {
		this.go_type = go_type;
	}
}
