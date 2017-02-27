package manager.enquiryQuote.enquiry.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;


public class Enquiry extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 8025225715915431L;
	private int			enquiry_id;
	private int			company_id;
	private String cpyname_cn;
	private Date			enquiry_date;
	private String			enquiry_item;
	private String			invoice;
	private float			tax_rate;
	private String			payment_way;
	private Date			enddate;
	private String			remark;
	private String			enquiry_person;
	private int			enquiry_status;

	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getEnquiry_id() {
		return enquiry_id;
	}
	public void setEnquiry_id(int enquiry_id) {
		this.enquiry_id = enquiry_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public Date getEnquiry_date() {
		return enquiry_date;
	}
	public void setEnquiry_date(Date enquiry_date) {
		this.enquiry_date = enquiry_date;
	}
	public String getEnquiry_item() {
		return enquiry_item;
	}
	public void setEnquiry_item(String enquiry_item) {
		this.enquiry_item = enquiry_item;
	}
	public String getInvoice() {
		return invoice;
	}
	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}
	public float getTax_rate() {
		return tax_rate;
	}
	public void setTax_rate(float tax_rate) {
		this.tax_rate = tax_rate;
	}
	public String getPayment_way() {
		return payment_way;
	}
	public void setPayment_way(String payment_way) {
		this.payment_way = payment_way;
	}
	public Date getEnddate() {
		return enddate;
	}
	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getEnquiry_person() {
		return enquiry_person;
	}
	public void setEnquiry_person(String enquiry_person) {
		this.enquiry_person = enquiry_person;
	}
	public int getEnquiry_status() {
		return enquiry_status;
	}
	public void setEnquiry_status(int enquiry_status) {
		this.enquiry_status = enquiry_status;
	}
}
