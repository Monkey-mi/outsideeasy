package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.model.TaskRandomCheck;


public interface TaskRandomCheckMapper {
	public List<TaskRandomCheck> getTaskRandomCheckList(Map<String,Object> params);
	public void addTaskRandomCheck(TaskRandomCheck obj);
	public void updateTaskRandomCheck(TaskRandomCheck obj);
	public void deleteTaskRandomCheck(TaskRandomCheck obj);
}
