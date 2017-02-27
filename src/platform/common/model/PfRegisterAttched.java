package platform.common.model;

import java.util.Date;

public class PfRegisterAttched {
	private int			id;
	private int			company_id;
	private int			file_type_id;
	private String			file_name;
	private String			file_path;
	private Date			create_dt;
	private String			file_format;
	private int			ismust;
	private String			remark;
	private int			iscustom;
	private String			mogodb_id;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
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
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getFile_format() {
		return file_format;
	}
	public void setFile_format(String file_format) {
		this.file_format = file_format;
	}
	public int getIsmust() {
		return ismust;
	}
	public void setIsmust(int ismust) {
		this.ismust = ismust;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getIscustom() {
		return iscustom;
	}
	public void setIscustom(int iscustom) {
		this.iscustom = iscustom;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	
	@Override
	public String toString() {
		return "PfRegisterAttched [id=" + id + ", company_id=" + company_id
				+ ", file_type_id=" + file_type_id + ", file_name=" + file_name
				+ ", file_path=" + file_path + ", create_dt=" + create_dt
				+ ", file_format=" + file_format + ", ismust=" + ismust
				+ ", remark=" + remark + ", iscustom=" + iscustom
				+ ", mogodb_id=" + mogodb_id + "]";
	}
	
}
