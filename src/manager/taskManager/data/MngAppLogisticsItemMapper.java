package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppLogisticsItem;


public interface MngAppLogisticsItemMapper {
	public List<MngAppLogisticsItem> getAppLogisticsItemList(Map<String,Object> params);
	public void addAppLogisticsItem(MngAppLogisticsItem obj);
	public void updateAppLogisticsItem(MngAppLogisticsItem obj);
	public void deleteAppLogisticsItem(MngAppLogisticsItem obj);
}
