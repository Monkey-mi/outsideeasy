package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.TasklogisticsVo;
import usercenter.externalTask.model.TaskLogistics;





public interface TaskLogisticsMapper {
	public List<TasklogisticsVo> getTaskLogisticsList(Map<String,Object> params);
	public void addTaskLogistics(TaskLogistics taskLogistics);
	public void updateTaskLogistics(Map<String,Object> params);
	public void deleteTaskLogistics(Integer id);
	public TaskLogistics getTaskLogistics(Integer id);
	public Integer getCountLogisticsForState(Integer id);//得到该任务Id未确认的物流信息条数
	public List<TaskLogistics> getLogisticsForState(Integer taskId);//查出该任务Id未确认的物流信息
	public List<TasklogisticsVo> getTaskLogisticsBySearch(Map<String,Object> params);
	public TasklogisticsVo getTaskLogisticsByparams(Map<String,Object> params);
	public Integer getCountLogisticsForsendId(Map<String,Object> params);
	public void updateTaskLogisticsvo(Map<String,Object> params);
	public void  updateTaskLogisticspro(Map<String,Object> params);
	public String getTaskLogisticsState(Integer id);//查询出该物流信息的状态值
	public TaskLogistics regSendId(Map<String,Object> params);
	public TasklogisticsVo getTaskLogisticsCount(Map<String,Object> params);//统计已发送的货物量
	public Integer getLogisticsForStateSend(Map<String,Object> params);//统计该任务单发料未接收的数量
}
