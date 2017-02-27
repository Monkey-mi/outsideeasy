package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.TaskOutputVo;
import usercenter.externalTask.model.TaskOutput;



public interface TaskOutputMapper {
	public List<TaskOutputVo> getTaskOutputList(Map<String,Object> params);
	public void addTaskOutput(Map<String,Object> params);
	public Integer selectCountForOneday(Map<String,Object> params);
	public void updateTaskOutput(Map<String,Object> params);
	public void deleteTaskOutput(Map<String,Object> params);
	public List<TaskOutput> getTaskOutputListForMouth(Map<String,Object> params);
	public Integer getTaskOutputListCount(Map<String,Object> params);
	
	/**
	* @Description:获取任务单，目前的总完工数
	* @param t_id  sec_id(用于统计的工段，比如末级工段)
	* @return 总完工数
	* @author xufeng
	* @date 2016-5-4 
	*/
	public Integer getCountForTask(Map<String,Object> params);
	/**
	* @Description: 获取实际生产的第一天日期，保存在TaskOutput对象
	* @param t_id
	* @return TaskOutput
	* @author xufeng
	* @date 2016-5-6 
	*/
	public TaskOutput getFirstDay(Map<String,Object> params);
	/**
	 * 返回是否存在大于或小于该日期的生产量
	* @Description:
	* TaskOutputMapper
	* getTaskOutputListForMouthVo
	* @param params
	* @return List<TaskOutput>
	* @author chenlong
	* 2017-1-5 上午10:36:36
	 */
	public List<TaskOutput> getTaskOutputListForMouthVo(Map<String,Object> params);
	/**
	 * 返回该发货的id
	* @Description:
	* TaskOutputMapper
	* getTaskOutputSec
	* @param params
	* @return TaskOutput
	* @author chenlong
	* 2017-1-12 上午11:28:35
	 */
	public TaskOutput getTaskOutputSec(Map<String,Object> params);
	
}
