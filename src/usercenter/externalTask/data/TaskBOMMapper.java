package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.model.TaskBom;


public interface TaskBOMMapper {
	public List<TaskBom> getTaskBomList(Integer taskId);
	public void addTaskBom(Map<String,Object> params);
	public void updateTaskBom(Map<String,Object> params);
	public void deleteTaskBom(Integer tb_id);
	public TaskBom getTaskBom(Integer tb_id);
}
