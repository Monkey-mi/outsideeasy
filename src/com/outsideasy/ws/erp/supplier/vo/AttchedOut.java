package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class AttchedOut implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2861518769395664717L;
	private int			id;
	private int			company_id;
	private String		file_name;
	private String		file_path;
	private String      mogodb_id;
	private String      file_format;
	private int ismust;
	private String type_name;
	
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	public String getFile_format() {
		return file_format;
	}
	public void setFile_format(String file_format) {
		this.file_format = file_format;
	}
	public int getIsmust() {
		return ismust;
	}
	public void setIsmust(int ismust) {
		this.ismust = ismust;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	
}
