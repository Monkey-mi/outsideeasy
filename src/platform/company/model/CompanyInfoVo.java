package platform.company.model;

public class CompanyInfoVo {
	private String cpyname_cn;//公司名
	private Integer apply_sts;//是否认证
	private Integer			company_id;
	private Integer			state;//变更状态
	private boolean canUpdate;//是否可以入住变更
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public Integer getApply_sts() {
		return apply_sts;
	}
	public void setApply_sts(Integer apply_sts) {
		this.apply_sts = apply_sts;
	}
	public Integer getCompany_id() {
		return company_id;
	}
	public void setCompany_id(Integer company_id) {
		this.company_id = company_id;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public boolean isCanUpdate() {
		return canUpdate;
	}
	public void setCanUpdate(boolean canUpdate) {
		this.canUpdate = canUpdate;
	}
	
}
