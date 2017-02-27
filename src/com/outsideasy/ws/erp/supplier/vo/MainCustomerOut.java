package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class MainCustomerOut implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5591868415267639118L;
	private int			customer_id;
	private String			customer_name;
	private int             record_id;
	
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
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
	
}
