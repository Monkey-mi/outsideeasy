/*物料确认检测类目*/
package manager.materialConfirmation.model;
import java.io.Serializable;

import manager.common.Model;
public class MaterialCheckclass extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4304531843457126552L;
	private int			checkclass_id;
	private String			checkclass_name;

	public int getCheckclass_id() {
		return checkclass_id;
	}
	public void setCheckclass_id(int checkclass_id) {
		this.checkclass_id = checkclass_id;
	}
	public String getCheckclass_name() {
		return checkclass_name;
	}
	public void setCheckclass_name(String checkclass_name) {
		this.checkclass_name = checkclass_name;
	}
}
