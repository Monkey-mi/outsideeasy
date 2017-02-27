package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 物流货物清单
 * @author chenlong
 *
 */
public class TaskLogisticsItem implements Serializable{
	
	private static final long serialVersionUID = 3216343636416350872L;
	private int			item_id;//物流清单主键
	private int			record_id;//物流记录主键
	private int         t_id;//任务单Id
	private String			goods_name;//货物名称
	private double			deliver_no;//货物发送数量
	private double		arrived_no;//实到货数量
	private double		receive_no;//确认收货数量
	private Date        receive_time;//确认收货时间
	private int             qc_state;//是否质检 1或0
	
    
	public int getQc_state() {
		return qc_state;
	}
	public void setQc_state(int qc_state) {
		this.qc_state = qc_state;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public Date getReceive_time() {
		return receive_time;
	}
	public void setReceive_time(Date receive_time) {
		this.receive_time = receive_time;
	}
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	public double getDeliver_no() {
		return deliver_no;
	}
	public void setDeliver_no(double deliver_no) {
		this.deliver_no = deliver_no;
	}
	public double getArrived_no() {
		return arrived_no;
	}
	public void setArrived_no(double arrived_no) {
		this.arrived_no = arrived_no;
	}
	public double getReceive_no() {
		return receive_no;
	}
	public void setReceive_no(double receive_no) {
		this.receive_no = receive_no;
	}
	
}
