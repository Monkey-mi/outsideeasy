package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class MetarialOut implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5974046927987625630L;
	private int			material_id;
	private String			material_name;
	private String			material_brand;
	private int             record_id;
	
	
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getMaterial_id() {
		return material_id;
	}
	public void setMaterial_id(int material_id) {
		this.material_id = material_id;
	}
	public String getMaterial_name() {
		return material_name;
	}
	public void setMaterial_name(String material_name) {
		this.material_name = material_name;
	}
	public String getMaterial_brand() {
		return material_brand;
	}
	public void setMaterial_brand(String material_brand) {
		this.material_brand = material_brand;
	}
	
}
