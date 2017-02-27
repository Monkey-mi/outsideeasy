package platform.mes.wxdata.model;

import java.io.Serializable;

public class PfTaskProcess implements Serializable{

	private static final long serialVersionUID = -3905137167605160897L;
	private int			tp_id;
	private int sec_id;
	private int			t_id;
	private String			process_name;
	private int			order_no;
	private double			stand_time;
	private String gdmc;
	private int mjbz;
	public int getTp_id() {
		return tp_id;
	}
	public void setTp_id(int tp_id) {
		this.tp_id = tp_id;
	}
	
	public int getSec_id() {
		return sec_id;
	}
	public void setSec_id(int sec_id) {
		this.sec_id = sec_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public String getProcess_name() {
		return process_name;
	}
	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}
	public int getOrder_no() {
		return order_no;
	}
	public void setOrder_no(int order_no) {
		this.order_no = order_no;
	}
	public double getStand_time() {
		return stand_time;
	}
	public void setStand_time(double stand_time) {
		this.stand_time = stand_time;
	}
	public String getGdmc() {
		return gdmc;
	}
	public void setGdmc(String gdmc) {
		this.gdmc = gdmc;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	
	
}
