package manager.webPublish.model;

import java.util.Date;

public class WebContentModule {
	private int			module_id;
	private int			content_type;
	private String			module_name;
	private Date			create_dt;

	public int getModule_id() {
		return module_id;
	}
	public void setModule_id(int module_id) {
		this.module_id = module_id;
	}
	public int getContent_type() {
		return content_type;
	}
	public void setContent_type(int content_type) {
		this.content_type = content_type;
	}
	public String getModule_name() {
		return module_name;
	}
	public void setModule_name(String module_name) {
		this.module_name = module_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
