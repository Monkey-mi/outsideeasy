package manager.basicdata.industryClass.model;

import java.io.Serializable;

import manager.common.Model;


public class IndustryClass extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3717977342788617711L;
	private int			industry_id;
	private String			industry_name;

	public int getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(int industry_id) {
		this.industry_id = industry_id;
	}
	public String getIndustry_name() {
		return industry_name;
	}
	public void setIndustry_name(String industry_name) {
		this.industry_name = industry_name;
	}
}
