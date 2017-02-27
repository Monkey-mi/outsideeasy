package usercenter.externalTask.TaskResponse;

import java.io.Serializable;

public class AllStateVo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4169704819603717730L;
	private int all;
	private int toBeSend;//等待派单5
	private int sended;//已派单10
	private int producting;//生产中15
	private int finishproduct;//生产完成20
	private int taskOver;//任务完成25
	private int stoped;//取消30
	private int startEnd;//提出终止
	private int ended;//已终止
	
	
	public int getStartEnd() {
		return startEnd;
	}
	public void setStartEnd(int startEnd) {
		this.startEnd = startEnd;
	}
	public int getEnded() {
		return ended;
	}
	public void setEnded(int ended) {
		this.ended = ended;
	}
	public int getAll() {
		return all;
	}
	public void setAll(int all) {
		this.all = all;
	}
	public int getToBeSend() {
		return toBeSend;
	}
	public void setToBeSend(int toBeSend) {
		this.toBeSend = toBeSend;
	}
	public int getSended() {
		return sended;
	}
	public void setSended(int sended) {
		this.sended = sended;
	}
	public int getProducting() {
		return producting;
	}
	public void setProducting(int producting) {
		this.producting = producting;
	}
	public int getFinishproduct() {
		return finishproduct;
	}
	public void setFinishproduct(int finishproduct) {
		this.finishproduct = finishproduct;
	}
	public int getTaskOver() {
		return taskOver;
	}
	public void setTaskOver(int taskOver) {
		this.taskOver = taskOver;
	}
	public int getStoped() {
		return stoped;
	}
	public void setStoped(int stoped) {
		this.stoped = stoped;
	}
	public AllStateVo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AllStateVo(int all, int toBeSend, int sended, int producting,
			int finishproduct, int taskOver, int stoped, int startEnd, int ended) {
		super();
		this.all = all;
		this.toBeSend = toBeSend;
		this.sended = sended;
		this.producting = producting;
		this.finishproduct = finishproduct;
		this.taskOver = taskOver;
		this.stoped = stoped;
		this.startEnd = startEnd;
		this.ended = ended;
	}	
}
