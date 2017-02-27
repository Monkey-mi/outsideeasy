package manager.supplier.model;

import java.io.Serializable;

import manager.common.Model;


public class MainCustomer extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7120265836389756909L;
	private int			customer_id;
	private String			customer_name;
	private int			company_id;
	private String			company_name;
	
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
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	
}
