package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
/**
 * 运货单详情
 * @author lenovo
 */
public class ShippingDetailListVo implements Serializable {
	
private static final long serialVersionUID = -5289701409341924966L;

private List<DeliverGoodsListVo> list;//发货单列表
private String deliver_number;
private int    listlength;
private String customer_name;
private int    deliver_state;//发货状态
private int    deliver_type;
private Date   confirm_dt;//交货日期
private String receipt_remark;//收货备注

public String getReceipt_remark() {
	return receipt_remark;
}
public void setReceipt_remark(String receipt_remark) {
	this.receipt_remark = receipt_remark;
}
public Date getConfirm_dt() {
	return confirm_dt;
}
public void setConfirm_dt(Date confirm_dt) {
	this.confirm_dt = confirm_dt;
}
public List<DeliverGoodsListVo> getList() {
	return list;
}
public int getDeliver_type() {
	return deliver_type;
}

public void setDeliver_type(int deliver_type) {
	this.deliver_type = deliver_type;
}

public void setList(List<DeliverGoodsListVo> list) {
	this.list = list;
}
public String getDeliver_number() {
	return deliver_number;
}
public void setDeliver_number(String deliver_number) {
	this.deliver_number = deliver_number;
}
public int getListlength() {
	return listlength;
}
public void setListlength(int listlength) {
	this.listlength = listlength;
}
public String getCustomer_name() {
	return customer_name;
}
public void setCustomer_name(String customer_name) {
	this.customer_name = customer_name;
}
public int getDeliver_state() {
	return deliver_state;
}
public void setDeliver_state(int deliver_state) {
	this.deliver_state = deliver_state;
}

}
