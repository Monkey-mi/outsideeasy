package usercenter.saleManage.model;

import java.util.Date;

public class CheckfactoryReport {
	private int			id;
	private int			file_type_id;
	private String			file_name;
	private Date			create_dt;
	private Date			check_factory_dt;
	private String			remark;
	private String			operator_name;
	private String			checkor;
	private String			mogodb_id;
	private float			check_score;
	private int			supplier_id;
	
	//附加字段
	private String			owner_cpyname;
	private int			owner_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public float getCheck_score() {
		return check_score;
	}
	public void setCheck_score(float check_score) {
		this.check_score = check_score;
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
	public String getOperator_name() {
		return operator_name;
	}
	public void setOperator_name(String operator_name) {
		this.operator_name = operator_name;
	}
	
	public Date getCheck_factory_dt() {
		return check_factory_dt;
	}
	public void setCheck_factory_dt(Date check_factory_dt) {
		this.check_factory_dt = check_factory_dt;
	}
	
	public String getCheckor() {
		return checkor;
	}
	public void setCheckor(String checkor) {
		this.checkor = checkor;
	}
	@Override
	public String toString() {
		return "CheckfactoryReport [id=" + id + ", file_type_id="
				+ file_type_id + ", file_name=" + file_name + ", create_dt="
				+ create_dt + ", remark=" + remark + ", mogodb_id=" + mogodb_id
				+ ", check_score=" + check_score + ", supplier_id="
				+ supplier_id + ", owner_cpyname=" + owner_cpyname
				+ ", owner_id=" + owner_id + "]";
	}
}
