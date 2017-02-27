package manager.supplier.model;

import java.io.Serializable;

import manager.common.Model;


public class Metarial extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3812844655947920660L;
	private int			material_id;
	private String			material_name;
	private String			material_brand;
	private int			company_id;
	private String			company_name;
	public int getMaterial_id() {
		return material_id;
	}
	public void setMaterial_id(int material_id) {
		this.material_id = material_id;
	}
	public String getMaterial_name() {
		return material_name;
	}
	public void setMaterial_name(String material_name) {
		this.material_name = material_name;
	}
	public String getMaterial_brand() {
		return material_brand;
	}
	public void setMaterial_brand(String material_brand) {
		this.material_brand = material_brand;
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
