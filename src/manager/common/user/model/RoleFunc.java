package manager.common.user.model;

import java.io.Serializable;
import java.util.List;

import manager.common.Model;
import manager.common.main.model.Function;


/**
 * ClassName: RoleFunc
 * @Description: 角色功能类
 * @author 华慧
 * @date 2015-9-8
 */
public class RoleFunc extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private int role_id;
	private int f_id;
	private List<Role> Roles;
	private List<Function> Funcs;
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
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public List<Role> getRoles() {
		return Roles;
	}
	public void setRoles(List<Role> roles) {
		Roles = roles;
	}
	public List<Function> getFuncs() {
		return Funcs;
	}
	public void setFuncs(List<Function> funcs) {
		Funcs = funcs;
	}
	
	
}
