package usercenter.common.communication.model;

import java.sql.Date;

public class AccountCommunDel {
	private int info_id;
	private int commu_id;
	private int account_id;
	private int account_type;
	private Date create_dt;
	private int commu_type;

	public int getCommu_type() {
		return commu_type;
	}
	public void setCommu_type(int commu_type) {
		this.commu_type = commu_type;
	}
	public int getInfo_id() {
		return info_id;
	}
	public void setInfo_id(int info_id) {
		this.info_id = info_id;
	}
	public int getCommu_id() {
		return commu_id;
	}
	public void setCommu_id(int commu_id) {
		this.commu_id = commu_id;
	}
	public int getAccount_id() {
		return account_id;
	}
	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}
	public int getAccount_type() {
		return account_type;
	}
	public void setAccount_type(int account_type) {
		this.account_type = account_type;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	
}
