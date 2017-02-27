package manager.supplier.model;

import java.util.Date;

public class MngSupplierMaterialcheck {
	private int			materialcheck_id;
	private String			file_name;
	private Date			create_dt;
	private String			remark;
	private String			mogodb_id;
	private int			supplier_id;
	private int			source_type;
	private int			operator_id;
	private String			operator_name;
	private int			send_company_id;

	public int getMaterialcheck_id() {
		return materialcheck_id;
	}
	public void setMaterialcheck_id(int materialcheck_id) {
		this.materialcheck_id = materialcheck_id;
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
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
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
}
