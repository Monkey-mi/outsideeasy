package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 收货明细
 * @author chenlong
 */
public class ReceiptDetail implements Serializable{
	private static final long serialVersionUID = -6732401275789548305L;
	private int			    receipt_id;//收货明细ID
	private int			    t_id;//任务单的主键
	private int			    deliver_id;//发货清单的主键
	private double			deliver_no;//送货数量
	private double			receive_no;//确认接收数量
	private Date			create_dt;//创建时间

	public int getReceipt_id() {
		return receipt_id;
	}
	public void setReceipt_id(int receipt_id) {
		this.receipt_id = receipt_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public int getDeliver_id() {
		return deliver_id;
	}
	public void setDeliver_id(int deliver_id) {
		this.deliver_id = deliver_id;
	}
	public double getDeliver_no() {
		return deliver_no;
	}
	public void setDeliver_no(double deliver_no) {
		this.deliver_no = deliver_no;
	}	
	public double getReceive_no() {
		return receive_no;
	}
	public void setReceive_no(double receive_no) {
		this.receive_no = receive_no;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}

}
