package manager.regAccount.model;

import java.io.Serializable;

public class TreeModelOrganizationResponse implements Serializable {
	
	private static final long serialVersionUID = -228520457022954113L;
	/**
	 * 
	 */
	
	private int id;
	private int parentId;
	private String text;
	private String expanded;
	private String leaf;
	private int order_seq;
	private String type;
	
	
	
	
	/*
	 * 与树无关的的字段
	 */
	private int reg_id;//公司id
	
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getExpanded() {
		return expanded;
	}
	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
