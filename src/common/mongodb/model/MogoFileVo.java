package common.mongodb.model;

public class MogoFileVo {
	private String mogodb_id;
	private Integer bus_id;
	private String table_name;
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public Integer getBus_id() {
		return bus_id;
	}
	public void setBus_id(Integer bus_id) {
		this.bus_id = bus_id;
	}
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	
}
