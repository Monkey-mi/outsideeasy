package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 采购订单表
 * @author chenlong
 */
public class PurchaseOrder implements Serializable{
	private static final long serialVersionUID = -5968149788228579986L;
	private int			    pur_order_id;//主键
	private String			order_bh;//订单编号
	private String			agreement_bh;//合同编号
	private int			    order_status;//订单状态 10：已提交，20：已接单；30:交货完成；40:提出终止 50：终止；60：取消
	private Date			create_dt;//提交时间
	private int			    category_id;//采购类别
	private int			    supplier_id;//平台供应商档案ID
	private float			sum_money;//订单总金额
	private int			    pur_company_id;//采购方平台公司ID
	private String			pur_cpyname_cn;//采购方平台公司名称
	private int			    pur_creator_id;//采购方建单人ID
	private String			pur_creator_name;//采购方建单人名
	private int			    invoice_title_id;//发票ID
	private String			pur_invoice_type;//采购方开票类型
	private String			pur_invoice_title;//采购方开票抬头
	private int			    delivery_address_id;//收货地址表ID 对应平台收货地址维护表主键
	private String			pur_delivery_address;//采购方收货地址
	private String			pur_delivery_contact;//采购方收货联系人
	private String			pur_delivery_contact_phone;//采购方收货联系人电话
	private String			pur_memo;//采购方订单备忘
	private int			    sup_company_id;//供方平台公司ID
	private String			sup_cpyname_cn;//供方公司名称
	private String			sup_contact;//供方联系人
	private String			sup_contact_phone;//供方联系电话
	private String			sup_contact_address;//供方联系地址
	private String			sup_memo;//供方订单备忘
	private String			order_remark;//订单备注
	private int			    pur_delete_flag;//采购方逻辑删除标记 0：不删除；1：回收站；2：逻辑删除
	private int			    sup_delete_flag;//供方逻辑删除标记 0：不删除；1：回收站；2：逻辑删除
	private int			    source_type;//数据来源 0：po端；1：平台
	private int			    lock_agreement;//合同锁定字段 0:不锁定；1：锁定，锁定后供方不可上传合同
	private Date            delivery_date;//最早交期
	private String	        currency_en;//币种简称
	private int	            currency_id;//币种id

	public String getCurrency_en() {
		return currency_en;
	}
	public void setCurrency_en(String currency_en) {
		this.currency_en = currency_en;
	}
	public int getCurrency_id() {
		return currency_id;
	}
	public void setCurrency_id(int currency_id) {
		this.currency_id = currency_id;
	}
	public Date getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(Date delivery_date) {
		this.delivery_date = delivery_date;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public int getOrder_status() {
		return order_status;
	}
	public void setOrder_status(int order_status) {
		this.order_status = order_status;
	}
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public float getSum_money() {
		return sum_money;
	}
	public void setSum_money(float sum_money) {
		this.sum_money = sum_money;
	}
	public int getPur_company_id() {
		return pur_company_id;
	}
	public void setPur_company_id(int pur_company_id) {
		this.pur_company_id = pur_company_id;
	}
	public String getPur_cpyname_cn() {
		return pur_cpyname_cn;
	}
	public void setPur_cpyname_cn(String pur_cpyname_cn) {
		this.pur_cpyname_cn = pur_cpyname_cn;
	}
	public int getPur_creator_id() {
		return pur_creator_id;
	}
	public void setPur_creator_id(int pur_creator_id) {
		this.pur_creator_id = pur_creator_id;
	}
	public String getPur_creator_name() {
		return pur_creator_name;
	}
	public void setPur_creator_name(String pur_creator_name) {
		this.pur_creator_name = pur_creator_name;
	}
	public int getInvoice_title_id() {
		return invoice_title_id;
	}
	public void setInvoice_title_id(int invoice_title_id) {
		this.invoice_title_id = invoice_title_id;
	}	
	public String getPur_invoice_type() {
		return pur_invoice_type;
	}
	public void setPur_invoice_type(String pur_invoice_type) {
		this.pur_invoice_type = pur_invoice_type;
	}
	public String getPur_invoice_title() {
		return pur_invoice_title;
	}
	public void setPur_invoice_title(String pur_invoice_title) {
		this.pur_invoice_title = pur_invoice_title;
	}
	public int getDelivery_address_id() {
		return delivery_address_id;
	}
	public void setDelivery_address_id(int delivery_address_id) {
		this.delivery_address_id = delivery_address_id;
	}
	public String getPur_delivery_address() {
		return pur_delivery_address;
	}
	public void setPur_delivery_address(String pur_delivery_address) {
		this.pur_delivery_address = pur_delivery_address;
	}
	public String getPur_delivery_contact() {
		return pur_delivery_contact;
	}
	public void setPur_delivery_contact(String pur_delivery_contact) {
		this.pur_delivery_contact = pur_delivery_contact;
	}
	public String getPur_delivery_contact_phone() {
		return pur_delivery_contact_phone;
	}
	public void setPur_delivery_contact_phone(String pur_delivery_contact_phone) {
		this.pur_delivery_contact_phone = pur_delivery_contact_phone;
	}
	public String getPur_memo() {
		return pur_memo;
	}
	public void setPur_memo(String pur_memo) {
		this.pur_memo = pur_memo;
	}
	public int getSup_company_id() {
		return sup_company_id;
	}
	public void setSup_company_id(int sup_company_id) {
		this.sup_company_id = sup_company_id;
	}
	public String getSup_cpyname_cn() {
		return sup_cpyname_cn;
	}
	public void setSup_cpyname_cn(String sup_cpyname_cn) {
		this.sup_cpyname_cn = sup_cpyname_cn;
	}
	public String getSup_contact() {
		return sup_contact;
	}
	public void setSup_contact(String sup_contact) {
		this.sup_contact = sup_contact;
	}
	public String getSup_contact_phone() {
		return sup_contact_phone;
	}
	public void setSup_contact_phone(String sup_contact_phone) {
		this.sup_contact_phone = sup_contact_phone;
	}
	public String getSup_contact_address() {
		return sup_contact_address;
	}
	public void setSup_contact_address(String sup_contact_address) {
		this.sup_contact_address = sup_contact_address;
	}
	public String getSup_memo() {
		return sup_memo;
	}
	public void setSup_memo(String sup_memo) {
		this.sup_memo = sup_memo;
	}
	public String getOrder_remark() {
		return order_remark;
	}
	public void setOrder_remark(String order_remark) {
		this.order_remark = order_remark;
	}
	public int getPur_delete_flag() {
		return pur_delete_flag;
	}
	public void setPur_delete_flag(int pur_delete_flag) {
		this.pur_delete_flag = pur_delete_flag;
	}
	public int getSup_delete_flag() {
		return sup_delete_flag;
	}
	public void setSup_delete_flag(int sup_delete_flag) {
		this.sup_delete_flag = sup_delete_flag;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public int getLock_agreement() {
		return lock_agreement;
	}
	public void setLock_agreement(int lock_agreement) {
		this.lock_agreement = lock_agreement;
	}
}
