package usercenter.purchaseManage.purchaseCategory.model;

import java.util.Date;

public class PurchaseNature {
	private int			purchase_nature_id;
	private String			purchase_nature_name;
	private Date			create_dt;

	public int getPurchase_nature_id() {
		return purchase_nature_id;
	}
	public void setPurchase_nature_id(int purchase_nature_id) {
		this.purchase_nature_id = purchase_nature_id;
	}
	public String getPurchase_nature_name() {
		return purchase_nature_name;
	}
	public void setPurchase_nature_name(String purchase_nature_name) {
		this.purchase_nature_name = purchase_nature_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
