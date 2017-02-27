package manager.common.user.model;

import java.io.Serializable;

import manager.common.Model;


/**
 * ClassName: RoleConfig
 * @Description: 角色归属类
 * @author 华慧
 * @date 2015-9-8
 */
public class RoleConfig extends Model implements Serializable {
	
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 8529674547939560967L;
	private int id;
    private int role_id;
    private int con_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public int getCon_id() {
		return con_id;
	}
	public void setCon_id(int con_id) {
		this.con_id = con_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
}
