package usercenter.externalTask.model;

import java.io.Serializable;
import java.util.Date;

public class TaskEndRecord implements Serializable{

private static final long serialVersionUID = -3275873764674326227L;
private int    task_end_id;//
private int    t_id;//任务单ID
private String end_description;//终止说明
private int    end_status;//终止状态
private Date   create_dt;//创建时间
private Date   confirm_dt;//确认时间
public int getTask_end_id() {
	return task_end_id;
}
public void setTask_end_id(int task_end_id) {
	this.task_end_id = task_end_id;
}
public int getT_id() {
	return t_id;
}
public void setT_id(int t_id) {
	this.t_id = t_id;
}
public String getEnd_description() {
	return end_description;
}
public void setEnd_description(String end_description) {
	this.end_description = end_description;
}
public int getEnd_status() {
	return end_status;
}
public void setEnd_status(int end_status) {
	this.end_status = end_status;
}
public Date getCreate_dt() {
	return create_dt;
}
public void setCreate_dt(Date create_dt) {
	this.create_dt = create_dt;
}
public Date getConfirm_dt() {
	return confirm_dt;
}
public void setConfirm_dt(Date confirm_dt) {
	this.confirm_dt = confirm_dt;
}

}
