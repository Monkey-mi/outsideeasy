package usercenter.externalTask.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.TaskResponse.TaskAllCheckCount;
import usercenter.externalTask.data.TaskAllCheckMapper;
import usercenter.externalTask.model.TaskAllCheck;


@Service
public class TaskAllCheckService {
	@Autowired
	private TaskAllCheckMapper mapper;


	public List<TaskAllCheck> getTaskAllCheckList(Map<String,Object> params) {
		return mapper.getTaskAllCheckList(params);
	}
	public void addTaskAllCheck(Map<String,Object> params) {
			mapper.addTaskAllCheck(params);
	}
	public void updateTaskAllCheck(TaskAllCheck[] arr) {
		for(TaskAllCheck obj: arr) {
			mapper.updateTaskAllCheck(obj);
		}
	}
	public void deleteTaskAllCheck(TaskAllCheck[] arr) {
		for(TaskAllCheck obj: arr) {
			mapper.deleteTaskAllCheck(obj);
		}
	}
	public TaskAllCheckCount getTaskAllCheckCount(Map<String,Object> params) {
		return mapper.getTaskAllCheckCount(params);
	}
}
