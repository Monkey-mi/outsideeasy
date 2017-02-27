package manager.common.user.model;

import java.io.Serializable;

import manager.common.Model;


/**
 * ClassName: UserFunc
 * @Description: 用户功能类
 * @author 华慧
 * @date 2015-9-7
 */
public class UserFunc extends Model implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
    private int u_id;
    private int f_id;
    private int ou_id;
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
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public int getOu_id() {
		return ou_id;
	}
	public void setOu_id(int ou_id) {
		this.ou_id = ou_id;
	}
    
}
