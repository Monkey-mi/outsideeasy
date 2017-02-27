package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class ERPSRMpurchaseOrder extends Model implements Serializable{
	/*功能：采购订单
	 *作者：杜超
	 *时间：2016/08/24
	 *数据库名： ERP_SRM_CGHTB等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private String			csbh;
	private Date			jhrq;
	private Date			qfsj;
	private Date			sdsj;
	private double          htze;
	private String			cgbz;
	private String			csdh;
	private String			csdz;
	private String			lxrm;
	private String			FPLX;
	private String			fptt;
	private String			lbmc;
	private String			cglb;
	private String			sdrm;
	private String			csmc;
	private String			bmmc;
	private String			qfrm;
	private String			httk;
	private String			cgyq;
	private String          ptid;
	private String          company_id;
	private int          record_id;
	private int         sdbj;
	
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getCompany_id() {
		return company_id;
	}
	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}
	public String getPtid() {
		return ptid;
	}
	public void setPtid(String ptid) {
		this.ptid = ptid;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	public Date getQfsj() {
		return qfsj;
	}
	public void setQfsj(Date qfsj) {
		this.qfsj = qfsj;
	}
	public Date getSdsj() {
		return sdsj;
	}
	public void setSdsj(Date sdsj) {
		this.sdsj = sdsj;
	}
	public double getHtze() {
		return htze;
	}
	public void setHtze(double htze) {
		this.htze = htze;
	}
	public String getCgbz() {
		return cgbz;
	}
	public void setCgbz(String cgbz) {
		this.cgbz = cgbz;
	}
	public String getCsdh() {
		return csdh;
	}
	public void setCsdh(String csdh) {
		this.csdh = csdh;
	}
	public String getCsdz() {
		return csdz;
	}
	public void setCsdz(String csdz) {
		this.csdz = csdz;
	}
	public String getLxrm() {
		return lxrm;
	}
	public void setLxrm(String lxrm) {
		this.lxrm = lxrm;
	}
	public String getFPLX() {
		return FPLX;
	}
	public void setFPLX(String fPLX) {
		FPLX = fPLX;
	}
	public String getFptt() {
		return fptt;
	}
	public void setFptt(String fptt) {
		this.fptt = fptt;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public String getCglb() {
		return cglb;
	}
	public void setCglb(String cglb) {
		this.cglb = cglb;
	}
	public String getSdrm() {
		return sdrm;
	}
	public void setSdrm(String sdrm) {
		this.sdrm = sdrm;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public String getQfrm() {
		return qfrm;
	}
	public void setQfrm(String qfrm) {
		this.qfrm = qfrm;
	}
	public String getHttk() {
		return httk;
	}
	public void setHttk(String httk) {
		this.httk = httk;
	}
	public String getCgyq() {
		return cgyq;
	}
	public void setCgyq(String cgyq) {
		this.cgyq = cgyq;
	}
	
}
