package usercenter.supplierFiles.model;

import java.util.Date;

public class SupplierOwnerInfo {
	private int			s_c_id;
	private int			supplier_id;
	private int			company_id;
	private Date			create_dt;
	private String			owner_cpyname;

	public int getS_c_id() {
		return s_c_id;
	}
	public void setS_c_id(int s_c_id) {
		this.s_c_id = s_c_id;
	}
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
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getOwner_cpyname() {
		return owner_cpyname;
	}
	public void setOwner_cpyname(String owner_cpyname) {
		this.owner_cpyname = owner_cpyname;
	}
}
