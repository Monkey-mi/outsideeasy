package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class InvoiceTitleOut implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5834481726137101429L;
	private int			invoice_title_id;
	private String			invoice_title_name;
	private boolean			default_id;
	private int             record_id;
	
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getInvoice_title_id() {
		return invoice_title_id;
	}
	public void setInvoice_title_id(int invoice_title_id) {
		this.invoice_title_id = invoice_title_id;
	}
	public String getInvoice_title_name() {
		return invoice_title_name;
	}
	public void setInvoice_title_name(String invoice_title_name) {
		this.invoice_title_name = invoice_title_name;
	}
	public boolean isDefault_id() {
		return default_id;
	}
	public void setDefault_id(boolean default_id) {
		this.default_id = default_id;
	}
	
}
