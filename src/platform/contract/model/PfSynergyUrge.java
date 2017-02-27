package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfSynergyUrge implements Serializable {
	private String			csmc;
	private int			htbh;
	private String			clmc;
	private String			clhh;
	private String			jldw;
	private String			cltx1;
	private int			cgww;
	private Date			wkjq;
	private int order_detail_id;
	private int pur_order_id;
	private int			htxh;
	private String htmx;
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
	public String getHtmx() {
		return htmx;
	}
	public void setHtmx(String htmx) {
		this.htmx = htmx;
	}
	
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
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
	public int getCgww() {
		return cgww;
	}
	public void setCgww(int cgww) {
		this.cgww = cgww;
	}
	public Date getWkjq() {
		return wkjq;
	}
	public void setWkjq(Date wkjq) {
		this.wkjq = wkjq;
	}
}
