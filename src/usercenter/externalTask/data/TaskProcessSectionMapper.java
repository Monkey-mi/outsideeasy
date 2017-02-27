package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;



import usercenter.externalTask.model.TaskProcessSection;

public interface TaskProcessSectionMapper {
	public List<TaskProcessSection> getTaskProcessSectionList(Integer t_id);
	
	/**
	* @Description: 获取用于计数的工段
	* @param t_id
	* @return TaskProcessSection
	* @author xufeng
	* @date 2016-5-4 
	*/
	public TaskProcessSection getOneSection(Map<String,Object> params);
}
