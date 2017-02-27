/**    
 * 文件名：PfInvoiceTitle.java    
 *    
 * 版本信息：    
 * 日期：2016-4-25    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfInvoiceTitle    
 * 创建人：mishengliang    
 * 创建时间：2016-4-25 下午2:43:42    
 * 修改人：mishengliang    
 * 修改时间：2016-4-25 下午2:43:42    
 * @version     
 *     
 */
public class PfInvoiceTitle {
	private Integer invoice_title_id;
	private String invoice_title_name;
	private int invoice_title_sts;
	private int default_id;
	public Integer getInvoice_title_id() {
		return invoice_title_id;
	}
	public void setInvoice_title_id(Integer invoice_title_id) {
		this.invoice_title_id = invoice_title_id;
	}
	public String getInvoice_title_name() {
		return invoice_title_name;
	}
	public void setInvoice_title_name(String invoice_title_name) {
		this.invoice_title_name = invoice_title_name;
	}
	
	public int getInvoice_title_sts() {
		return invoice_title_sts;
	}
	public void setInvoice_title_sts(int invoice_title_sts) {
		this.invoice_title_sts = invoice_title_sts;
	}
	
	public int getDefault_id() {
		return default_id;
	}
	public void setDefault_id(int default_id) {
		this.default_id = default_id;
	}
	@Override
	public String toString() {
		return "PfInvoiceTitle [invoice_title_id=" + invoice_title_id
				+ ", invoice_title_name=" + invoice_title_name + "]";
	}
}
