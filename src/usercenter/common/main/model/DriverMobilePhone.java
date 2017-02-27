package usercenter.common.main.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 司机手机号维护表
 * @author chenlong
 */
public class DriverMobilePhone implements Serializable{
	private static final long serialVersionUID = -3734083274576257747L;
	private int			    driver_id;//司机手机维护表ID
	private String			driver_name;//司机名称
	private String			phone_number;//手机号 /公司的短号
	private int			    enable;//是否禁用
	private Date			create_dt;//创建时间
	private int			    company_id;//公司ID

	public int getDriver_id() {
		return driver_id;
	}
	public void setDriver_id(int driver_id) {
		this.driver_id = driver_id;
	}
	public String getDriver_name() {
		return driver_name;
	}
	public void setDriver_name(String driver_name) {
		this.driver_name = driver_name;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public int getEnable() {
		return enable;
	}
	public void setEnable(int enable) {
		this.enable = enable;
	}	
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
