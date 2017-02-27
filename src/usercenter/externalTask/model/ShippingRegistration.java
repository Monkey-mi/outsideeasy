package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 发货物流表
 * @author chenlong
 */
public class ShippingRegistration implements Serializable{
	private static final long serialVersionUID = 3361785905843142344L;
	private int			    shipping_id;//发货运单id
	private int			    shipping_state;//物流状态 0：正常：1：取消
	private String			shipping_number;//运单号
	private Date			start_date;//发货日期
	private String			licence_plate;//车牌号
	private String			driver;//司机名
	private String			phone_number;//手机号
	private String			remark;//备注
	private Date			create_dt;//创建时间
	private String			shipping_company;//发货的公司
	private int			    shipping_company_id;//发货的公司ID

	public int getShipping_id() {
		return shipping_id;
	}
	public void setShipping_id(int shipping_id) {
		this.shipping_id = shipping_id;
	}
	public int getShipping_state() {
		return shipping_state;
	}
	public void setShipping_state(int shipping_state) {
		this.shipping_state = shipping_state;
	}
	public String getShipping_number() {
		return shipping_number;
	}
	public void setShipping_number(String shipping_number) {
		this.shipping_number = shipping_number;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public String getLicence_plate() {
		return licence_plate;
	}
	public void setLicence_plate(String licence_plate) {
		this.licence_plate = licence_plate;
	}
	public String getDriver() {
		return driver;
	}	
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getShipping_company() {
		return shipping_company;
	}
	public void setShipping_company(String shipping_company) {
		this.shipping_company = shipping_company;
	}
	public int getShipping_company_id() {
		return shipping_company_id;
	}
	public void setShipping_company_id(int shipping_company_id) {
		this.shipping_company_id = shipping_company_id;
	}
}
