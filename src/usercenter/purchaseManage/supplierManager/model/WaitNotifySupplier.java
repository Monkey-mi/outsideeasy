package usercenter.purchaseManage.supplierManager.model;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

/**
 * @author lenovo
 *
 */
public class WaitNotifySupplier implements Serializable{
	private static final long serialVersionUID = -5286019983725128960L;
	private int			supplier_id;//供应商档案id
	private int			company_id;//对应平台企业Id
	private int			record_id;//准入申请流水号
	private String		supplier_cpyname;//供应商名称   
	private int			file_status;//档案状态0：现有供应商；1：备选供应商；2：淘汰供应商
	private Date		create_dt;//创建时间
	private int         no_check;//0:需要验厂；1：免检，不需要验厂
	private int         is_auth_updated;//'0:信息没有变更;1:有变更'
	private Date        auth_dt;

	private String reg_addr;
	private String contact_addr;
	private BigInteger contact_addr_code;
	private String corporation;
	private String m_phone;
	private Date next_check_dt;
	private int cycle_value;
	
	public Date getAuth_dt() {
		return auth_dt;
	}
	public void setAuth_dt(Date auth_dt) {
		this.auth_dt = auth_dt;
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
	public int getIs_auth_updated() {
		return is_auth_updated;
	}
	public void setIs_auth_updated(int is_auth_updated) {
		this.is_auth_updated = is_auth_updated;
	}
	public String getReg_addr() {
		return reg_addr;
	}
	public void setReg_addr(String reg_addr) {
		this.reg_addr = reg_addr;
	}
	public String getCorporation() {
		return corporation;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public String getM_phone() {
		return m_phone;
	}
	public void setM_phone(String m_phone) {
		this.m_phone = m_phone;
	}
	public Date getNext_check_dt() {
		return next_check_dt;
	}
	public void setNext_check_dt(Date next_check_dt) {
		this.next_check_dt = next_check_dt;
	}
	public int getCycle_value() {
		return cycle_value;
	}
	public void setCycle_value(int cycle_value) {
		this.cycle_value = cycle_value;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
	}
	public BigInteger getContact_addr_code() {
		return contact_addr_code;
	}
	public void setContact_addr_code(BigInteger contact_addr_code) {
		this.contact_addr_code = contact_addr_code;
	}
	@Override
	public String toString() {
		return "WaitNotifySupplier [supplier_id=" + supplier_id
				+ ", company_id=" + company_id + ", record_id=" + record_id
				+ ", supplier_cpyname=" + supplier_cpyname + ", file_status="
				+ file_status + ", create_dt=" + create_dt + ", no_check="
				+ no_check + ", is_auth_updated=" + is_auth_updated
				+ ", auth_dt=" + auth_dt + ", reg_addr=" + reg_addr
				+ ", contact_addr=" + contact_addr + ", contact_addr_code="
				+ contact_addr_code + ", corporation=" + corporation
				+ ", m_phone=" + m_phone + ", next_check_dt=" + next_check_dt
				+ ", cycle_value=" + cycle_value + "]";
	}
}
