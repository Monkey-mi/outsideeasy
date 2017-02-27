package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationCustomer {
	private int			customer_id;
	private String			customer_name;
	private Date			create_dt;
	private int			record_id;
	private int			app_customer_id;

	public int getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getApp_customer_id() {
		return app_customer_id;
	}
	public void setApp_customer_id(int app_customer_id) {
		this.app_customer_id = app_customer_id;
	}
	
}
