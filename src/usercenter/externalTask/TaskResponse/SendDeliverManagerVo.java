package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.List;

import usercenter.externalTask.model.TaskDeliverGoods;

public class SendDeliverManagerVo implements Serializable{
private static final long serialVersionUID = -6996563571899943790L;

private List<TaskDeliverGoods> list;//发货列表
private AllStateVo allStateVo;//发货计数
public List<TaskDeliverGoods> getList() {
	return list;
}
public void setList(List<TaskDeliverGoods> list) {
	this.list = list;
}
public AllStateVo getAllStateVo() {
	return allStateVo;
}
public void setAllStateVo(AllStateVo allStateVo) {
	this.allStateVo = allStateVo;
}

}
