package manager.orderManager.model;

import java.io.Serializable;
import java.util.Date;

public class MngCommunication implements Serializable{
	private static final long serialVersionUID = 6185429120167374914L;
	private int			id;
	private int			bus_id;
	private int			parent_id;
	private Date			create_time;
	private int			company_id;
	private String			com_message;
	private int			module_type;
	private int			is_look;
	private String			company_name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBus_id() {
		return bus_id;
	}
	public void setBus_id(int bus_id) {
		this.bus_id = bus_id;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public String getCom_message() {
		return com_message;
	}
	public void setCom_message(String com_message) {
		this.com_message = com_message;
	}
	public int getModule_type() {
		return module_type;
	}
	public void setModule_type(int module_type) {
		this.module_type = module_type;
	}
	public int getIs_look() {
		return is_look;
	}
	public void setIs_look(int is_look) {
		this.is_look = is_look;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	
}
