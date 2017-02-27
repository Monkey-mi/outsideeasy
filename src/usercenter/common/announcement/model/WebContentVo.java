package usercenter.common.announcement.model;

import java.util.List;

public class WebContentVo {
	private int module_id;
	private String module_name;
	private List<Announcement> list;
	public String getModule_name() {
		return module_name;
	}
	public void setModule_name(String module_name) {
		this.module_name = module_name;
	}
	public List<Announcement> getList() {
		return list;
	}
	public void setList(List<Announcement> list) {
		this.list = list;
	}
	public int getModule_id() {
		return module_id;
	}
	public void setModule_id(int module_id) {
		this.module_id = module_id;
	}
	
}
