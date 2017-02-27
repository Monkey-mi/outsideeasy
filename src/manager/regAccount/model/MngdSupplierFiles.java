package manager.regAccount.model;

import java.io.Serializable;
import java.util.Date;


public class MngdSupplierFiles implements Serializable{
	private static final long serialVersionUID = 6945824334472951336L;
	private int			supplier_id;
	private int			company_id;
	private int			record_id;
	private String			supplier_cpyname;
	private int			file_status;
	private Date			create_dt;
	private int			no_check;
	private int			no_checkor_id;
	private String			no_checkor;
	private Date			no_check_dt;
	private int			is_auth_updated;
	private Date			auth_dt;
	private int			source_type;
	private int			is_delete;
	private int     is_select;
	

	
	public int getIs_select() {
		return is_select;
	}
	public void setIs_select(int is_select) {
		this.is_select = is_select;
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
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getSupplier_cpyname() {
		return supplier_cpyname;
	}
	public void setSupplier_cpyname(String supplier_cpyname) {
		this.supplier_cpyname = supplier_cpyname;
	}
	public int getFile_status() {
		return file_status;
	}
	public void setFile_status(int file_status) {
		this.file_status = file_status;
	}

	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getNo_check() {
		return no_check;
	}
	public void setNo_check(int no_check) {
		this.no_check = no_check;
	}
	public int getNo_checkor_id() {
		return no_checkor_id;
	}
	public void setNo_checkor_id(int no_checkor_id) {
		this.no_checkor_id = no_checkor_id;
	}
	public String getNo_checkor() {
		return no_checkor;
	}
	public void setNo_checkor(String no_checkor) {
		this.no_checkor = no_checkor;
	}
	public Date getNo_check_dt() {
		return no_check_dt;
	}
	public void setNo_check_dt(Date no_check_dt) {
		this.no_check_dt = no_check_dt;
	}
	public int getIs_auth_updated() {
		return is_auth_updated;
	}
	public void setIs_auth_updated(int is_auth_updated) {
		this.is_auth_updated = is_auth_updated;
	}
	public Date getAuth_dt() {
		return auth_dt;
	}
	public void setAuth_dt(Date auth_dt) {
		this.auth_dt = auth_dt;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
}
