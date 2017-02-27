package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.LogisticsItemVo;
import usercenter.externalTask.model.TaskLogisticsItem;


public interface TaskLogisticsItemMapper {
	public TaskLogisticsItem getLogisticsItemforCount(Map<String,Object> params);
	public List<LogisticsItemVo> getLogisticsItemList(Integer params);
	public void addLogisticsItem(Map<String,Object> params);
	public void updateLogisticsItem(Map<String,Object> params);
	public void deleteLogisticsItem(Integer id);
	public List<TaskLogisticsItem> getLogisticsItem(Integer params);
	public Integer getTaskItemForRecordId(Integer record_id);
	public List<LogisticsItemVo> getLogisticsItemforState(Integer params);
	public void updateLogisticsItemforId(Map<String,Object> params);
	public LogisticsItemVo getLogisticsItemForRecordId(Integer params);//查询出物流清单的id和物流表的发送编号
	public String getQcState(Map<String,Object> params);//得到该物流的质检间状态
	public void updateLogisticsItemforQc(Map<String,Object> params);
}
