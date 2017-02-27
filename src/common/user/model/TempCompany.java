package common.user.model;

import java.util.Date;

public class TempCompany {
	
	private int			company_id;
	private String			company_name;
	private Date			create_dt;
	private int			is_main;
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getIs_main() {
		return is_main;
	}
	public void setIs_main(int is_main) {
		this.is_main = is_main;
	}
	
}
