package common.sysmodule.model;

import java.io.Serializable;

public class SysPageAuthority implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8626700685056209431L;
	private int			authority_id;
	private int			class_id;
	private String			page_name;
	private String          page_path;
	private String			enable;
	private String			remark;
	private int is_menu_page;
	private int order_seq;

	public int getAuthority_id() {
		return authority_id;
	}
	public void setAuthority_id(int authority_id) {
		this.authority_id = authority_id;
	}
	public int getClass_id() {
		return class_id;
	}
	public void setClass_id(int class_id) {
		this.class_id = class_id;
	}
	public String getPage_name() {
		return page_name;
	}
	public void setPage_name(String page_name) {
		this.page_name = page_name;
	}
	public String getPage_path() {
		return page_path;
	}
	public void setPage_path(String page_path) {
		this.page_path = page_path;
	}
	public String getEnable() {
		return enable;
	}
	public void setEnable(String enable) {
		this.enable = enable;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getIs_menu_page() {
		return is_menu_page;
	}
	public void setIs_menu_page(int is_menu_page) {
		this.is_menu_page = is_menu_page;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
}
