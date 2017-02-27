package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class GoodsOut implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -422575672138471571L;
	private int			goods_id;
	private String			goods_name;
	private String			goods_brand;
	private int             record_id;
	
	
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
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
	
}
