package usercenter.externalTask.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.data.TaskAllcheckUnqudetailsMapper;
import usercenter.externalTask.model.TaskAllcheckUnqudetails;


@Service
public class TaskAllcheckUnqudetailsService {
	@Autowired
	private TaskAllcheckUnqudetailsMapper mapper;


	public List<TaskAllcheckUnqudetails> getTaskAllcheckUnqudetailsList(Map<String,Object> params) {
		return mapper.getTaskAllcheckUnqudetailsList(params);
	}
	public void addTaskAllcheckUnqudetails(TaskAllcheckUnqudetails[] arr) {
		for(TaskAllcheckUnqudetails obj: arr) {
			mapper.addTaskAllcheckUnqudetails(obj);
		}
	}
	public void updateTaskAllcheckUnqudetails(TaskAllcheckUnqudetails[] arr) {
		for(TaskAllcheckUnqudetails obj: arr) {
			mapper.updateTaskAllcheckUnqudetails(obj);
		}
	}
	public void deleteTaskAllcheckUnqudetails(TaskAllcheckUnqudetails[] arr) {
		for(TaskAllcheckUnqudetails obj: arr) {
			mapper.deleteTaskAllcheckUnqudetails(obj);
		}
	}
}
