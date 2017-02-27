package platform.supplierAccess.model;

import java.io.Serializable;
import java.util.Date;

public class UpdateRegisterAttched implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			id;
	private int 		o_id;
	private int			auth_update_id;
	private int			ft_id;
	private String			file_name;
	private String			file_path;
	private Date			create_dt;
	private String			file_format;
	private int			ismust;
	private String			remark;
	private int			iscustom;
	private String			object_id;
	private int			company_id;

	public int getO_id() {
		return o_id;
	}
	public void setO_id(int o_id) {
		this.o_id = o_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAuth_update_id() {
		return auth_update_id;
	}
	public void setAuth_update_id(int auth_update_id) {
		this.auth_update_id = auth_update_id;
	}
	public int getFt_id() {
		return ft_id;
	}
	public void setFt_id(int ft_id) {
		this.ft_id = ft_id;
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
