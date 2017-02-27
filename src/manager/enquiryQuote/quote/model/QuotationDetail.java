package manager.enquiryQuote.quote.model;

import java.io.Serializable;

import manager.common.Model;


public class QuotationDetail extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1628700502525172466L;
	private int			quodetail_id;
	private int			quotation_id;
	private int			item_order;
	private String			item_name;
	private String			item_description;
	private double			qty;
	private String			uom;
	private double			unit_price;
	private double			total_prcie;

	public int getQuodetail_id() {
		return quodetail_id;
	}
	public void setQuodetail_id(int quodetail_id) {
		this.quodetail_id = quodetail_id;
	}
	public int getQuotation_id() {
		return quotation_id;
	}
	public void setQuotation_id(int quotation_id) {
		this.quotation_id = quotation_id;
	}
	public int getItem_order() {
		return item_order;
	}
	public void setItem_order(int item_order) {
		this.item_order = item_order;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getItem_description() {
		return item_description;
	}
	public void setItem_description(String item_description) {
		this.item_description = item_description;
	}
	public double getQty() {
		return qty;
	}
	public void setQty(double qty) {
		this.qty = qty;
	}
	public String getUom() {
		return uom;
	}
	public void setUom(String uom) {
		this.uom = uom;
	}
	public double getUnit_price() {
		return unit_price;
	}
	public void setUnit_price(double unit_price) {
		this.unit_price = unit_price;
	}
	public double getTotal_prcie() {
		return total_prcie;
	}
	public void setTotal_prcie(double total_prcie) {
		this.total_prcie = total_prcie;
	}

}
