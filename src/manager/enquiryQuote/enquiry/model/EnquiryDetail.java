package manager.enquiryQuote.enquiry.model;

import java.io.Serializable;

import manager.common.Model;


public class EnquiryDetail extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -5660127651978649990L;
	private int			enquiry_detail_id;
	private int			enquiry_id;
	private int item_order;
	private String			pro_name;
	private int			mc_id;
	private float			qty;
	private String			unit;
	private String			delivery_cycle;
	private String			description;
	private String			attched;

	public int getItem_order() {
		return item_order;
	}
	public void setItem_order(int item_order) {
		this.item_order = item_order;
	}
	public int getEnquiry_detail_id() {
		return enquiry_detail_id;
	}
	public void setEnquiry_detail_id(int enquiry_detail_id) {
		this.enquiry_detail_id = enquiry_detail_id;
	}
	public int getEnquiry_id() {
		return enquiry_id;
	}
	public void setEnquiry_id(int enquiry_id) {
		this.enquiry_id = enquiry_id;
	}
	public String getPro_name() {
		return pro_name;
	}
	public void setPro_name(String pro_name) {
		this.pro_name = pro_name;
	}
	public int getMc_id() {
		return mc_id;
	}
	public void setMc_id(int mc_id) {
		this.mc_id = mc_id;
	}
	public float getQty() {
		return qty;
	}
	public void setQty(float qty) {
		this.qty = qty;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getDelivery_cycle() {
		return delivery_cycle;
	}
	public void setDelivery_cycle(String delivery_cycle) {
		this.delivery_cycle = delivery_cycle;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAttched() {
		return attched;
	}
	public void setAttched(String attched) {
		this.attched = attched;
	}
}
