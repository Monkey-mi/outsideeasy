package manager.materialConfirmation.model;
import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class MaterialConfirmation extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3102025695270695037L;
	private int			confirmation_id;
	private int			company_id;
	private String			company_name;
	private String			contacts;
	private String			f_phone;
	private String			addr;
	private String			fax;
	private String			m_phone;
	private String			proposer;
	private int			apply_companyid;
	private String			apply_companyname;
	private Date			apply_date;
	private int			mc_id;
	private String			mc_name;
	
	private int			isreplace_material;
	private String			replace_material;
	private int			former_supplierid;
	private String			former_suppliername;
	private String			submit_reason;
	private String			submit_item;
	private int         ismatch_item;
	private int			integrity_status;
	private String			nomeet_explan;
	private Date			confirm_integrity_date;
	private int			confirmation_status;
	private int			confirm_result;
	private String			final_confirrmor;
	private Date			confirm_date;

	public int getConfirmation_id() {
		return confirmation_id;
	}
	public void setConfirmation_id(int confirmation_id) {
		this.confirmation_id = confirmation_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getF_phone() {
		return f_phone;
	}
	public void setF_phone(String f_phone) {
		this.f_phone = f_phone;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getM_phone() {
		return m_phone;
	}
	public void setM_phone(String m_phone) {
		this.m_phone = m_phone;
	}
	public String getProposer() {
		return proposer;
	}
	public void setProposer(String proposer) {
		this.proposer = proposer;
	}
	public int getApply_companyid() {
		return apply_companyid;
	}
	public void setApply_companyid(int apply_companyid) {
		this.apply_companyid = apply_companyid;
	}
	public String getApply_companyname() {
		return apply_companyname;
	}
	public void setApply_companyname(String apply_companyname) {
		this.apply_companyname = apply_companyname;
	}
	public Date getApply_date() {
		return apply_date;
	}
	public void setApply_date(Date apply_date) {
		this.apply_date = apply_date;
	}
	public int getMc_id() {
		return mc_id;
	}
	public void setMc_id(int mc_id) {
		this.mc_id = mc_id;
	}
	public String getMc_name() {
		return mc_name;
	}
	public void setMc_name(String mc_name) {
		this.mc_name = mc_name;
	}
	
	public int getIsreplace_material() {
		return isreplace_material;
	}
	public void setIsreplace_material(int isreplace_material) {
		this.isreplace_material = isreplace_material;
	}
	public String getReplace_material() {
		return replace_material;
	}
	public void setReplace_material(String replace_material) {
		this.replace_material = replace_material;
	}
	public int getFormer_supplierid() {
		return former_supplierid;
	}
	public void setFormer_supplierid(int former_supplierid) {
		this.former_supplierid = former_supplierid;
	}
	public String getFormer_suppliername() {
		return former_suppliername;
	}
	public void setFormer_suppliername(String former_suppliername) {
		this.former_suppliername = former_suppliername;
	}
	public String getSubmit_reason() {
		return submit_reason;
	}
	public void setSubmit_reason(String submit_reason) {
		this.submit_reason = submit_reason;
	}
	public String getSubmit_item() {
		return submit_item;
	}
	public void setSubmit_item(String submit_item) {
		this.submit_item = submit_item;
	}
	public int getIsmatch_item(){
		return ismatch_item;
	}
	public void setIsmatch_item(int ismatch_item){
		this.ismatch_item=ismatch_item;
	}
	public int getIntegrity_status() {
		return integrity_status;
	}
	public void setIntegrity_status(int integrity_status) {
		this.integrity_status = integrity_status;
	}
	public String getNomeet_explan() {
		return nomeet_explan;
	}
	public void setNomeet_explan(String nomeet_explan) {
		this.nomeet_explan = nomeet_explan;
	}
	public Date getConfirm_integrity_date() {
		return confirm_integrity_date;
	}
	public void setConfirm_integrity_date(Date confirm_integrity_date) {
		this.confirm_integrity_date = confirm_integrity_date;
	}
	public int getConfirmation_status() {
		return confirmation_status;
	}
	public void setConfirmation_status(int confirmation_status) {
		this.confirmation_status = confirmation_status;
	}
	public int getConfirm_result() {
		return confirm_result;
	}
	public void setConfirm_result(int confirm_result) {
		this.confirm_result = confirm_result;
	}
	public String getFinal_confirrmor() {
		return final_confirrmor;
	}
	public void setFinal_confirrmor(String final_confirrmor) {
		this.final_confirrmor = final_confirrmor;
	}
	public Date getConfirm_date() {
		return confirm_date;
	}
	public void setConfirm_date(Date confirm_date) {
		this.confirm_date = confirm_date;
	}
}
