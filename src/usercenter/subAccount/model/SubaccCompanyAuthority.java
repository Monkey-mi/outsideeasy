package usercenter.subAccount.model;

import java.io.Serializable;
/**
 * 子账号往来单位权限表
 * @author chenlong
 */
public class SubaccCompanyAuthority implements Serializable {
	private static final long serialVersionUID = 6855165347514398304L;
	private int			ba_id;//用户往来单位权限表主键
	private int			sa_id;//子账号ID
	private int			company_id;//公司编号
	private int	        is_delete;//是否删除

	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public int getBa_id() {
		return ba_id;
	}
	public void setBa_id(int ba_id) {
		this.ba_id = ba_id;
	}
	public int getSa_id() {
		return sa_id;
	}
	public void setSa_id(int sa_id) {
		this.sa_id = sa_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
