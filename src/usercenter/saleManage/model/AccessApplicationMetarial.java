package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationMetarial {
	private int			material_id;
	private String			material_name;
	private String			material_brand;
	private Date			create_dt;
	private int			record_id;
	private int			app_material_id;

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
	public int getApp_material_id() {
		return app_material_id;
	}
	public void setApp_material_id(int app_material_id) {
		this.app_material_id = app_material_id;
	}
	
}
