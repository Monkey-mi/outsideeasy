package usercenter.saleManage.model;

import java.util.Date;

public class CheckfactoryInform {
	private int			checkinform_id;
	private int			file_type_id;
	private String			file_name;
	private Date			create_dt;
	private Date			plan_check_dt;
	private String			remark;
	private String			operator_name;
	private String			check_man;
	private String			check_man_phone;
	private String			mogodb_id;
	private int			status;
	private int			supplier_id;
	//附加字段
	private String			owner_cpyname;
	private int			owner_id;
	public int getCheckinform_id() {
		return checkinform_id;
	}
	public void setCheckinform_id(int checkinform_id) {
		this.checkinform_id = checkinform_id;
	}
	public int getFile_type_id() {
		return file_type_id;
	}
	public void setFile_type_id(int file_type_id) {
		this.file_type_id = file_type_id;
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
	public String getOwner_cpyname() {
		return owner_cpyname;
	}
	public void setOwner_cpyname(String owner_cpyname) {
		this.owner_cpyname = owner_cpyname;
	}
	public int getOwner_id() {
		return owner_id;
	}
	public void setOwner_id(int owner_id) {
		this.owner_id = owner_id;
	}
	public Date getPlan_check_dt() {
		return plan_check_dt;
	}
	public void setPlan_check_dt(Date plan_check_dt) {
		this.plan_check_dt = plan_check_dt;
	}
	public String getOperator_name() {
		return operator_name;
	}
	public void setOperator_name(String operator_name) {
		this.operator_name = operator_name;
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
	
}
