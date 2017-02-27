package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.model.TaskAllcheckUnqudetails;


public interface TaskAllcheckUnqudetailsMapper {
	public List<TaskAllcheckUnqudetails> getTaskAllcheckUnqudetailsList(Map<String,Object> params);
	public void addTaskAllcheckUnqudetails(TaskAllcheckUnqudetails obj);
	public void updateTaskAllcheckUnqudetails(TaskAllcheckUnqudetails obj);
	public void deleteTaskAllcheckUnqudetails(TaskAllcheckUnqudetails obj);
}
