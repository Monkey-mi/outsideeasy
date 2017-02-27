package manager.enquiryQuote.enquiry.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;


public class EnquiryDistribution extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3618505977382208277L;
	private int			distribution_id;
	private int			enquiry_id;
	private Date			distribute_date;
	private int			company_id;
	private String cpyname_cn;
	
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getDistribution_id() {
		return distribution_id;
	}
	public void setDistribution_id(int distribution_id) {
		this.distribution_id = distribution_id;
	}
	public int getEnquiry_id() {
		return enquiry_id;
	}
	public void setEnquiry_id(int enquiry_id) {
		this.enquiry_id = enquiry_id;
	}
	public Date getDistribute_date() {
		return distribute_date;
	}
	public void setDistribute_date(Date distribute_date) {
		this.distribute_date = distribute_date;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
