package usercenter.saleManage.tradeManager.response;

import java.util.Date;

public class OrderDeliverNoticeVr {
	private int			delivery_notice_id;//主键
	private String		delivery_notice_bh;//通知编号
	private Date		notice_dt;//通知时间
	private int			notice_status;//通知状态
	private int			source_type;//数据来源
	private int			creator_id;//创建人ID
	private String		creator_name;//创建人名
	private String      pur_cpyname_cn;//采购方名称
	private Date      update_dt;//通知通信时间

	public String getPur_cpyname_cn() {
		return pur_cpyname_cn;
	}
	public void setPur_cpyname_cn(String pur_cpyname_cn) {
		this.pur_cpyname_cn = pur_cpyname_cn;
	}
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
	public Date getUpdate_dt() {
		return update_dt;
	}
	public void setUpdate_dt(Date update_dt) {
		this.update_dt = update_dt;
	}
	@Override
	public String toString() {
		return "OrderDeliverNoticeVr [delivery_notice_id=" + delivery_notice_id
				+ ", delivery_notice_bh=" + delivery_notice_bh + ", notice_dt="
				+ notice_dt + ", notice_status=" + notice_status
				+ ", source_type=" + source_type + ", creator_id=" + creator_id
				+ ", creator_name=" + creator_name + ", pur_cpyname_cn="
				+ pur_cpyname_cn + ", update_dt=" + update_dt + "]";
	}
}
