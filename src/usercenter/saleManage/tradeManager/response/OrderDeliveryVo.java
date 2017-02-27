package usercenter.saleManage.tradeManager.response;

import java.util.Date;

public class OrderDeliveryVo {
	private String		product_name;//产品名称
	private String		product_size;//产品规格尺寸	
	private String		unit;//单位
	private String      remark;//备注
	private Date		notice_delivery_time;//通知交期日期
	private Date		confirm_delivery_time;//确认交期日期
	private int			number;//交期数量
	private String      delivery_address;//送货仓库
	private String      product_artno;//送货单号
	
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
	
}
