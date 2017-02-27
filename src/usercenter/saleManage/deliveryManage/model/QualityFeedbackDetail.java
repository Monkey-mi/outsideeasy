package usercenter.saleManage.deliveryManage.model;

import java.sql.Date;

public class QualityFeedbackDetail {
	private int check_detail_id;
	private int check_id;
	private int order_detail_id;
	private int check_number;
	private String check_result;
	private String check_vote;
	private Date create_dt;
	//额外字段
	private String product_name;//产品名称
	private String product_artno;//产品货号
	private String unit;//产品单位
	private Date check_dt;//质检日期
	
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
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public Date getCheck_dt() {
		return check_dt;
	}
	public void setCheck_dt(Date check_dt) {
		this.check_dt = check_dt;
	}
	public String getProduct_artno() {
		return product_artno;
	}
	public void setProduct_artno(String product_artno) {
		this.product_artno = product_artno;
	}
	
}
