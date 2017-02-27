package usercenter.common.main.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 车牌号维护表
 * @author chenlong
 */
public class LicensePlate implements Serializable{
	private static final long serialVersionUID = 1493759053284443274L;
	private int			    license_id;//车牌号ID
	private String			license_name;//车牌号名称
	private int			    enable;//是否禁用
	private Date			create_dt;//创建时间
	private int			    company_id;//公司id

	public int getLicense_id() {
		return license_id;
	}
	public void setLicense_id(int license_id) {
		this.license_id = license_id;
	}
	public String getLicense_name() {
		return license_name;
	}
	public void setLicense_name(String license_name) {
		this.license_name = license_name;
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
