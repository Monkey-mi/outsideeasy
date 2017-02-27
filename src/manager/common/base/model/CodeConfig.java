package manager.common.base.model;

import java.io.Serializable;

import manager.common.Model;



public class CodeConfig extends Model implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5006900386394703432L;
	private int id;
	private String name;
	private String code_type;
	private String type;
	private String displayField;
	private String valueField;
	private String con_type;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode_type() {
		return code_type;
	}
	public void setCode_type(String code_type) {
		this.code_type = code_type;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDisplayField() {
		return displayField;
	}
	public void setDisplayField(String displayField) {
		this.displayField = displayField;
	}
	public String getValueField() {
		return valueField;
	}
	public void setValueField(String valueField) {
		this.valueField = valueField;
	}
	public String getCon_type() {
		return con_type;
	}
	public void setCon_type(String conType) {
		con_type = conType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
