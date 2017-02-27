package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationGoods {
	private int			goods_id;
	private String			goods_name;
	private String			goods_brand;
	private Date			create_dt;
	private int			record_id;
	private int			app_goods_id;

	public int getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	public String getGoods_brand() {
		return goods_brand;
	}
	public void setGoods_brand(String goods_brand) {
		this.goods_brand = goods_brand;
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
	public int getApp_goods_id() {
		return app_goods_id;
	}
	public void setApp_goods_id(int app_goods_id) {
		this.app_goods_id = app_goods_id;
	}
	
}
