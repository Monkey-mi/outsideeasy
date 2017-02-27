package usercenter.saleManage.model;

import java.util.Date;

public class AccessApplicationCompetitor {
	private int			competitor_id;
	private String			competitor_name;
	private Date			create_dt;
	private int			record_id;
	private int			app_competitor_id;
	
	public int getCompetitor_id() {
		return competitor_id;
	}
	public void setCompetitor_id(int competitor_id) {
		this.competitor_id = competitor_id;
	}
	public String getCompetitor_name() {
		return competitor_name;
	}
	public void setCompetitor_name(String competitor_name) {
		this.competitor_name = competitor_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getApp_competitor_id() {
		return app_competitor_id;
	}
	public void setApp_competitor_id(int app_competitor_id) {
		this.app_competitor_id = app_competitor_id;
	}
	
}
