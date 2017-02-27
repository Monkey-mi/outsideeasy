package manager.taskManager.model;

import java.io.Serializable;

/**
 * BOM
 * @author chenlong
 *
 */
public class MngAppTaskBom implements Serializable{

	private static final long serialVersionUID = -4460300517253766311L;
	private int			tb_id;//bom表主键
	private int			t_id;//任务列表主键
	private int			order_no;//顺序号
	private String			material;//材料名称
	private double			consumption;//单件用量
	private String			unit;//计量单位
	private double			total_consumption;//总计用量

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

	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public double getConsumption() {
		return consumption;
	}
	public void setConsumption(double consumption) {
		this.consumption = consumption;
	}
	public double getTotal_consumption() {
		return total_consumption;
	}
	public void setTotal_consumption(double total_consumption) {
		this.total_consumption = total_consumption;
	}
	
}
