package manager.common.user.model;


import java.io.Serializable;

import manager.common.Model;



/**
 * ClassName: UserRole
 * @Description: 用户角色类
 * @author 华慧
 * @date 2015-9-4
 */
public class UserRole extends Model implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -9185027699710367475L;
	private int id;
    private int u_id;
    private int role_id;
    private String name;
    private String login_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int uId) {
		u_id = uId;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int roleId) {
		role_id = roleId;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
