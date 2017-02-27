package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;


import usercenter.externalTask.TaskResponse.QcVo;
import usercenter.externalTask.model.TaskQc;



public interface TaskQcMapper {
	public List<QcVo> getQcList(Integer taskId);
	public void addAppQc(Map<String,Object> params);
	public void updateQc(Map<String,Object> params);
	public void deleteQc(Integer qc_id);
	public TaskQc getQc(Integer qc_id);
	public Integer getTaskQcForRecordId(Integer taskId);
	public void addTaskQcFile(TaskQc taskQc);
	public String getCountforFile(Map<String,Object> params);
	public void  updateQcinfo(Map<String,Object> params);
	public TaskQc selectforFile(TaskQc taskQc);
	public void updateForFile(TaskQc taskQc);
	public void  updateinfo(Map<String,Object> params);
	public String selectFileinfo(Integer qc_id);
	
}
