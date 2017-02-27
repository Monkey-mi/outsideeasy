package usercenter.saleManage.model;

import java.util.Date;

public class CustomerFiles {
	private int			supplier_id;
	private int			owner_id;
	private String			owner_cpyname;
	private int			company_id;
	private Integer			record_id;
	private String			supplier_cpyname;
	private int			file_status;
	private Date			create_dt;
	private Date auth_dt;
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getSupplier_cpyname() {
		return supplier_cpyname;
	}
	public void setSupplier_cpyname(String supplier_cpyname) {
		this.supplier_cpyname = supplier_cpyname;
	}
	public int getFile_status() {
		return file_status;
	}
	public void setFile_status(int file_status) {
		this.file_status = file_status;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getOwner_id() {
		return owner_id;
	}
	public void setOwner_id(int owner_id) {
		this.owner_id = owner_id;
	}
	public String getOwner_cpyname() {
		return owner_cpyname;
	}
	public void setOwner_cpyname(String owner_cpyname) {
		this.owner_cpyname = owner_cpyname;
	}
	public Date getAuth_dt() {
		return auth_dt;
	}
	public void setAuth_dt(Date auth_dt) {
		this.auth_dt = auth_dt;
	}
	public Integer getRecord_id() {
		return record_id;
	}
	public void setRecord_id(Integer record_id) {
		this.record_id = record_id;
	}
	
}
