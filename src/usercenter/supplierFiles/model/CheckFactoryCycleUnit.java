package usercenter.supplierFiles.model;

import java.util.Date;

public class CheckFactoryCycleUnit {
	private int			factory_cycle_id;
	private String			factory_cycle_name;
	private Date			create_dt;
	private Integer         cycle_value;

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
	public Integer getCycle_value() {
		return cycle_value;
	}
	public void setCycle_value(Integer cycle_value) {
		this.cycle_value = cycle_value;
	}
	
	@Override
	public String toString() {
		return "CheckFactoryCycleUnit [factory_cycle_id=" + factory_cycle_id
				+ ", factory_cycle_name=" + factory_cycle_name + ", create_dt="
				+ create_dt + ", cycle_value=" + cycle_value + "]";
	}
}
