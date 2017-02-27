package usercenter.saleManage.model;

import java.util.Date;

public class CheckFactoryCycle {
	private int			factory_cycle_id;
	private String			factory_cycle_name;
	private Date			create_dt;

	public int getFactory_cycle_id() {
		return factory_cycle_id;
	}
	public void setFactory_cycle_id(int factory_cycle_id) {
		this.factory_cycle_id = factory_cycle_id;
	}
	public String getFactory_cycle_name() {
		return factory_cycle_name;
	}
	public void setFactory_cycle_name(String factory_cycle_name) {
		this.factory_cycle_name = factory_cycle_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	
	@Override
	public String toString() {
		return "CheckFactoryCycle [factory_cycle_id=" + factory_cycle_id
				+ ", factory_cycle_name=" + factory_cycle_name + ", create_dt="
				+ create_dt + "]";
	}
	
}
