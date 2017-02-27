package usercenter.supplierFiles.model;

import java.util.Date;

public class SupplierFactoryCycleInfo {
	private int			id;
	private int			supplier_id;
	private int			factory_cycle_id;
	private Date			create_dt;
	private Date			next_check_dt;

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
	public int getFactory_cycle_id() {
		return factory_cycle_id;
	}
	public void setFactory_cycle_id(int factory_cycle_id) {
		this.factory_cycle_id = factory_cycle_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public Date getNext_check_dt() {
		return next_check_dt;
	}
	public void setNext_check_dt(Date next_check_dt) {
		this.next_check_dt = next_check_dt;
	}
}
