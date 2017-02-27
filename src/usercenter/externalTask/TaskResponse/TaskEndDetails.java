package usercenter.externalTask.TaskResponse;

import java.io.Serializable;

import usercenter.externalTask.model.TaskEndRecord;
import usercenter.externalTask.model.TaskFile;

public class TaskEndDetails implements Serializable{
private static final long serialVersionUID = 7286236721281302390L;

private TaskFile taskFile;
private TaskEndRecord taskEndRecord;

public TaskFile getTaskFile() {
	return taskFile;
}
public void setTaskFile(TaskFile taskFile) {
	this.taskFile = taskFile;
}
public TaskEndRecord getTaskEndRecord() {
	return taskEndRecord;
}
public void setTaskEndRecord(TaskEndRecord taskEndRecord) {
	this.taskEndRecord = taskEndRecord;
}


}
