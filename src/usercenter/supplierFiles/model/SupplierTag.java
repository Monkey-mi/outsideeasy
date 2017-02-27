package usercenter.supplierFiles.model;

import java.util.Date;

public class SupplierTag {
	private int			tag_id;
	private int			account_id;
	private String			tag_name;
	private int			tag_type;//0:公有标签；1：私有标签
	private int			order_by;
	private Date			create_dt;
	private int 		company_id;

	public int getTag_id() {
		return tag_id;
	}
	public void setTag_id(int tag_id) {
		this.tag_id = tag_id;
	}
	public int getAccount_id() {
		return account_id;
	}
	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}
	public String getTag_name() {
		return tag_name;
	}
	public void setTag_name(String tag_name) {
		this.tag_name = tag_name;
	}
	public int getTag_type() {
		return tag_type;
	}
	public void setTag_type(int tag_type) {
		this.tag_type = tag_type;
	}
	public int getOrder_by() {
		return order_by;
	}
	public void setOrder_by(int order_by) {
		this.order_by = order_by;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	
	@Override
	public String toString() {
		return "SupplierTag [tag_id=" + tag_id + ", account_id=" + account_id
				+ ", tag_name=" + tag_name + ", tag_type=" + tag_type
				+ ", order_by=" + order_by + ", create_dt=" + create_dt
				+ ", company_id=" + company_id + "]";
	}
}
