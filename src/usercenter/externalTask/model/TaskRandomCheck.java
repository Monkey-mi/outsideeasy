package usercenter.externalTask.model;

import java.util.Date;

public class TaskRandomCheck {
	private int			id;
	private int			t_id;
	private String			file_name;
	private String			suffix_name;
	private String			mongodb_id;
	private Date			create_dt;
	private int			is_delete;
	private int			source_type;
	private Date			check_dt;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getSuffix_name() {
		return suffix_name;
	}
	public void setSuffix_name(String suffix_name) {
		this.suffix_name = suffix_name;
	}
	public String getMongodb_id() {
		return mongodb_id;
	}
	public void setMongodb_id(String mongodb_id) {
		this.mongodb_id = mongodb_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public Date getCheck_dt() {
		return check_dt;
	}
	public void setCheck_dt(Date check_dt) {
		this.check_dt = check_dt;
	}
}
