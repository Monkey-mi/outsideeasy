package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;
import java.util.Date;

public class DeviceOut implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2119715911336857973L;
	private int			device_id;
	private String			device_name;
	private String			format;
	private String			place;
	private double			price;
	private Date			buy_day;
	private String			advanced;
	private int record_id;
	private int device_num;
	
	
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getDevice_id() {
		return device_id;
	}
	public void setDevice_id(int device_id) {
		this.device_id = device_id;
	}
	public String getDevice_name() {
		return device_name;
	}
	public void setDevice_name(String device_name) {
		this.device_name = device_name;
	}
	public String getFormat() {
		return format;
	}
	public void setFormat(String format) {
		this.format = format;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Date getBuy_day() {
		return buy_day;
	}
	public void setBuy_day(Date buy_day) {
		this.buy_day = buy_day;
	}
	public String getAdvanced() {
		return advanced;
	}
	public void setAdvanced(String advanced) {
		this.advanced = advanced;
	}
	public int getDevice_num() {
		return device_num;
	}
	public void setDevice_num(int device_num) {
		this.device_num = device_num;
	}
	
}
