package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfOrderDeliveryAttached implements Serializable {
	private int			id;
	private int			register_id;
	private String			file_name;
	private String			mogodb_id;
	private String			suffix_name;
	private Date			create_dt;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRegister_id() {
		return register_id;
	}
	public void setRegister_id(int register_id) {
		this.register_id = register_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public String getSuffix_name() {
		return suffix_name;
	}
	public void setSuffix_name(String suffix_name) {
		this.suffix_name = suffix_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
