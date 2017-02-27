package usercenter.saleManage.model;

import java.io.Serializable;
import java.util.Date;

public class Materialcheck implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6112931017690325178L;
	private int			materialcheck_id;
	private int			file_type_id;
	private String			file_name;
	private Date			create_dt;
	private String			remark;
	private String			mogodb_id;
	private int			supplier_id;
	
	//附加字段
	private String			owner_cpyname;
	private int			owner_id;
	public int getMaterialcheck_id() {
		return materialcheck_id;
	}
	public void setMaterialcheck_id(int materialcheck_id) {
		this.materialcheck_id = materialcheck_id;
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
	
}
