package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class MaterialLevelOut implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5417082807526121253L;
	private int			level_id;
	private String			level_name;
	public int getLevel_id() {
		return level_id;
	}
	public void setLevel_id(int level_id) {
		this.level_id = level_id;
	}
	public String getLevel_name() {
		return level_name;
	}
	public void setLevel_name(String level_name) {
		this.level_name = level_name;
	}
	
}
