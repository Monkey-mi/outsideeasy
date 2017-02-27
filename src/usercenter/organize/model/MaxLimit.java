package usercenter.organize.model;

import java.io.Serializable;

public class MaxLimit implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3279854372867857066L;
	private int			limit_id;
	private int			maxnum;
	private int			level;
	public int getLimit_id() {
		return limit_id;
	}
	public void setLimit_id(int limit_id) {
		this.limit_id = limit_id;
	}
	public int getMaxnum() {
		return maxnum;
	}
	public void setMaxnum(int maxnum) {
		this.maxnum = maxnum;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	
}
