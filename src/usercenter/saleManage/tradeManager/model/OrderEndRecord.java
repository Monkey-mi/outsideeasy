package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 订单终止记录表
 * @author chenlong
 */
public class OrderEndRecord implements Serializable{
	private static final long serialVersionUID = -2006824559322382667L;
	private int			order_end_id;//主键
	private int			pur_order_id;//订单ID
	private String		end_description;//终止说明
	private String		mogodb_id;//终止协议mogodb_id
	private int			end_status;//终止状态  0:终止提交；1：确认2：取消终止
	private Date		create_dt;//创建时间
	private Date        confirm_dt;//确认时间

	public Date getConfirm_dt() {
		return confirm_dt;
	}
	public void setConfirm_dt(Date confirm_dt) {
		this.confirm_dt = confirm_dt;
	}
	public int getOrder_end_id() {
		return order_end_id;
	}
	public void setOrder_end_id(int order_end_id) {
		this.order_end_id = order_end_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getEnd_description() {
		return end_description;
	}
	public void setEnd_description(String end_description) {
		this.end_description = end_description;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public int getEnd_status() {
		return end_status;
	}
	public void setEnd_status(int end_status) {
		this.end_status = end_status;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	
}
