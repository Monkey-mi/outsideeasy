package manager.enquiryQuote.quote.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;


public class Quotation extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8032269271413739606L;
	private int			quotation_id;
	private int			company_id;
	private String cpyname_cn;
	private int			enquiry_detail_id;
	private Date			quote_date;
	private double			material_costs;
	private double			process_cost;
	private double			transportation;
	private String			other_item;
	private double			other_cost;
	private double			vat;
	private double			enquiry_price;
	private int			status;
	public int getQuotation_id() {
		return quotation_id;
	}
	public void setQuotation_id(int quotation_id) {
		this.quotation_id = quotation_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getEnquiry_detail_id() {
		return enquiry_detail_id;
	}
	public void setEnquiry_detail_id(int enquiry_detail_id) {
		this.enquiry_detail_id = enquiry_detail_id;
	}
	public Date getQuote_date() {
		return quote_date;
	}
	public void setQuote_date(Date quote_date) {
		this.quote_date = quote_date;
	}
	public double getMaterial_costs() {
		return material_costs;
	}
	public void setMaterial_costs(double material_costs) {
		this.material_costs = material_costs;
	}
	public double getProcess_cost() {
		return process_cost;
	}
	public void setProcess_cost(double process_cost) {
		this.process_cost = process_cost;
	}
	public double getTransportation() {
		return transportation;
	}
	public void setTransportation(double transportation) {
		this.transportation = transportation;
	}
	public String getOther_item() {
		return other_item;
	}
	public void setOther_item(String other_item) {
		this.other_item = other_item;
	}
	public double getOther_cost() {
		return other_cost;
	}
	public void setOther_cost(double other_cost) {
		this.other_cost = other_cost;
	}
	public double getVat() {
		return vat;
	}
	public void setVat(double vat) {
		this.vat = vat;
	}
	public double getEnquiry_price() {
		return enquiry_price;
	}
	public void setEnquiry_price(double enquiry_price) {
		this.enquiry_price = enquiry_price;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}

}
