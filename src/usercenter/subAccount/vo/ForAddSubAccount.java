package usercenter.subAccount.vo;

import java.io.Serializable;
import java.util.List;

import usercenter.organize.model.Organization;
import usercenter.subAccount.model.UcSysRole;

public class ForAddSubAccount implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3736449073508105820L;
	private String acc_name;
	private List<UcSysRole> roleList;
	private List<Organization> orgList;
	
	public List<Organization> getOrgList() {
		return orgList;
	}
	public void setOrgList(List<Organization> orgList) {
		this.orgList = orgList;
	}
	public String getAcc_name() {
		return acc_name;
	}
	public void setAcc_name(String acc_name) {
		this.acc_name = acc_name;
	}
	public List<UcSysRole> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<UcSysRole> roleList) {
		this.roleList = roleList;
	}
	
}
