package usercenter.externalTask.TaskResponse;

import java.io.Serializable;

public class StateCount implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7978965512081534753L;
	private int state;
	private int stateCount;
	private String deliver_number;
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getStateCount() {
		return stateCount;
	}
	public void setStateCount(int stateCount) {
		this.stateCount = stateCount;
	}
	public String getDeliver_number() {
		return deliver_number;
	}
	public void setDeliver_number(String deliver_number) {
		this.deliver_number = deliver_number;
	}
	
}
