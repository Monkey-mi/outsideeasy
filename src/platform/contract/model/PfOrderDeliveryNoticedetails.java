package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfOrderDeliveryNoticedetails implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			details_id;
	private int			delivery_notice_id;
	private int			order_detail_id;
	private Date			notice_delivery_time;
	private Date			confirm_delivery_time;
	private int			number;
	private int			pur_order_id;
	private String			csmc;
	private String			clmc;
	private String			clhh;
	private String			jldw;
	private String			cltx1;
	private double cgdj;
	private int htbh;
	private String htmx;
	private  int htxh;
	private int is_edit;
	
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public int getIs_edit() {
		return is_edit;
	}
	public void setIs_edit(int is_edit) {
		this.is_edit = is_edit;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public String getCltx1() {
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public String getHtmx() {
		return htmx;
	}
	public void setHtmx(String htmx) {
		this.htmx = htmx;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getDetails_id() {
		return details_id;
	}
	public void setDetails_id(int details_id) {
		this.details_id = details_id;
	}
	public int getDelivery_notice_id() {
		return delivery_notice_id;
	}
	public void setDelivery_notice_id(int delivery_notice_id) {
		this.delivery_notice_id = delivery_notice_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public Date getNotice_delivery_time() {
		return notice_delivery_time;
	}
	public void setNotice_delivery_time(Date notice_delivery_time) {
		this.notice_delivery_time = notice_delivery_time;
	}
	public Date getConfirm_delivery_time() {
		return confirm_delivery_time;
	}
	public void setConfirm_delivery_time(Date confirm_delivery_time) {
		this.confirm_delivery_time = confirm_delivery_time;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
}
