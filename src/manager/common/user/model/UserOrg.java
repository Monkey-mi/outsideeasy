package manager.common.user.model;


import java.io.Serializable;

import manager.common.Model;


/**
 * ClassName: UserOrg
 * @Description: 用户组织类
 * @author 华慧
 * @date 2015-9-3
 */
public class UserOrg extends Model implements Serializable {
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -8812099289850517511L;
	private int id        ;
	private int u_id      ;
	private String ou_code     ;
	private int pv	      ;
	private int has_qry   ;
	private int has_curd  ;
	private int is_default;
	private String has_op1   ;
	private String has_op2   ;
	private String has_op3   ;
	private String has_op4   ;
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

	public String getOu_code() {
		return ou_code;
	}
	public void setOu_code(String ou_code) {
		this.ou_code = ou_code;
	}
	public String getHas_op1() {
		return has_op1;
	}
	public void setHas_op1(String has_op1) {
		this.has_op1 = has_op1;
	}
	public String getHas_op2() {
		return has_op2;
	}
	public void setHas_op2(String has_op2) {
		this.has_op2 = has_op2;
	}
	public String getHas_op3() {
		return has_op3;
	}
	public void setHas_op3(String has_op3) {
		this.has_op3 = has_op3;
	}
	public String getHas_op4() {
		return has_op4;
	}
	public void setHas_op4(String has_op4) {
		this.has_op4 = has_op4;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getPv() {
		return pv;
	}
	public void setPv(int pv) {
		this.pv = pv;
	}
	public int getHas_qry() {
		return has_qry;
	}
	public void setHas_qry(int has_qry) {
		this.has_qry = has_qry;
	}
	public int getHas_curd() {
		return has_curd;
	}
	public void setHas_curd(int has_curd) {
		this.has_curd = has_curd;
	}
	public int getIs_default() {
		return is_default;
	}
	public void setIs_default(int is_default) {
		this.is_default = is_default;
	}
}
