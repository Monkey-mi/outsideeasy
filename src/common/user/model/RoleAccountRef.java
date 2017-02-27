package common.user.model;

import java.io.Serializable;
import java.util.Date;

public class RoleAccountRef implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3489584393828533195L;
	private int			ID;
	private int			account_id;
	private int			role_id;
	private int			account_type;
	private Date			create_dt;

	public int getID() {
		return ID;
	}
	public void setID(int ID) {
		this.ID = ID;
	}
	public int getAccount_id() {
		return account_id;
	}
	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
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
