package platform.mes.wxdata.model;

import java.io.Serializable;
import java.util.Date;

public class PfTaskOutput implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -362756563439030760L;
	private int			record_id;
	private int			t_id;
	private Date			scrq;
	private double			worker_no;
	private double			work_time;
	private double			yield_qty;
	private String		section_name;
	private int sec_id;
	//辅助字段
	private int mjbz;
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
	public String getSection_name() {
		return section_name;
	}
	public void setSection_name(String section_name) {
		this.section_name = section_name;
	}
	public int getSec_id() {
		return sec_id;
	}
	public void setSec_id(int sec_id) {
		this.sec_id = sec_id;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	
	
}
