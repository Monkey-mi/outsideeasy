package usercenter.externalTask.TaskResponse;
/**
 * 质检的统计
 * @author chenlong
 *
 */
public class QcCountVo {
	private double		deliver_qccount;//质检货物总量
	private double		arrived_qccount;//不合格总量
	private double		receive_qccount;//合格总量
	private double		unfinished_count;//未完成的数量
	
	
	public double getUnfinished_count() {
		return unfinished_count;
	}
	public void setUnfinished_count(double unfinished_count) {
		this.unfinished_count = unfinished_count;
	}
	public double getDeliver_qccount() {
		return deliver_qccount;
	}
	public void setDeliver_qccount(double deliver_qccount) {
		this.deliver_qccount = deliver_qccount;
	}
	public double getArrived_qccount() {
		return arrived_qccount;
	}
	public void setArrived_qccount(double arrived_qccount) {
		this.arrived_qccount = arrived_qccount;
	}
	public double getReceive_qccount() {
		return receive_qccount;
	}
	public void setReceive_qccount(double receive_qccount) {
		this.receive_qccount = receive_qccount;
	}
	
}
