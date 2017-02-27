package usercenter.saleManage.model;

import java.util.Date;

public class AdmittanceAudit {
	private int			audit_id;
	private int			record_id;
	private int			audit_status;
	private String			audit_opinion;
	private Date			create_dt;
	private Date			apply_submit_dt;
	
	public int getAudit_id() {
		return audit_id;
	}
	public void setAudit_id(int audit_id) {
		this.audit_id = audit_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getAudit_status() {
		return audit_status;
	}
	public void setAudit_status(int audit_status) {
		this.audit_status = audit_status;
	}
	public String getAudit_opinion() {
		return audit_opinion;
	}
	public void setAudit_opinion(String audit_opinion) {
		this.audit_opinion = audit_opinion;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public Date getApply_submit_dt() {
		return apply_submit_dt;
	}
	public void setApply_submit_dt(Date apply_submit_dt) {
		this.apply_submit_dt = apply_submit_dt;
	}
	
}
