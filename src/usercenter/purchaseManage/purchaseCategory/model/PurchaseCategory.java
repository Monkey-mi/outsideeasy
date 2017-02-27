package usercenter.purchaseManage.purchaseCategory.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

public class PurchaseCategory extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -392060260804180587L;
	private int			category_id;
	private String			category_name;
	private int			purchase_nature_id;
	private int			f_id;
	private boolean			leaf;
	private Date			create_dt;
	private int			order_by;
	
	//额外字段
	private String			purchase_nature_name;
	private int count;
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public int getPurchase_nature_id() {
		return purchase_nature_id;
	}
	public void setPurchase_nature_id(int purchase_nature_id) {
		this.purchase_nature_id = purchase_nature_id;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public boolean getLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getOrder_by() {
		return order_by;
	}
	public void setOrder_by(int order_by) {
		this.order_by = order_by;
	}
	public String getPurchase_nature_name() {
		if (purchase_nature_name==null) {
			purchase_nature_name="";
		}
		return purchase_nature_name;
	}
	public void setPurchase_nature_name(String purchase_nature_name) {
		this.purchase_nature_name = purchase_nature_name;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
}
