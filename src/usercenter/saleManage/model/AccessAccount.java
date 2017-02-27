package usercenter.saleManage.model;

import java.util.Date;

public class AccessAccount {
	private int			account_id;
	private String			account_name;
	private int			default_id;
	private String			account_code;
	private int			account_sts;
	private int			app_account_id;
	private Date			create_dt;
	private int			record_id;

	public int getAccount_id() {
		return account_id;
	}
	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}
	public String getAccount_name() {
		return account_name;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	public int getDefault_id() {
		return default_id;
	}
	public void setDefault_id(int default_id) {
		this.default_id = default_id;
	}
	public String getAccount_code() {
		return account_code;
	}
	public void setAccount_code(String account_code) {
		this.account_code = account_code;
	}
	public int getAccount_sts() {
		return account_sts;
	}
	public void setAccount_sts(int account_sts) {
		this.account_sts = account_sts;
	}
	public int getApp_account_id() {
		return app_account_id;
	}
	public void setApp_account_id(int app_account_id) {
		this.app_account_id = app_account_id;
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
