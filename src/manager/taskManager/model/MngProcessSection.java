package manager.taskManager.model;

import java.io.Serializable;

public class MngProcessSection implements Serializable{
	private static final long serialVersionUID = 8183481579092399199L;
	private int			sec_id;//工段编号
	private int			t_id;//任务列表主键
	private String		section_name;//工段名
	private int			sx;//顺序
	private int			mjbz;//末级标识

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
	public String getSection_name() {
		return section_name;
	}
	public void setSection_name(String section_name) {
		this.section_name = section_name;
	}
	public int getSx() {
		return sx;
	}
	public void setSx(int sx) {
		this.sx = sx;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
}
