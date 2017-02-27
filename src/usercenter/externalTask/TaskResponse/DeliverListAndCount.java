package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.List;

import usercenter.externalTask.model.TaskDeliverGoods;
/**
 * 返回任务单相关的送货列表信息
 * @author chenlong
 */
public class DeliverListAndCount implements Serializable {
private static final long serialVersionUID = -4090078702292922873L;
private List<TaskDeliverGoods> list;
private double deliver_reAll;
private double deliver_all;

public List<TaskDeliverGoods> getList() {
	return list;
}
public void setList(List<TaskDeliverGoods> list) {
	this.list = list;
}
public double getDeliver_reAll() {
	return deliver_reAll;
}
public void setDeliver_reAll(double deliver_reAll) {
	this.deliver_reAll = deliver_reAll;
}
public double getDeliver_all() {
	return deliver_all;
}
public void setDeliver_all(double deliver_all) {
	this.deliver_all = deliver_all;
}

}
