package manager.common.codegen.model;

import java.util.Date;

public class CodegenRule {
	private int			cgr_id;
	private String			code;
	private String			name;
	private int			len;
	private String			is_valid;
	private Date			create_dt;
	private String			creator;

	public int getCgr_id() {
		return cgr_id;
	}
	public void setCgr_id(int cgr_id) {
		this.cgr_id = cgr_id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getLen() {
		return len;
	}
	public void setLen(int len) {
		this.len = len;
	}
	public String getIs_valid() {
		return is_valid;
	}
	public void setIs_valid(String is_valid) {
		this.is_valid = is_valid;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
}
