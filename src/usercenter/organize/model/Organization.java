package usercenter.organize.model;

import java.io.Serializable;
import java.util.List;

public class Organization implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -6766548192566811235L;
	private int			org_id;
	private int			reg_id;
	private int			parentId;
	private String			isvalid;
	private String			isParent;
	private String name;
	
	//额外字段
	private  List<Organization> parentOrganizations;
	public int getOrg_id() {
		return org_id;
	}
	public void setOrg_id(int org_id) {
		this.org_id = org_id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getIsvalid() {
		return isvalid;
	}
	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}
	public String getIsParent() {
		return isParent;
	}
	public void setIsParent(String isParent) {
		this.isParent = isParent;
	}
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
	}
	public List<Organization> getParentOrganizations() {
		return parentOrganizations;
	}
	public void setParentOrganizations(List<Organization> parentOrganizations) {
		this.parentOrganizations = parentOrganizations;
	}
	
}
