package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppTaskLogistics;


public interface MngAppTaskLogisticsMapper {
	public List<MngAppTaskLogistics> getAppTaskLogisticsList(Map<String,Object> params);
	public void addAppTaskLogistics(MngAppTaskLogistics obj);
	public void updateAppTaskLogistics(MngAppTaskLogistics obj);
	public void deleteAppTaskLogistics(MngAppTaskLogistics obj);
	public List<MngAppTaskLogistics> getAppTaskLogisticsListbg(Map<String,Object> params);
}
