package usercenter.supplierFiles.model;

import java.io.Serializable;
import java.util.Date;

public class SupplierTagInfo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -9148193984455447807L;
	private int			id;
	private int			supplier_id;
	private int			tag_id;
	private Date			create_dt;
	private String tag_name;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public int getTag_id() {
		return tag_id;
	}
	public void setTag_id(int tag_id) {
		this.tag_id = tag_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getTag_name() {
		return tag_name;
	}
	public void setTag_name(String tag_name) {
		this.tag_name = tag_name;
	}
	
	@Override
	public String toString() {
		return "SupplierTagInfo [id=" + id + ", supplier_id=" + supplier_id
				+ ", tag_id=" + tag_id + ", create_dt=" + create_dt
				+ ", tag_name=" + tag_name + "]";
	}
}
