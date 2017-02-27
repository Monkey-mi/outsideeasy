package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppQc;
import manager.taskManager.taskResponse.MngTaskQc;


public interface MngAppQcMapper {
	public List<MngAppQc> getAppQcList(Map<String,Object> params);
	public void addAppQc(MngAppQc obj);
	public void updateAppQc(MngAppQc obj);
	public void deleteAppQc(MngAppQc obj);
	public List<MngTaskQc> getAppQcListbg(Map<String,Object> params);
	public void updateQcFile(Map<String,Object> params);
}
