package manager.common.user.model;

import java.io.Serializable;
import java.util.List;

import manager.common.Model;
import manager.common.main.model.Module;


/**
 * ClassName: RoleModule
 * @Description: 角色菜单类
 * @author 华慧
 * @date 2015-9-8
 */
public class RoleModule extends Model implements Serializable {
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -5443159683803658383L;
	private int id;
	private int role_id;
	private int mod_id;
	private List<Role> Roles;
	private List<Module> Modules;
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
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public List<Role> getRoles() {
		return Roles;
	}
	public void setRoles(List<Role> roles) {
		Roles = roles;
	}
	public List<Module> getModules() {
		return Modules;
	}
	public void setModules(List<Module> modules) {
		Modules = modules;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
