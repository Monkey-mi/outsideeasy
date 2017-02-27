package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfOrderCheckDetails implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			check_detail_id;
	private int			check_id;
	private int			order_detail_id;
	private int			check_number;
	private String			check_result;
	private String			check_vote;
	private Date			create_dt;

	public int getCheck_detail_id() {
		return check_detail_id;
	}
	public void setCheck_detail_id(int check_detail_id) {
		this.check_detail_id = check_detail_id;
	}
	public int getCheck_id() {
		return check_id;
	}
	public void setCheck_id(int check_id) {
		this.check_id = check_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public int getCheck_number() {
		return check_number;
	}
	public void setCheck_number(int check_number) {
		this.check_number = check_number;
	}
	public String getCheck_result() {
		return check_result;
	}
	public void setCheck_result(String check_result) {
		this.check_result = check_result;
	}
	public String getCheck_vote() {
		return check_vote;
	}
	public void setCheck_vote(String check_vote) {
		this.check_vote = check_vote;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
