package manager.taskManager.model;

import java.io.Serializable;
/**
 * 任务单工序表
 * @author chenlong
 *
 */
public class MngAppTaskProcess implements Serializable{
	
	private static final long serialVersionUID = 5874429531540453644L;
	private int			tp_id;//工序表主键
	private int			t_id;//任务列表主键
	private int	        sec_id;//工段编号
	private String			process_name;//工序名称
	private int			order_no;//工序顺序
	private double			stand_time;//标准工时
	private String       patter;//部件
	private int	         mjbz;//末级标识
	
	private String       section_name;//工段名称
	
	public String getSection_name() {
		return section_name;
	}
	public void setSection_name(String section_name) {
		this.section_name = section_name;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	public String getPatter() {
		return patter;
	}
	public void setPatter(String patter) {
		this.patter = patter;
	}
	public int getSec_id() {
		return sec_id;
	}
	public void setSec_id(int sec_id) {
		this.sec_id = sec_id;
	}
	public int getTp_id() {
		return tp_id;
	}
	public void setTp_id(int tp_id) {
		this.tp_id = tp_id;
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
	
	
}
