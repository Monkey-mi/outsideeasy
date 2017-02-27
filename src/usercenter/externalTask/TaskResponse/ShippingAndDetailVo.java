package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.List;

import usercenter.externalTask.model.ShippingRegistration;
import usercenter.externalTask.model.TaskFile;
/**
 * 运单详情和发货详情的回参模型
 * @author lenovo
 */
public class ShippingAndDetailVo implements Serializable{
private static final long serialVersionUID = 3625975814028317536L;

private List<DeliverGoodsListVo> deliverGoodsListVo;//发货单详情页面返回
private List<ShippingDetailListVo> shippingDetailListVos;//发货单详情
private ShippingDetailListVo shippingDetailListVo;//发货单详情
private ShippingRegistration shippingRegistration;//运单信息
private List<TaskFile> taskFiles;//文件信息


public ShippingDetailListVo getShippingDetailListVo() {
	return shippingDetailListVo;
}
public void setShippingDetailListVo(ShippingDetailListVo shippingDetailListVo) {
	this.shippingDetailListVo = shippingDetailListVo;
}
public List<ShippingDetailListVo> getShippingDetailListVos() {
	return shippingDetailListVos;
}
public void setShippingDetailListVos(
		List<ShippingDetailListVo> shippingDetailListVos) {
	this.shippingDetailListVos = shippingDetailListVos;
}
public List<DeliverGoodsListVo> getDeliverGoodsListVo() {
	return deliverGoodsListVo;
}
public void setDeliverGoodsListVo(List<DeliverGoodsListVo> deliverGoodsListVo) {
	this.deliverGoodsListVo = deliverGoodsListVo;
}
public ShippingRegistration getShippingRegistration() {
	return shippingRegistration;
}
public void setShippingRegistration(ShippingRegistration shippingRegistration) {
	this.shippingRegistration = shippingRegistration;
}
public List<TaskFile> getTaskFiles() {
	return taskFiles;
}
public void setTaskFiles(List<TaskFile> taskFiles) {
	this.taskFiles = taskFiles;
}

}
