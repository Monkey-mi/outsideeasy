package platform.contract.model;
/*
 * po_out_htmxb
 * */
public class PfOutHtmxb {
	private int			id;
	private float			htbh;
	private float			htxh;
	private int			pur_order_id;
	private int			order_detail_id;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float getHtbh() {
		return htbh;
	}
	public void setHtbh(float htbh) {
		this.htbh = htbh;
	}
	public float getHtxh() {
		return htxh;
	}
	public void setHtxh(float htxh) {
		this.htxh = htxh;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
}
