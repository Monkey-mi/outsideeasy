package manager.supplier.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class AuthcationInfo extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1241297849221403246L;
	private int			auth_id;
	private int			company_id;
	private int			auth_state;
	private String			auth_opinion;
	private Date			create_dt;

	public int getAuth_id() {
		return auth_id;
	}
	public void setAuth_id(int auth_id) {
		this.auth_id = auth_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public int getAuth_state() {
		return auth_state;
	}
	public void setAuth_state(int auth_state) {
		this.auth_state = auth_state;
	}
	public String getAuth_opinion() {
		return auth_opinion;
	}
	public void setAuth_opinion(String auth_opinion) {
		this.auth_opinion = auth_opinion;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
