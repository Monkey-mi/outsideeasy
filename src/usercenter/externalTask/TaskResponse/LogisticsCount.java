package usercenter.externalTask.TaskResponse;
/**
 * 物流清单的统计
 * @author chenlong
 *
 */
public class LogisticsCount {
	private double			deliver_count;//货物发送数量
	private double		arrived_count;//实到货数量
	private double		receive_count;//确认收货数量
	public double getDeliver_count() {
		return deliver_count;
	}
	public void setDeliver_count(double deliver_count) {
		this.deliver_count = deliver_count;
	}
	public double getArrived_count() {
		return arrived_count;
	}
	public void setArrived_count(double arrived_count) {
		this.arrived_count = arrived_count;
	}
	public double getReceive_count() {
		return receive_count;
	}
	public void setReceive_count(double receive_count) {
		this.receive_count = receive_count;
	}
	
}
