package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppTaskProcess;


public interface MngAppTaskProcessMapper {
	public List<MngAppTaskProcess> getAppTaskProcessList(Map<String,Object> params);
	public void addAppTaskProcess(MngAppTaskProcess obj);
	public void updateAppTaskProcess(MngAppTaskProcess obj);
	public void deleteAppTaskProcess(MngAppTaskProcess obj);
	public List<MngAppTaskProcess> getAppTaskProcessListbg(Map<String,Object> params);
}
