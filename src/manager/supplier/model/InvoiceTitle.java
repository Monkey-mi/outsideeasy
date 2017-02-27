package manager.supplier.model;

import java.io.Serializable;

import manager.common.Model;


public class InvoiceTitle extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -9197838901385876273L;
	private int			invoice_title_id;
	private String			invoice_title_name;
	private int			company_id;
	private boolean			default_id;
	private String			company_name;
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
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public boolean isDefault_id() {
		return default_id;
	}
	public void setDefault_id(boolean default_id) {
		this.default_id = default_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	
}
