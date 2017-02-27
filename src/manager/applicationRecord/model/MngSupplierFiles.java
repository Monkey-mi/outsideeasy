package manager.applicationRecord.model;

import java.io.Serializable;
import java.util.Date;
/**
 *供应商档案库
 * @author chnelong
 */
public class MngSupplierFiles implements Serializable{
	private static final long serialVersionUID = 5416551554078267444L;
	private int			supplier_id;//供应商档案id
	private int			company_id;//对应平台企业Id
	private int			record_id;//准入申请流水号
	private String		supplier_cpyname;//供应商名称
	private int			file_status;//档案状态
	private Date		create_dt;//创建时间
	private int			no_check;//是否免检
	private int			is_auth_updated;//认证信息变更标记字段

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
	public int getIs_auth_updated() {
		return is_auth_updated;
	}
	public void setIs_auth_updated(int is_auth_updated) {
		this.is_auth_updated = is_auth_updated;
	}
}
