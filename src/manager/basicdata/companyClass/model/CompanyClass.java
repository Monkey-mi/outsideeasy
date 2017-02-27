package manager.basicdata.companyClass.model;

import java.io.Serializable;

import manager.common.Model;


public class CompanyClass extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			nature_id;
	private String			nature_name;
	private int			f_id;

	public int getNature_id() {
		return nature_id;
	}
	public void setNature_id(int nature_id) {
		this.nature_id = nature_id;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
}
