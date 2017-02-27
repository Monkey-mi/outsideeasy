package usercenter.saleManage.tradeManager.response;

import java.util.Date;

public class OrderDeliveryVoInfo {
	private Integer     details_id;
	private String		product_name;//产品名称
	private String		product_size;//产品规格尺寸	
	private String		unit;//单位
	private String      remark;//备注
	private Date		notice_delivery_time;//通知交期日期
	private Date		confirm_delivery_time;//确认交期日期
	private int			number;//交期数量
	private String      delivery_address;//送货仓库
	private String      product_artno;//送货单号
	private String      agreement_bh;//合同编号
	private String      pur_cpyname_cn;//采购方名称
	private String clhh;//产品id
	private String htbh;//合同编号
	private int is_modified;//平台上是否有修改过交期;0:未修改；1：修改
	private int is_edit;//po抛过来的数据是否可修改，0:可修改交期；1：不可修改交期
	private Integer pur_order_id;//订单主键
	private String order_bh;//订单编号
	
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public Integer getDetails_id() {
		return details_id;
	}
	public void setDetails_id(Integer details_id) {
		this.details_id = details_id;
	}
	public String getPur_cpyname_cn() {
		return pur_cpyname_cn;
	}
	public void setPur_cpyname_cn(String pur_cpyname_cn) {
		this.pur_cpyname_cn = pur_cpyname_cn;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public String getProduct_artno() {
		return product_artno;
	}
	public void setProduct_artno(String product_artno) {
		this.product_artno = product_artno;
	}
	public String getDelivery_address() {
		return delivery_address;
	}
	public void setDelivery_address(String delivery_address) {
		this.delivery_address = delivery_address;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getProduct_size() {
		return product_size;
	}
	public void setProduct_size(String product_size) {
		this.product_size = product_size;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getNotice_delivery_time() {
		return notice_delivery_time;
	}
	public void setNotice_delivery_time(Date notice_delivery_time) {
		this.notice_delivery_time = notice_delivery_time;
	}
	public Date getConfirm_delivery_time() {
		return confirm_delivery_time;
	}
	public void setConfirm_delivery_time(Date confirm_delivery_time) {
		this.confirm_delivery_time = confirm_delivery_time;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getHtbh() {
		return htbh;
	}
	public void setHtbh(String htbh) {
		this.htbh = htbh;
	}
	public int getIs_modified() {
		return is_modified;
	}
	public void setIs_modified(int is_modified) {
		this.is_modified = is_modified;
	}
	public int getIs_edit() {
		return is_edit;
	}
	public void setIs_edit(int is_edit) {
		this.is_edit = is_edit;
	}
	public Integer getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(Integer pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	@Override
	public String toString() {
		return "OrderDeliveryVoInfo [details_id=" + details_id
				+ ", product_name=" + product_name + ", product_size="
				+ product_size + ", unit=" + unit + ", remark=" + remark
				+ ", notice_delivery_time=" + notice_delivery_time
				+ ", confirm_delivery_time=" + confirm_delivery_time
				+ ", number=" + number + ", delivery_address="
				+ delivery_address + ", product_artno=" + product_artno
				+ ", agreement_bh=" + agreement_bh + ", pur_cpyname_cn="
				+ pur_cpyname_cn + ", clhh=" + clhh + ", htbh=" + htbh
				+ ", is_modified=" + is_modified + ", is_edit=" + is_edit
				+ ", pur_order_id=" + pur_order_id + ", order_bh=" + order_bh
				+ "]";
	}
}
