package manager.webPublish.model;

import java.util.Date;


public class WebPublish {
	private int			web_id;
	private byte[]			content;
	private String			creator;
	private String			content_abstract;
	private String			web_title;
	private Date			create_dt;
	private Date			update_dt;
	private int			content_type;
	private int			module_id;
	private String			module_name;
	private String			signed_release;
	public String getCreator() {
		return creator;
	}
	public String getSigned_release() {
		return signed_release;
	}
	public void setSigned_release(String signed_release) {
		this.signed_release = signed_release;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getContent() throws Exception {
		return new String(content,"utf-8");
	}
	public void setContent(byte[] content) {
		this.content = content;
	}
	public int getWeb_id() {
		return web_id;
	}
	public void setWeb_id(int web_id) {
		this.web_id = web_id;
	}
	public String getWeb_title() {
		return web_title;
	}
	public void setWeb_title(String web_title) {
		this.web_title = web_title;
	}
	public Date getUpdate_dt() {
		return update_dt;
	}
	public void setUpdate_dt(Date update_dt) {
		this.update_dt = update_dt;
	}
	public String getContent_abstract() {
		return content_abstract;
	}
	public void setContent_abstract(String content_abstract) {
		this.content_abstract = content_abstract;
	}
	public int getContent_type() {
		return content_type;
	}
	public void setContent_type(int content_type) {
		this.content_type = content_type;
	}
	public int getModule_id() {
		return module_id;
	}
	public void setModule_id(int module_id) {
		this.module_id = module_id;
	}
	public String getModule_name() {
		return module_name;
	}
	public void setModule_name(String module_name) {
		this.module_name = module_name;
	}
	
}
