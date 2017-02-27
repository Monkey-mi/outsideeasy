package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppTask;
import manager.taskManager.taskResponse.MngTask;







public interface MngAppTaskMapper {
	public List<MngTask> getAppTaskList(Map<String,Object> params);
	public void addAppTask(MngAppTask obj);
	public void updateAppTask(MngAppTask obj);
	public void deleteAppTask(MngAppTask obj);
	public int getStatusById(Map<String,Object> params);//查询出状态值
	public int checkAdd(Map<String,Object> params);//检查mes任务单号  ， 能否添加
	public int checkUpdate(Map<String,Object> params);//检查mes任务单号  ， 能否update
}
