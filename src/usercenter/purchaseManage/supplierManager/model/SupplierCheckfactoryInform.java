package usercenter.purchaseManage.supplierManager.model;

import java.util.Date;

public class SupplierCheckfactoryInform {
	private int			checkinform_id;
	private String			file_name;
	private Date			create_dt;
	private String			remark;
	private String			mogodb_id;
	private int			status;
	private int			supplier_id;
	private Date			update_dt;
	private Date			plan_check_dt;
	private int			operator_id;
	private String			operator_name;
	private int			send_company_id;
	private String			check_man;
	private String			check_man_phone;
	
	private String supplier_cpyname;
	private Integer company_id;

	
	public Integer getCompany_id() {
		return company_id;
	}
	public void setCompany_id(Integer company_id) {
		this.company_id = company_id;
	}
	public String getSupplier_cpyname() {
		return supplier_cpyname;
	}
	public void setSupplier_cpyname(String supplier_cpyname) {
		this.supplier_cpyname = supplier_cpyname;
	}
	public int getCheckinform_id() {
		return checkinform_id;
	}
	public void setCheckinform_id(int checkinform_id) {
		this.checkinform_id = checkinform_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public Date getUpdate_dt() {
		return update_dt;
	}
	public void setUpdate_dt(Date update_dt) {
		this.update_dt = update_dt;
	}
	public Date getPlan_check_dt() {
		return plan_check_dt;
	}
	public void setPlan_check_dt(Date plan_check_dt) {
		this.plan_check_dt = plan_check_dt;
	}
	public int getOperator_id() {
		return operator_id;
	}
	public void setOperator_id(int operator_id) {
		this.operator_id = operator_id;
	}
	public String getOperator_name() {
		return operator_name;
	}
	public void setOperator_name(String operator_name) {
		this.operator_name = operator_name;
	}

	public int getSend_company_id() {
		return send_company_id;
	}
	public void setSend_company_id(int send_company_id) {
		this.send_company_id = send_company_id;
	}
	public String getCheck_man() {
		return check_man;
	}
	public void setCheck_man(String check_man) {
		this.check_man = check_man;
	}
	public String getCheck_man_phone() {
		return check_man_phone;
	}
	public void setCheck_man_phone(String check_man_phone) {
		this.check_man_phone = check_man_phone;
	}
	@Override
	public String toString() {
		return "SupplierCheckfactoryInform [checkinform_id=" + checkinform_id
				+ ", file_name=" + file_name + ", create_dt=" + create_dt
				+ ", remark=" + remark + ", mogodb_id=" + mogodb_id
				+ ", status=" + status + ", supplier_id=" + supplier_id
				+ ", update_dt=" + update_dt + ", plan_check_dt="
				+ plan_check_dt + ", operator_id=" + operator_id
				+ ", operator_name=" + operator_name + ", send_company_id="
				+ send_company_id + ", check_man=" + check_man
				+ ", check_man_phone=" + check_man_phone
				+ ", supplier_cpyname=" + supplier_cpyname + ", company_id="
				+ company_id + "]";
	}
}
