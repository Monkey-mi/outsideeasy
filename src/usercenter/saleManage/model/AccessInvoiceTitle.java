package usercenter.saleManage.model;

import java.util.Date;

public class AccessInvoiceTitle {
	private int			invoice_title_id;
	private String			invoice_title_name;
	private int			default_id;
	private int			invoice_title_sts;
	private int			app_invoice_title_id;
	private Date			create_dt;
	private int			record_id;

	public int getInvoice_title_id() {
		return invoice_title_id;
	}
	public void setInvoice_title_id(int invoice_title_id) {
		this.invoice_title_id = invoice_title_id;
	}
	public String getInvoice_title_name() {
		return invoice_title_name;
	}
	public void setInvoice_title_name(String invoice_title_name) {
		this.invoice_title_name = invoice_title_name;
	}
	public int getDefault_id() {
		return default_id;
	}
	public void setDefault_id(int default_id) {
		this.default_id = default_id;
	}
	public int getInvoice_title_sts() {
		return invoice_title_sts;
	}
	public void setInvoice_title_sts(int invoice_title_sts) {
		this.invoice_title_sts = invoice_title_sts;
	}
	public int getApp_invoice_title_id() {
		return app_invoice_title_id;
	}
	public void setApp_invoice_title_id(int app_invoice_title_id) {
		this.app_invoice_title_id = app_invoice_title_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
}
