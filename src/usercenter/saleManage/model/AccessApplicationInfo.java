package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationInfo {
	private int			info_id;
	private int			e_id;
	private int			record_id;
	private int			classify_id;
	private String			related_basis;
	private String			content;
	private Date			create_dt;

	public int getInfo_id() {
		return info_id;
	}
	public void setInfo_id(int info_id) {
		this.info_id = info_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getClassify_id() {
		return classify_id;
	}
	public void setClassify_id(int classify_id) {
		this.classify_id = classify_id;
	}
	public String getRelated_basis() {
		return related_basis;
	}
	public void setRelated_basis(String related_basis) {
		this.related_basis = related_basis;
	}
	public int getE_id() {
		return e_id;
	}
	public void setE_id(int e_id) {
		this.e_id = e_id;
	}
	
}
