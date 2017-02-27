package platform.mes.wxdata.model;

import java.io.Serializable;

public class Bomcl implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647310337085620843L;
	private int			cl_id;
	private int			t_id;
	private int			clsx;
	private String			clmc;
	private String			jldw;
	private double			djyl;
	private double			zyl;
	private double			syl;

	public int getCl_id() {
		return cl_id;
	}
	public void setCl_id(int cl_id) {
		this.cl_id = cl_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public int getClsx() {
		return clsx;
	}
	public void setClsx(int clsx) {
		this.clsx = clsx;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getDjyl() {
		return djyl;
	}
	public void setDjyl(double djyl) {
		this.djyl = djyl;
	}
	public double getZyl() {
		return zyl;
	}
	public void setZyl(double zyl) {
		this.zyl = zyl;
	}
	public double getSyl() {
		return syl;
	}
	public void setSyl(double syl) {
		this.syl = syl;
	}

}
