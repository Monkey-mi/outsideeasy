package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class ERPSRMPODetial extends Model implements Serializable{
	/*功能：采购订单
	 *作者：杜超
	 *时间：2016/08/24
	 *数据库名： ERP_SRM_HTMXB等
	 * */
	private static final long serialVersionUID = 1L;
	private int	htbh;
    private String clmc; 
    private String cltx1;
    private double cgdj;
    private double cgsl;
    private double je;
    private Date jh;
    private String jldw;
    private String ddbh;
    private String clhh;
    private String htmx;
    
	public String getHtmx() {
		return htmx;
	}
	public void setHtmx(String htmx) {
		this.htmx = htmx;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getDdbh() {
		return ddbh;
	}
	public void setDdbh(String ddbh) {
		this.ddbh = ddbh;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
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
	public String getCltx1() {
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public double getJe() {
		return je;
	}
	public void setJe(double je) {
		this.je = je;
	}
	public Date getJh() {
		return jh;
	}
	public void setJh(Date jh) {
		this.jh = jh;
	}
    
}
