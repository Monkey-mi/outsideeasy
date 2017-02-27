package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;

public class CompetitorOut implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1204883239911602931L;
	private int			competitor_id;
	private String			competitor_name;
	private int             record_id;
	
	
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getCompetitor_id() {
		return competitor_id;
	}
	public void setCompetitor_id(int competitor_id) {
		this.competitor_id = competitor_id;
	}
	public String getCompetitor_name() {
		return competitor_name;
	}
	public void setCompetitor_name(String competitor_name) {
		this.competitor_name = competitor_name;
	}
	
}
