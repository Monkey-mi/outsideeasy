package manager.basicdata.tradeClass.model;

import java.io.Serializable;

import manager.common.Model;


public class TradeClass extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			class_id;
	private String			class_name;
	private int			f_id;
	private String leaf;
	
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
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
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
}
