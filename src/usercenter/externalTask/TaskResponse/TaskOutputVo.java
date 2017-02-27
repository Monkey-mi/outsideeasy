package usercenter.externalTask.TaskResponse;

import java.util.Date;

public class TaskOutputVo {
	private int			record_id ;//产量记录主键
	private int			t_id;//任务列表主键
	private int			sec_id ;//顺序号
	private Date			scrq ;//日期
	private double			worker_no ;//出勤人数
	private double			work_time;//出勤时间
	private double			 yield_qty;//产量
	private String        section_name;//工段名称
	private int locked;//上锁 0否；1是。默认0
	private int mjbz;//末级标记 0：不是 1：是
	
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	public String getSection_name() {
		return section_name;
	}
	public void setSection_name(String section_name) {
		this.section_name = section_name;
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
