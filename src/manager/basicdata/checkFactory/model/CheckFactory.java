package manager.basicdata.checkFactory.model;

import java.io.Serializable;
import java.util.Date;
/**
 *验厂周期基础数据表
 */
public class CheckFactory implements Serializable{
	private static final long serialVersionUID = 3518533204028462318L;
	private int			factory_cycle_id;//主键
	private String			factory_cycle_name;//周期名称
	private Date			create_dt;//创建时间

	public int getFactory_cycle_id() {
		return factory_cycle_id;
	}
	public void setFactory_cycle_id(int factory_cycle_id) {
		this.factory_cycle_id = factory_cycle_id;
	}
	public String getFactory_cycle_name() {
		return factory_cycle_name;
	}
	public void setFactory_cycle_name(String factory_cycle_name) {
		this.factory_cycle_name = factory_cycle_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
