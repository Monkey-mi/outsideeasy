package common.user.response;

public class RegAccountCompanyVo {
	private int			company_id;//公司ID
	private String      cpyname_cn;//公司名称


	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
