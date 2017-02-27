package com.outsideasy.activemq.model;

import java.io.Serializable;
import java.util.Date;

public class PurchaseOrderSender implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2284202796925601404L;
	private int			    pur_order_id;//主键
	private String			order_bh;//订单编号
	private String			agreement_bh;//合同编号
	private int			    order_status;//订单状态
	private int			    source_type;//数据来源 0：po端；1：平台
	private Date            r_opreate_dt;//已接单时间
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public int getOrder_status() {
		return order_status;
	}
	public void setOrder_status(int order_status) {
		this.order_status = order_status;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public Date getR_opreate_dt() {
		return r_opreate_dt;
	}
	public void setR_opreate_dt(Date r_opreate_dt) {
		this.r_opreate_dt = r_opreate_dt;
	}
	@Override
	public String toString() {
		return "PurchaseOrderSender [pur_order_id=" + pur_order_id
				+ ", order_bh=" + order_bh + ", agreement_bh=" + agreement_bh
				+ ", order_status=" + order_status + ", source_type="
				+ source_type + ", r_opreate_dt=" + r_opreate_dt + "]";
	}
	
}
