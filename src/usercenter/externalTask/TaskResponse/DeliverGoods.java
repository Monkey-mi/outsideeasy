package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.List;

import usercenter.externalTask.model.Task;
/**
 * 
 * @author chenlong
 */
public class DeliverGoods implements Serializable{
	
private static final long serialVersionUID = 9137638043249292176L;
private String company_name;//公司名
private String deliver_number;//发货单号
private int listlength;//清单的数量
private List<Task> list;//任务单列表信息
//private String[] deliver_ids;//清单的所有的id
private boolean flag;//判断是否添加成功（验证任务单组是否是同一个公司）

public String getCompany_name() {
	return company_name;
}
public void setCompany_name(String company_name) {
	this.company_name = company_name;
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
public List<Task> getList() {
	return list;
}
public void setList(List<Task> list) {
	this.list = list;
}
public boolean isFlag() {
	return flag;
}
public void setFlag(boolean flag) {
	this.flag = flag;
}


}
