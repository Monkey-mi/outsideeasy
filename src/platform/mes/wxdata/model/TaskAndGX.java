package platform.mes.wxdata.model;

import java.io.Serializable;
import java.util.List;

public class TaskAndGX implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8421802967644008353L;
	private PfTask task;
	private List<PfTaskProcess> gxlist;
	private List<PfTaskBom> bomlist;
	
	public List<PfTaskBom> getBomlist() {
		return bomlist;
	}
	public void setBomlist(List<PfTaskBom> bomlist) {
		this.bomlist = bomlist;
	}
	public PfTask getTask() {
		return task;
	}
	public void setTask(PfTask task) {
		this.task = task;
	}
	public List<PfTaskProcess> getGxlist() {
		return gxlist;
	}
	public void setGxlist(List<PfTaskProcess> gxlist) {
		this.gxlist = gxlist;
	}
	
	
}
