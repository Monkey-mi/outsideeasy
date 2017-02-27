package usercenter.subAccount.vo;

import java.io.Serializable;
import java.util.List;

import usercenter.organize.model.Organization;
import usercenter.subAccount.model.SubAccount;
import usercenter.subAccount.model.UcSysRole;

public class ForEditSubAccount implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6403695918377907250L;
	private String acc_name;
	private List<UcSysRole> roleList;
	private List<Organization> orgList;
	private SubAccount subAccount;
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
	public List<Organization> getOrgList() {
		return orgList;
	}
	public void setOrgList(List<Organization> orgList) {
		this.orgList = orgList;
	}
	public SubAccount getSubAccount() {
		return subAccount;
	}
	public void setSubAccount(SubAccount subAccount) {
		this.subAccount = subAccount;
	}
	
}
