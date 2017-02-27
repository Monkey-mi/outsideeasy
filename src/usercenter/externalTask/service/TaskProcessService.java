package usercenter.externalTask.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.data.TaskProcessMapper;
import usercenter.externalTask.model.TaskProcess;


@Service
public class TaskProcessService {
	@Autowired
	private TaskProcessMapper mapper;


	public List<TaskProcess> getTaskProcessList(Map<String,Object> params) {
		Integer t_id =Integer.parseInt( params.get("t_id").toString());
		return mapper.getTaskProcessList(t_id);
	}
	public void addTaskProcess(TaskProcess[] arr) {
		for(TaskProcess obj: arr) {
			mapper.addTaskProcess(obj);
		}
	}
	public void updateTaskProcess(TaskProcess[] arr) {
		for(TaskProcess obj: arr) {
			mapper.updateTaskProcess(obj);
		}
	}
	public void deleteTaskProcess(TaskProcess[] arr) {
		for(TaskProcess obj: arr) {
			mapper.deleteTaskProcess(obj);
		}
	}
}
