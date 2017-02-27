package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationCategory {
	private int			id;
	private int			category_id;
	private String 		category_name;
	private Integer 		f_id;
	private int			record_id;
	private Date			create_dt;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public Integer getF_id() {
		return f_id;
	}
	public void setF_id(Integer f_id) {
		this.f_id = f_id;
	}
	@Override
	public String toString() {
		return "AccessApplicationCategory [id=" + id + ", category_id="
				+ category_id + ", category_name=" + category_name + ", f_id="
				+ f_id + ", record_id=" + record_id + ", create_dt="
				+ create_dt + "]";
	}
}
