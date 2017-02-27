package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfPurchaseOrder implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			pur_order_id;
	private String			order_bh;
	private String			agreement_bh;
	private int			order_status;
	private Date			create_dt;
	private int			category_id;
	private int			supplier_id;
	private double			sum_money;
	private int			pur_company_id;
	private String			pur_cpyname_cn;
	private int			pur_creator_id;
	private String			pur_creator_name;
	private int			invoice_title_id;
	private int			pur_invoice_type;
	private String			pur_invoice_title;
	private int			delivery_address_id;
	private String			pur_delivery_address;
	private String			pur_delivery_contact;
	private String			pur_delivery_contact_phone;
	private String			pur_memo;
	private int			sup_company_id;
	private String			sup_cpyname_cn;
	private String			sup_contact;
	private String			sup_contact_phone;
	private String			sup_contact_address;
	private String			sup_memo;
	private String			order_remark;
	private int			pur_delete_flag;
	private int			sup_delete_flag;
	private int			source_type;
	private int			lock_agreement;
	private Date			delivery_date;

	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public int getOrder_status() {
		return order_status;
	}
	public void setOrder_status(int order_status) {
		this.order_status = order_status;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public double getSum_money() {
		return sum_money;
	}
	public void setSum_money(double sum_money) {
		this.sum_money = sum_money;
	}
	public int getPur_company_id() {
		return pur_company_id;
	}
	public void setPur_company_id(int pur_company_id) {
		this.pur_company_id = pur_company_id;
	}
	public String getPur_cpyname_cn() {
		return pur_cpyname_cn;
	}
	public void setPur_cpyname_cn(String pur_cpyname_cn) {
		this.pur_cpyname_cn = pur_cpyname_cn;
	}
	public int getPur_creator_id() {
		return pur_creator_id;
	}
	public void setPur_creator_id(int pur_creator_id) {
		this.pur_creator_id = pur_creator_id;
	}
	public String getPur_creator_name() {
		return pur_creator_name;
	}
	public void setPur_creator_name(String pur_creator_name) {
		this.pur_creator_name = pur_creator_name;
	}
	public int getInvoice_title_id() {
		return invoice_title_id;
	}
	public void setInvoice_title_id(int invoice_title_id) {
		this.invoice_title_id = invoice_title_id;
	}
	public int getPur_invoice_type() {
		return pur_invoice_type;
	}
	public void setPur_invoice_type(int pur_invoice_type) {
		this.pur_invoice_type = pur_invoice_type;
	}
	public String getPur_invoice_title() {
		return pur_invoice_title;
	}
	public void setPur_invoice_title(String pur_invoice_title) {
		this.pur_invoice_title = pur_invoice_title;
	}
	public int getDelivery_address_id() {
		return delivery_address_id;
	}
	public void setDelivery_address_id(int delivery_address_id) {
		this.delivery_address_id = delivery_address_id;
	}
	public String getPur_delivery_address() {
		return pur_delivery_address;
	}
	public void setPur_delivery_address(String pur_delivery_address) {
		this.pur_delivery_address = pur_delivery_address;
	}
	public String getPur_delivery_contact() {
		return pur_delivery_contact;
	}
	public void setPur_delivery_contact(String pur_delivery_contact) {
		this.pur_delivery_contact = pur_delivery_contact;
	}
	public String getPur_delivery_contact_phone() {
		return pur_delivery_contact_phone;
	}
	public void setPur_delivery_contact_phone(String pur_delivery_contact_phone) {
		this.pur_delivery_contact_phone = pur_delivery_contact_phone;
	}
	public String getPur_memo() {
		return pur_memo;
	}
	public void setPur_memo(String pur_memo) {
		this.pur_memo = pur_memo;
	}
	public int getSup_company_id() {
		return sup_company_id;
	}
	public void setSup_company_id(int sup_company_id) {
		this.sup_company_id = sup_company_id;
	}
	public String getSup_cpyname_cn() {
		return sup_cpyname_cn;
	}
	public void setSup_cpyname_cn(String sup_cpyname_cn) {
		this.sup_cpyname_cn = sup_cpyname_cn;
	}
	public String getSup_contact() {
		return sup_contact;
	}
	public void setSup_contact(String sup_contact) {
		this.sup_contact = sup_contact;
	}
	public String getSup_contact_phone() {
		return sup_contact_phone;
	}
	public void setSup_contact_phone(String sup_contact_phone) {
		this.sup_contact_phone = sup_contact_phone;
	}
	public String getSup_contact_address() {
		return sup_contact_address;
	}
	public void setSup_contact_address(String sup_contact_address) {
		this.sup_contact_address = sup_contact_address;
	}
	public String getSup_memo() {
		return sup_memo;
	}
	public void setSup_memo(String sup_memo) {
		this.sup_memo = sup_memo;
	}
	public String getOrder_remark() {
		return order_remark;
	}
	public void setOrder_remark(String order_remark) {
		this.order_remark = order_remark;
	}
	public int getPur_delete_flag() {
		return pur_delete_flag;
	}
	public void setPur_delete_flag(int pur_delete_flag) {
		this.pur_delete_flag = pur_delete_flag;
	}
	public int getSup_delete_flag() {
		return sup_delete_flag;
	}
	public void setSup_delete_flag(int sup_delete_flag) {
		this.sup_delete_flag = sup_delete_flag;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public int getLock_agreement() {
		return lock_agreement;
	}
	public void setLock_agreement(int lock_agreement) {
		this.lock_agreement = lock_agreement;
	}
	public Date getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(Date delivery_date) {
		this.delivery_date = delivery_date;
	}
}
