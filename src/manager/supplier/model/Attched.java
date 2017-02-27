package manager.supplier.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;


public class Attched extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -6003545958440543228L;
	private int			id;
	private int			company_id;
	private String			file_name;
	private String			file_path;
	private Date			create_dt;
	private String			file_format;
	private boolean			ismust;
	private String			remark;
	//private String			row_permit;
	//private String			db_TYPE;
	private boolean iscustom;
	private int			file_type_id;
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
	public boolean getIsmust() {
		return ismust;
	}
	public void setIsmust(boolean ismust) {
		this.ismust = ismust;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public boolean getIscustom()
	{
		return iscustom;
	}
	public void setIscustom(boolean iscustom)
	{
		this.iscustom=iscustom;
	}
	public int getFile_type_id() {
		return file_type_id;
	}
	public void setFile_type_id(int file_type_id) {
		this.file_type_id = file_type_id;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	/*public String getRow_permit() {
		return row_permit;
	}
	public void setRow_permit(String row_permit) {
		this.row_permit = row_permit;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}*/
}
