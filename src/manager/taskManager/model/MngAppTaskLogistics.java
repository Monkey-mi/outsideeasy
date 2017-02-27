package manager.taskManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 物流信息记录
 * @author chenlong
 *
 */
public class MngAppTaskLogistics implements Serializable{

	private static final long serialVersionUID = -7978597901814936301L;
	private int			    record_id;//物流记录主键
	private int			    t_id;//任务列表主键
	private String			tpye;//物流类型
	private Date			start_date;//出发日期
	private String			licence_plate;//车牌号
	private String			driver;//司机
	private String			phone_number;//联系方式
	private String			confirm_state;//确认状态
	private String			remark;//备注说明
    private String          send_id;//发货编号
    private int			    send_company;//发送方
    private double          send_count;//发货数量
    private Date            confirm_dt;//确认收货时间
    private Date            create_dt;//创建时间

	
	public Date getConfirm_dt() {
		return confirm_dt;
	}
	public void setConfirm_dt(Date confirm_dt) {
		this.confirm_dt = confirm_dt;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public double getSend_count() {
		return send_count;
	}
	public void setSend_count(double send_count) {
		this.send_count = send_count;
	}
	public int getSend_company() {
		return send_company;
	}
	public void setSend_company(int send_company) {
		this.send_company = send_company;
	}
	public String getSend_id() {
		return send_id;
	}
	public void setSend_id(String send_id) {
		this.send_id = send_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public String getTpye() {
		return tpye;
	}
	public void setTpye(String tpye) {
		this.tpye = tpye;
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
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	
	public String getConfirm_state() {
		return confirm_state;
	}
	public void setConfirm_state(String confirm_state) {
		this.confirm_state = confirm_state;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
