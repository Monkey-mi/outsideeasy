package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.taskManager.data.MngAppLogisticsItemMapper;
import manager.taskManager.model.MngAppLogisticsItem;


@Service
public class MngAppLogisticsItemService {
	@Autowired
	private MngAppLogisticsItemMapper mapper;


	public List<MngAppLogisticsItem> getAppLogisticsItemList(Map<String,Object> params) {
		return mapper.getAppLogisticsItemList(params);
	}
	public void addAppLogisticsItem(MngAppLogisticsItem[] arr) {
		for(MngAppLogisticsItem obj: arr) {
			mapper.addAppLogisticsItem(obj);
		}
	}
	public void updateAppLogisticsItem(MngAppLogisticsItem[] arr) {
		for(MngAppLogisticsItem obj: arr) {
			mapper.updateAppLogisticsItem(obj);
		}
	}
	public void deleteAppLogisticsItem(MngAppLogisticsItem[] arr) {
		for(MngAppLogisticsItem obj: arr) {
			mapper.deleteAppLogisticsItem(obj);
		}
	}
}
