package usercenter.externalTask.TaskResponse;
/**
 * 返回每种状态的计数
 * @author chenlong
 */
public class StateCounts {
private int order_status;
private int stateCount;
public int getOrder_status() {
	return order_status;
}
public void setOrder_status(int order_status) {
	this.order_status = order_status;
}
public int getStateCount() {
	return stateCount;
}
public void setStateCount(int stateCount) {
	this.stateCount = stateCount;
}

}
