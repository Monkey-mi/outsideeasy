package manager.company.model;

import java.io.Serializable;
import java.util.Date;

import javax.annotation.Resource;

import manager.common.Model;

import org.springframework.stereotype.Service;


@Service
public class MngCompany extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -294090742399994747L;
	private int			company_id;
	private String			company_name;
	private Date			create_dt;

	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}