package usercenter.externalTask.model;

import java.util.Date;

public class TaskAllCheck {
	private int			allcheck_id;
	private String			rwdh;
	private int			t_id;
	private String			jldh;
	private Date			jlrq;
	private float			jysl;
	private float			hgsl;
	private String			czym;
	private String			bzsm;
	private int			source_type;
	private Date			create_dt;

	public int getAllcheck_id() {
		return allcheck_id;
	}
	public void setAllcheck_id(int allcheck_id) {
		this.allcheck_id = allcheck_id;
	}
	public String getRwdh() {
		return rwdh;
	}
	public void setRwdh(String rwdh) {
		this.rwdh = rwdh;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public String getJldh() {
		return jldh;
	}
	public void setJldh(String jldh) {
		this.jldh = jldh;
	}
	public Date getJlrq() {
		return jlrq;
	}
	public void setJlrq(Date jlrq) {
		this.jlrq = jlrq;
	}
	public float getJysl() {
		return jysl;
	}
	public void setJysl(float jysl) {
		this.jysl = jysl;
	}
	public float getHgsl() {
		return hgsl;
	}
	public void setHgsl(float hgsl) {
		this.hgsl = hgsl;
	}
	public String getCzym() {
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
