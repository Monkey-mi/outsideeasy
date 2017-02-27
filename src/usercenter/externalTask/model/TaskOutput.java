package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;
/**
 * chenlong
 */
public class TaskOutput implements Serializable{	
	private static final long serialVersionUID = 1L;
	private int			record_id ;//产量记录主键
	private int			t_id;//任务列表主键
	private int			sec_id ;//工段id
	private Date			scrq ;//日期
	private double			worker_no ;//出勤人数
	private double			work_time;//出勤时间
	private double			 yield_qty;//产量
	private Date            create_dt;//创建时间
	private int locked;
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
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public int getSec_id() {
		return sec_id;
	}
	public void setSec_id(int sec_id) {
		this.sec_id = sec_id;
	}
	public Date getScrq() {
		return scrq;
	}
	public void setScrq(Date scrq) {
		this.scrq = scrq;
	}
	public double getWorker_no() {
		return worker_no;
	}
	public void setWorker_no(double worker_no) {
		this.worker_no = worker_no;
	}
	public double getWork_time() {
		return work_time;
	}
	public void setWork_time(double work_time) {
		this.work_time = work_time;
	}
	public double getYield_qty() {
		return yield_qty;
	}
	public void setYield_qty(double yield_qty) {
		this.yield_qty = yield_qty;
	}
	public int getLocked() {
		return locked;
	}
	public void setLocked(int locked) {
		this.locked = locked;
	}
	
}
