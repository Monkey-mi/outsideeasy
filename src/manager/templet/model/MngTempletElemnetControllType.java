package manager.templet.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description: 前端显示控件类型表
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-7-1
 */
public class MngTempletElemnetControllType implements Serializable {
	private static final long serialVersionUID = 6727299380967424040L;
	private int			controller_type_id;//主键
	private String			controller_name;//名称
	private Date			create_dt;//create_dt

	public int getController_type_id() {
		return controller_type_id;
	}
	public void setController_type_id(int controller_type_id) {
		this.controller_type_id = controller_type_id;
	}
	public String getController_name() {
		return controller_name;
	}
	public void setController_name(String controller_name) {
		this.controller_name = controller_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
