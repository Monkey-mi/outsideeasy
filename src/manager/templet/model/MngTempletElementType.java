package manager.templet.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description: 元素类型表
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-7-1
 */
public class MngTempletElementType implements Serializable{
	private static final long serialVersionUID = 2550449645747342828L;
	private int			e_type_id;//主键ID
	private String			type_name;//类型名称
	private Date			create_dt;//create_dt

	public int getE_type_id() {
		return e_type_id;
	}
	public void setE_type_id(int e_type_id) {
		this.e_type_id = e_type_id;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
