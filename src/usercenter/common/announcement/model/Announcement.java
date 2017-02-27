package usercenter.common.announcement.model;

import java.util.Date;

public class Announcement {
	private int			web_id;
	private byte[]			content;
	private String			creator;
	private String			signed_release;
	private String			web_title;
	private String			content_abstract;
	private Date			create_dt;
	private Date			update_dt;

	public String getSigned_release() {
		return signed_release;
	}
	public void setSigned_release(String signed_release) {
		this.signed_release = signed_release;
	}
	public String getCreator() {
		return creator;
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
	
}
