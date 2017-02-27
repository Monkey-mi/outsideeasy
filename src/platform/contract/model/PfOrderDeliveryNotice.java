package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfOrderDeliveryNotice implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			delivery_notice_id;
	private String			delivery_notice_bh;
	private Date			notice_dt;
	private int			notice_status;
	private int			source_type;
	private int			creator_id;
	private String			creator_name;
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
	public int getDelivery_notice_id() {
		return delivery_notice_id;
	}
	public void setDelivery_notice_id(int delivery_notice_id) {
		this.delivery_notice_id = delivery_notice_id;
	}
	public String getDelivery_notice_bh() {
		return delivery_notice_bh;
	}
	public void setDelivery_notice_bh(String delivery_notice_bh) {
		this.delivery_notice_bh = delivery_notice_bh;
	}
	public Date getNotice_dt() {
		return notice_dt;
	}
	public void setNotice_dt(Date notice_dt) {
		this.notice_dt = notice_dt;
	}
	public int getNotice_status() {
		return notice_status;
	}
	public void setNotice_status(int notice_status) {
		this.notice_status = notice_status;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public int getCreator_id() {
		return creator_id;
	}
	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}
	public String getCreator_name() {
		return creator_name;
	}
	public void setCreator_name(String creator_name) {
		this.creator_name = creator_name;
	}
}
