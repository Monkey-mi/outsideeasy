package common.sysmodule.model;

import java.io.Serializable;
import java.util.List;

public class SysFunctionClassTree implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4092064740423779830L;
	private int			class_id;
	private String			class_name;
	private int			parentId;
	private String			isvalid;
	private int			order_seq;
	private String			isParent;
	private String			remark;
	private List<SysFunctionClassTree> data;
	
	public int getClass_id() {
		return class_id;
	}
	public void setClass_id(int class_id) {
		this.class_id = class_id;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
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
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public String getIsParent() {
		return isParent;
	}
	public void setIsParent(String isParent) {
		this.isParent = isParent;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public List<SysFunctionClassTree> getData() {
		return data;
	}
	public void setData(List<SysFunctionClassTree> data) {
		this.data = data;
	}
	
}
