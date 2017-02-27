package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 发货清单
 * @author chenlong
 */
public class TaskDeliverGoods implements Serializable{
	private static final long serialVersionUID = 7617180623645724816L;
	private int			    deliver_id;//发货清单主键ID
	private int			    deliver_state;//发货单状态 5:待收货;10:已收货;15:已取消
	private String			deliver_number;//发货单号
	private int			    customer_id;//客户公司iD
	private String			customer_name;//客户名称
	private int			    t_id;//任务单的ID
	private int			    shipping_id;//发货运单id
	private double			delivery_quantity;//发货数量
	private int			    is_delete;//是否删除
	private Date			create_time;//创建时间
	private Date			confirm_dt;//确认收货时间
	private int			    deliver_type;//发货类型 0:正常发货1:返修清单
	private String			receipt_remark;//收货时的备注
	
	/*
	 * 额外字段
	 */
	private String     shipping_number;//运单号
    private   Date     start_date;//发货日期
    private int     shipping_state;//运单号
    private String  driver;//司机名
    private String  phone_number;//手机号
    private double	receive_no;//收货数量
    private String  licence_plate;//车牌号
    private String  start_week;//发货日期 (星期几)
    private String   shipping_company;//发货单位
	
	
	public String getShipping_company() {
		return shipping_company;
	}
	public void setShipping_company(String shipping_company) {
		this.shipping_company = shipping_company;
	}
	public String getStart_week() {
		return start_week;
	}
	public void setStart_week(String start_week) {
		this.start_week = start_week;
	}
	public String getLicence_plate() {
		return licence_plate;
	}
	public void setLicence_plate(String licence_plate) {
		this.licence_plate = licence_plate;
	}
	public double getReceive_no() {
		return receive_no;
	}
	public void setReceive_no(double receive_no) {
		this.receive_no = receive_no;
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
	public int getShipping_state() {
		return shipping_state;
	}
	public void setShipping_state(int shipping_state) {
		this.shipping_state = shipping_state;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public String getShipping_number() {
		return shipping_number;
	}
	public void setShipping_number(String shipping_number) {
		this.shipping_number = shipping_number;
	}
	public int getDeliver_id() {
		return deliver_id;
	}
	public void setDeliver_id(int deliver_id) {
		this.deliver_id = deliver_id;
	}
	public int getDeliver_state() {
		return deliver_state;
	}
	public void setDeliver_state(int deliver_state) {
		this.deliver_state = deliver_state;
	}
	public String getDeliver_number() {
		return deliver_number;
	}
	public void setDeliver_number(String deliver_number) {
		this.deliver_number = deliver_number;
	}
	public int getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public int getShipping_id() {
		return shipping_id;
	}
	public void setShipping_id(int shipping_id) {
		this.shipping_id = shipping_id;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	
	public double getDelivery_quantity() {
		return delivery_quantity;
	}
	public void setDelivery_quantity(double delivery_quantity) {
		this.delivery_quantity = delivery_quantity;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public Date getConfirm_dt() {
		return confirm_dt;
	}
	public void setConfirm_dt(Date confirm_dt) {
		this.confirm_dt = confirm_dt;
	}
	public int getDeliver_type() {
		return deliver_type;
	}
	public void setDeliver_type(int deliver_type) {
		this.deliver_type = deliver_type;
	}
	public String getReceipt_remark() {
		return receipt_remark;
	}
	public void setReceipt_remark(String receipt_remark) {
		this.receipt_remark = receipt_remark;
	}
}
