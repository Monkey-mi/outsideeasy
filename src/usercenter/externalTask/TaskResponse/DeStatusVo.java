package usercenter.externalTask.TaskResponse;

import java.io.Serializable;

public class DeStatusVo implements Serializable {
private static final long serialVersionUID = 3378544840552719772L;
private int deliver_state;
private int shipping_id;
private double delivery_quantity;
private int t_id;
private int deliver_id;
private int shipping_state;
private String deliver_number;
private int deliver_type;

public int getDeliver_type() {
	return deliver_type;
}
public void setDeliver_type(int deliver_type) {
	this.deliver_type = deliver_type;
}
public String getDeliver_number() {
	return deliver_number;
}
public void setDeliver_number(String deliver_number) {
	this.deliver_number = deliver_number;
}
public int getDeliver_id() {
	return deliver_id;
}
public void setDeliver_id(int deliver_id) {
	this.deliver_id = deliver_id;
}
public int getShipping_state() {
	return shipping_state;
}
public void setShipping_state(int shipping_state) {
	this.shipping_state = shipping_state;
}
public int getT_id() {
	return t_id;
}
public void setT_id(int t_id) {
	this.t_id = t_id;
}
public double getDelivery_quantity() {
	return delivery_quantity;
}
public void setDelivery_quantity(double delivery_quantity) {
	this.delivery_quantity = delivery_quantity;
}
public int getDeliver_state() {
	return deliver_state;
}
public void setDeliver_state(int deliver_state) {
	this.deliver_state = deliver_state;
}
public int getShipping_id() {
	return shipping_id;
}
public void setShipping_id(int shipping_id) {
	this.shipping_id = shipping_id;
}

}
