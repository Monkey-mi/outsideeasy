package common.sysmodule.model;

import java.io.Serializable;

public class WsIdentity implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7250309270725312079L;
	private int			ws_id;
	private String			identify;
	private String			psw;
	private String			remark;
	private int			enabled;
	private int			company_id;
	private String			company_name;
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getWs_id() {
		return ws_id;
	}
	public void setWs_id(int ws_id) {
		this.ws_id = ws_id;
	}
	public String getIdentify() {
		return identify;
	}
	public void setIdentify(String identify) {
		this.identify = identify;
	}
	public String getPsw() {
		return psw;
	}
	public void setPsw(String psw) {
		this.psw = psw;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
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
	
}
