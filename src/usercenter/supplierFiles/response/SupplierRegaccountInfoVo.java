package usercenter.supplierFiles.response;

/**
 * 作为供应商的回参的封装
 * @author chenglong
 * @date 2016-8-2
 */
public class SupplierRegaccountInfoVo {
	private int			supplier_id;//供应商档案Id
	private String      supplier_cpyname;//供应商的名称
	private int         company_id;//公司id
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public String getSupplier_cpyname() {
		return supplier_cpyname;
	}
	public void setSupplier_cpyname(String supplier_cpyname) {
		this.supplier_cpyname = supplier_cpyname;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	
}
