package manager.webPublish.model;

import java.util.Date;

public class WebContentFile {
	private int			id;
	private int			web_id;
	private String			file_name;
	private String			file_format;
	private String			mogodb_id;
	private Date			create_dt;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getWeb_id() {
		return web_id;
	}
	public void setWeb_id(int web_id) {
		this.web_id = web_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_format() {
		return file_format;
	}
	public void setFile_format(String file_format) {
		this.file_format = file_format;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
