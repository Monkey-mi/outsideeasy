package common.model;

import java.io.Serializable;
import java.util.List;

public class MenuModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2489939614078842723L;
	private int parentId;
	private int id;
	private String menu_name;
	private String menu_path;
	private int order_seq;
	private String leaf;
	private List<MenuModel> children;
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMenu_name() {
		return menu_name;
	}
	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}
	public String getMenu_path() {
		return menu_path;
	}
	public void setMenu_path(String menu_path) {
		this.menu_path = menu_path;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public List<MenuModel> getChildren() {
		return children;
	}
	public void setChildren(List<MenuModel> children) {
		this.children = children;
	}
	
}