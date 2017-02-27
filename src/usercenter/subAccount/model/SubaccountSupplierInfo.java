package usercenter.subAccount.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description: 子账号与供应商关联表
 * @author chenlong
 * @date 2016-7-7
 */
public class SubaccountSupplierInfo implements Serializable {
	private static final long serialVersionUID = 2796381801907212416L;
	private int			subaccount_supplier_id;//主键
	private int			supplier_id;//供应商id
	private Date			create_dt;//创建时间
	private int			is_delete;//是否删除
	private int			sa_id;//子账号id

	public int getSubaccount_supplier_id() {
		return subaccount_supplier_id;
	}
	public void setSubaccount_supplier_id(int subaccount_supplier_id) {
		this.subaccount_supplier_id = subaccount_supplier_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public int getSa_id() {
		return sa_id;
	}
	public void setSa_id(int sa_id) {
		this.sa_id = sa_id;
	}
}
