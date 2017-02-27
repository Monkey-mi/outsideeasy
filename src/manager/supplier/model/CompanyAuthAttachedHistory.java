package manager.supplier.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class CompanyAuthAttachedHistory extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4078144931626224246L;
	private int			attached_id;
	private int			auth_history_id;
	private int			file_type_id;
	private String			file_name;
	
	private Date			create_dt;
	private String			file_format;
	
	private String			remark;
	
	private String			object_id;
	private int			company_id;

	public int getAttached_id() {
		return attached_id;
	}
	public void setAttached_id(int attached_id) {
		this.attached_id = attached_id;
	}
	public int getAuth_history_id() {
		return auth_history_id;
	}
	public void setAuth_history_id(int auth_history_id) {
		this.auth_history_id = auth_history_id;
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
	public String getFile_format() {
		return file_format;
	}
	public void setFile_format(String file_format) {
		this.file_format = file_format;
	}
	
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getObject_id() {
		return object_id;
	}
	public void setObject_id(String object_id) {
		this.object_id = object_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
