package usercenter.externalTask.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.data.TaskRandomCheckMapper;
import usercenter.externalTask.model.TaskRandomCheck;


@Service
public class TaskRandomCheckService {
	@Autowired
	private TaskRandomCheckMapper mapper;


	public List<TaskRandomCheck> getTaskRandomCheckList(Map<String,Object> params) {
		return mapper.getTaskRandomCheckList(params);
	}
	public void addTaskRandomCheck(TaskRandomCheck[] arr) {
		for(TaskRandomCheck obj: arr) {
			mapper.addTaskRandomCheck(obj);
		}
	}
	public void updateTaskRandomCheck(TaskRandomCheck[] arr) {
		for(TaskRandomCheck obj: arr) {
			mapper.updateTaskRandomCheck(obj);
		}
	}
	public void deleteTaskRandomCheck(TaskRandomCheck[] arr) {
		for(TaskRandomCheck obj: arr) {
			mapper.deleteTaskRandomCheck(obj);
		}
	}
}
