package manager.supplier.model;

import java.io.Serializable;

import manager.common.Model;


public class Competitor extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4464623962629713970L;
	private int			competitor_id;
	private String			competitor_name;
	private int			company_id;
	private String			company_name;
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
