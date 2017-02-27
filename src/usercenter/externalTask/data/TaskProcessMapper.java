package usercenter.externalTask.data;

import java.util.List;


import usercenter.externalTask.model.TaskProcess;


public interface TaskProcessMapper {
	public List<TaskProcess> getTaskProcessList(Integer t_id);
	public void addTaskProcess(TaskProcess obj);
	public void updateTaskProcess(TaskProcess obj);
	public void deleteTaskProcess(TaskProcess obj);
}
