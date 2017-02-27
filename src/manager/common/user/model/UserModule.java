package manager.common.user.model;

import java.io.Serializable;

import manager.common.Model;


/**
 * ClassName: UserModule
 * @Description: 用户菜单类
 * @author 华慧
 * @date 2015-9-7
 */
public class UserModule extends Model implements Serializable {
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -4124815003892581054L;
	private int id;
    private int u_id;
    private int mod_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
    
}
