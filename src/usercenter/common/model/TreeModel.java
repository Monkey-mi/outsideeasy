/*
 * 树型结构model对象
 * */
package usercenter.common.model;

import java.io.Serializable;
import java.util.List;

public class TreeModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7523463538990318974L;
	private int id;
	private int parentId;
	private String text;
	private boolean expanded;
	private boolean leaf;
	private int order_by;
	private int nature_id;
	private String nature_name;
	private int depth;
	private List<TreeModel> children;
	private boolean			canAdd;
	public int getId() {
		return id;
	}
	public List<TreeModel> getChildren() {
		return children;
	}
	public void setChildren(List<TreeModel> children) {
		this.children = children;
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
	public boolean getExpanded() {
		return expanded;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public int getOrder_by() {
		return order_by;
	}
	public void setOrder_by(int order_by) {
		this.order_by = order_by;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	public int getNature_id() {
		return nature_id;
	}
	public void setNature_id(int nature_id) {
		this.nature_id = nature_id;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public boolean isCanAdd() {
		return canAdd;
	}
	public void setCanAdd(boolean canAdd) {
		this.canAdd = canAdd;
	}
	
}