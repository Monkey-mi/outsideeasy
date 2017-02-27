/*新供应商准入评估模板表*/
package manager.supplierAccess.model;
import java.io.Serializable;

import manager.common.Model;

public class AccessBasetable  extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4885047330887883730L;
	private int			item_id;
	private String			item_name;
	private int			f_id;
	private int			Activity_status;

	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public int getActivity_status() {
		return Activity_status;
	}
	public void setActivity_status(int Activity_status) {
		this.Activity_status = Activity_status;
	}
}
