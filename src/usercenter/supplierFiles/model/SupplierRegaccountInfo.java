package usercenter.supplierFiles.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 供应商主账号关联表
 */
public class SupplierRegaccountInfo implements Serializable{
	private static final long serialVersionUID = 2003979071399027050L;
	private int			s_r_id;//主键
	private int			supplier_id;//供应商档案Id
	private int			reg_id;//所有者主账号ID
	private Date		create_dt;//创建时间

	public int getS_r_id() {
		return s_r_id;
	}
	public void setS_r_id(int s_r_id) {
		this.s_r_id = s_r_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public int getReg_id() {
		return reg_id;
	}
	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
