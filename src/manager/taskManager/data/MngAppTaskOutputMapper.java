package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppTaskOutput;


public interface MngAppTaskOutputMapper {
	public List<MngAppTaskOutput> getAppTaskOutputList(Map<String,Object> params);
	public void addAppTaskOutput(MngAppTaskOutput obj);
	public void updateAppTaskOutput(MngAppTaskOutput obj);
	public void deleteAppTaskOutput(MngAppTaskOutput obj);
	public List<MngAppTaskOutput> getAppTaskOutputListbg(Map<String,Object> params);
}
