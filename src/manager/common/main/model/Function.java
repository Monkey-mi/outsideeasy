package manager.common.main.model;

import java.io.Serializable;

import manager.common.Model;


/**
 * ClassName: Function
 * @Description: 菜单功能类
 * @author 华慧
 * @date 2015-9-1
 */
public class Function extends Model implements Serializable {
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 2994262911460758105L;
	private int f_id;
	private int mod_id;
	private String code;
	private String name;
	private String type;
	private int order_seq;
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	
}
