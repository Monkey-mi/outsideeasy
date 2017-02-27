package usercenter.externalTask.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import usercenter.externalTask.data.TaskProcessSectionMapper;
import usercenter.externalTask.model.TaskProcessSection;

@Service
public class TaskProcessSectionService {
	@Resource
	private  TaskProcessSectionMapper taskProcessSectionMapper;
	/**
	 * 查询生产信息
	 * @param 
	 * @return
	 * @author chenlong
	 * @date 2016-04-28
	 */
	public List<TaskProcessSection> getTaskProcessSectionList(Integer t_id){
		
		return taskProcessSectionMapper.getTaskProcessSectionList(t_id);
		
	}
	/**
	* @Description: 获取用于计数的工段
	* @param t_id
	* @return TaskProcessSection
	* @author xufeng
	* @date 2016-5-4 
	*/
	public TaskProcessSection getOneSection(Map<String,Object> params){
		return taskProcessSectionMapper.getOneSection(params);
	}
}
