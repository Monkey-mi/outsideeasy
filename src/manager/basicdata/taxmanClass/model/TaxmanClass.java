package manager.basicdata.taxmanClass.model;

import java.io.Serializable;

import manager.common.Model;


public class TaxmanClass extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3364270724858622269L;
	private int			taxman_id;
	private String			taxman_name;

	public int getTaxman_id() {
		return taxman_id;
	}
	public void setTaxman_id(int taxman_id) {
		this.taxman_id = taxman_id;
	}
	public String getTaxman_name() {
		return taxman_name;
	}
	public void setTaxman_name(String taxman_name) {
		this.taxman_name = taxman_name;
	}
}
