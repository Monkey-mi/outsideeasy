package usercenter.supplierFiles.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;
/**
 * @Description: 供应商档案库
 * @author chenlong
 * @date 2016- 07-7
 */
public class SupplierFiles implements Serializable{
	private static final long serialVersionUID = -7455186454249654263L;
	private int			supplier_id;//供应商档案id
	private int			company_id;//对应平台企业Id
	private int			record_id;//准入申请流水号
	private String		supplier_cpyname;//供应商名称   
	private int			file_status;//档案状态0：现有供应商；1：备选供应商；2：淘汰供应商
	private Date		create_dt;//创建时间
	private int         no_check;//0:需要验厂；1：免检，不需要验厂
	private int         is_auth_updated;//'0:信息没有变更;1:有变更'
	
	private int no_checkor_id;
	private String no_checkor;
	private Date no_check_dt;
	private Date auth_dt;
	private int source_type;
	private int is_delete;
	
	private List<Map<String, Object>> cateList;//采购分类
	private String cateListStr;//采购分类字符串 自带格式

	public List<Map<String, Object>> getCateList() {
		return cateList;
	}
	public void setCateList(List<Map<String, Object>> cateList) {
		this.cateList = cateList;
	}
	public Date getNo_check_dt() {
		return no_check_dt;
	}
	public void setNo_check_dt(Date no_check_dt) {
		this.no_check_dt = no_check_dt;
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
	public String getCateListStr() {
		return cateListStr;
	}
	public void setCateListStr(String cateListStr) {
		this.cateListStr = cateListStr;
	}
	@Override
	public String toString() {
		return "SupplierFiles [supplier_id=" + supplier_id + ", company_id="
				+ company_id + ", record_id=" + record_id
				+ ", supplier_cpyname=" + supplier_cpyname + ", file_status="
				+ file_status + ", create_dt=" + create_dt + ", no_check="
				+ no_check + ", is_auth_updated=" + is_auth_updated
				+ ", no_checkor_id=" + no_checkor_id + ", no_checkor="
				+ no_checkor + ", no_check_dt=" + no_check_dt + ", auth_dt="
				+ auth_dt + ", source_type=" + source_type + ", is_delete="
				+ is_delete + ", cateList=" + cateList + ", cateListStr="
				+ cateListStr + "]";
	}
}
