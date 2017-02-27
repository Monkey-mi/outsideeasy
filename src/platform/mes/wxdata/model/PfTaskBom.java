package platform.mes.wxdata.model;

import java.io.Serializable;

public class PfTaskBom implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4835411813440827930L;
	private int			tb_id;
	private int			t_id;
	private int			order_no;
	private String			material;
	private double			consumption;
	private String			unit;
	private double			total_consumption;
	public int getTb_id() {
		return tb_id;
	}
	public void setTb_id(int tb_id) {
		this.tb_id = tb_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public int getOrder_no() {
		return order_no;
	}
	public void setOrder_no(int order_no) {
		this.order_no = order_no;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public double getConsumption() {
		return consumption;
	}
	public void setConsumption(double consumption) {
		this.consumption = consumption;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public double getTotal_consumption() {
		return total_consumption;
	}
	public void setTotal_consumption(double total_consumption) {
		this.total_consumption = total_consumption;
	}

}
