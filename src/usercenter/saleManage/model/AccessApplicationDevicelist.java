package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationDevicelist {
	private int			device_id;
	private String			device_name;
	private String			specifications;
	private String			place;
	private Double			price;
	private Date			buy_day;
	private String			advanced;
	private Integer			device_num;
	private Date			create_dt;
	private int			record_id;
	private int			app_device_id;

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
	public String getSpecifications() {
		return specifications;
	}
	public void setSpecifications(String specifications) {
		this.specifications = specifications;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
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
	public int getApp_device_id() {
		return app_device_id;
	}
	public void setApp_device_id(int app_device_id) {
		this.app_device_id = app_device_id;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getDevice_num() {
		return device_num;
	}
	public void setDevice_num(Integer device_num) {
		this.device_num = device_num;
	}
	
}
