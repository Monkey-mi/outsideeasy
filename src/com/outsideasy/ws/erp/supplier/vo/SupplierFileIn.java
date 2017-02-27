package com.outsideasy.ws.erp.supplier.vo;

import java.io.Serializable;
import java.util.Date;

public class SupplierFileIn implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8088563697695070768L;
	private int			company_id;
	private String			apply_sts;
	private double			manage_score;
	private double			improve_score;
	private double			area_score;
	private double			exploit_score;
	private double			storage_score;
	private double			equ_score;
	private double			tec_score;
	private double			pro_file_score;
	private double			research_score;
	private double			reject_score;
	private double			quality_score;
	private double			qc_score;
	private double			filesave_score;
	private String head_audit;
	private Date assess_dt;
	public String getHead_audit() {
		return head_audit;
	}
	public void setHead_audit(String head_audit) {
		this.head_audit = head_audit;
	}
	public Date getAssess_dt() {
		return assess_dt;
	}
	public void setAssess_dt(Date assess_dt) {
		this.assess_dt = assess_dt;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getApply_sts() {
		return apply_sts;
	}
	public void setApply_sts(String apply_sts) {
		this.apply_sts = apply_sts;
	}
	public double getManage_score() {
		return manage_score;
	}
	public void setManage_score(double manage_score) {
		this.manage_score = manage_score;
	}
	public double getImprove_score() {
		return improve_score;
	}
	public void setImprove_score(double improve_score) {
		this.improve_score = improve_score;
	}
	public double getArea_score() {
		return area_score;
	}
	public void setArea_score(double area_score) {
		this.area_score = area_score;
	}
	public double getExploit_score() {
		return exploit_score;
	}
	public void setExploit_score(double exploit_score) {
		this.exploit_score = exploit_score;
	}
	public double getStorage_score() {
		return storage_score;
	}
	public void setStorage_score(double storage_score) {
		this.storage_score = storage_score;
	}
	public double getEqu_score() {
		return equ_score;
	}
	public void setEqu_score(double equ_score) {
		this.equ_score = equ_score;
	}
	public double getTec_score() {
		return tec_score;
	}
	public void setTec_score(double tec_score) {
		this.tec_score = tec_score;
	}
	public double getPro_file_score() {
		return pro_file_score;
	}
	public void setPro_file_score(double pro_file_score) {
		this.pro_file_score = pro_file_score;
	}
	public double getResearch_score() {
		return research_score;
	}
	public void setResearch_score(double research_score) {
		this.research_score = research_score;
	}
	public double getReject_score() {
		return reject_score;
	}
	public void setReject_score(double reject_score) {
		this.reject_score = reject_score;
	}
	public double getQuality_score() {
		return quality_score;
	}
	public void setQuality_score(double quality_score) {
		this.quality_score = quality_score;
	}
	public double getQc_score() {
		return qc_score;
	}
	public void setQc_score(double qc_score) {
		this.qc_score = qc_score;
	}
	public double getFilesave_score() {
		return filesave_score;
	}
	public void setFilesave_score(double filesave_score) {
		this.filesave_score = filesave_score;
	}
	
}
