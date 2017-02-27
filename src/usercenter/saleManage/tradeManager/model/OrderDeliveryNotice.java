package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 送货通知表
 * @author chenlong
 */
public class OrderDeliveryNotice implements Serializable {
	private static final long serialVersionUID = 1106240324609837510L;
	private int			delivery_notice_id;//主键
	private String		delivery_notice_bh;//通知编号
	private Date		notice_dt;//通知时间
	private int			notice_status;//通知状态 0:提交，等待确认；1：修改交期；2：确认交期
	private int			source_type;//数据来源
	private int			creator_id;//创建人ID
	private String		creator_name;//创建人名
	private int pur_company_id;//通知发送方
	private int sup_company_id;//通知的接收方
	private int supplier_id;
	private String cpyname_cn;//采购方公司名
	private String sup_cpyname_cn;//销售方公司名
	private Date update_dt;//更新日期

	public int getDelivery_notice_id() {
		return delivery_notice_id;
	}
	public void setDelivery_notice_id(int delivery_notice_id) {
		this.delivery_notice_id = delivery_notice_id;
	}
	public String getDelivery_notice_bh() {
		return delivery_notice_bh;
	}
	public void setDelivery_notice_bh(String delivery_notice_bh) {
		this.delivery_notice_bh = delivery_notice_bh;
	}
	public Date getNotice_dt() {
		return notice_dt;
	}
	public void setNotice_dt(Date notice_dt) {
		this.notice_dt = notice_dt;
	}
	public int getNotice_status() {
		return notice_status;
	}
	public void setNotice_status(int notice_status) {
		this.notice_status = notice_status;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public int getCreator_id() {
		return creator_id;
	}
	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}
	public String getCreator_name() {
		return creator_name;
	}
	public void setCreator_name(String creator_name) {
		this.creator_name = creator_name;
	}
	public int getPur_company_id() {
		return pur_company_id;
	}
	public void setPur_company_id(int pur_company_id) {
		this.pur_company_id = pur_company_id;
	}
	public int getSup_company_id() {
		return sup_company_id;
	}
	public void setSup_company_id(int sup_company_id) {
		this.sup_company_id = sup_company_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	
	public String getSup_cpyname_cn() {
		return sup_cpyname_cn;
	}
	public void setSup_cpyname_cn(String sup_cpyname_cn) {
		this.sup_cpyname_cn = sup_cpyname_cn;
	}
	public Date getUpdate_dt() {
		return update_dt;
	}
	public void setUpdate_dt(Date update_dt) {
		this.update_dt = update_dt;
	}
	@Override
	public String toString() {
		return "OrderDeliveryNotice [delivery_notice_id=" + delivery_notice_id
				+ ", delivery_notice_bh=" + delivery_notice_bh + ", notice_dt="
				+ notice_dt + ", notice_status=" + notice_status
				+ ", source_type=" + source_type + ", creator_id=" + creator_id
				+ ", creator_name=" + creator_name + ", pur_company_id="
				+ pur_company_id + ", sup_company_id=" + sup_company_id
				+ ", supplier_id=" + supplier_id + ", cpyname_cn=" + cpyname_cn
				+ ", sup_cpyname_cn=" + sup_cpyname_cn + ", update_dt="
				+ update_dt + "]";
	}
}
