package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfOrderQualitycheck implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			check_id;
	private int			checkor_id;
	private String			checkor_name;
	private Date			check_dt;
	private int			source_type;
	private Date			delivery_dt;
	private String			delivery_number;
	private int pur_company_id;
	private int sup_company_id;
	private int supplier_id;
	
	public int getPur_company_id() {
		return pur_company_id;
	}
	public void setPur_company_id(int pur_company_id) {
		this.pur_company_id = pur_company_id;
	}
	public int getSup_company_id() {
		return sup_company_id;
	}
	public void setSup_company_id(int sup_company_id) {
		this.sup_company_id = sup_company_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getCheck_id() {
		return check_id;
	}
	public void setCheck_id(int check_id) {
		this.check_id = check_id;
	}
	public int getCheckor_id() {
		return checkor_id;
	}
	public void setCheckor_id(int checkor_id) {
		this.checkor_id = checkor_id;
	}
	public String getCheckor_name() {
		return checkor_name;
	}
	public void setCheckor_name(String checkor_name) {
		this.checkor_name = checkor_name;
	}
	public Date getCheck_dt() {
		return check_dt;
	}
	public void setCheck_dt(Date check_dt) {
		this.check_dt = check_dt;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public Date getDelivery_dt() {
		return delivery_dt;
	}
	public void setDelivery_dt(Date delivery_dt) {
		this.delivery_dt = delivery_dt;
	}
	public String getDelivery_number() {
		return delivery_number;
	}
	public void setDelivery_number(String delivery_number) {
		this.delivery_number = delivery_number;
	}
}
