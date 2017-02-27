package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.List;

import usercenter.externalTask.model.Task;
/**
 * 运单的任务单列表
 * @author lenovo
 */
public class TakForShipping implements Serializable{
private static final long serialVersionUID = -2051651109845035040L;
private List<Task> task;
private boolean regComment = true;//判断是否存在不同公司的任务单

public List<Task> getTask() {
	return task;
}
public void setTask(List<Task> task) {
	this.task = task;
}
public boolean isRegComment() {
	return regComment;
}
public void setRegComment(boolean regComment) {
	this.regComment = regComment;
}

}
