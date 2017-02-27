package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.taskManager.data.MngAppTaskLogisticsMapper;
import manager.taskManager.model.MngAppTaskLogistics;


@Service
public class MngAppTaskLogisticsService {
	@Autowired
	private MngAppTaskLogisticsMapper mapper;


	public List<MngAppTaskLogistics> getAppTaskLogisticsList(Map<String,Object> params) {
		return mapper.getAppTaskLogisticsList(params);
	}
	public void addAppTaskLogistics(MngAppTaskLogistics[] arr) {
		for(MngAppTaskLogistics obj: arr) {
			mapper.addAppTaskLogistics(obj);
		}
	}
	public void updateAppTaskLogistics(MngAppTaskLogistics[] arr) {
		for(MngAppTaskLogistics obj: arr) {
			mapper.updateAppTaskLogistics(obj);
		}
	}
	public void deleteAppTaskLogistics(MngAppTaskLogistics[] arr) {
		for(MngAppTaskLogistics obj: arr) {
			mapper.deleteAppTaskLogistics(obj);
		}
	}
	
	/**
	 * 查询与任务列表相关的数据
	 * @param params t_id
	 * @return List<MngAppTaskLogistics>
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public List<MngAppTaskLogistics> getAppTaskLogisticsListbg(Map<String,Object> params) {
		return mapper.getAppTaskLogisticsListbg(params);
	}
}
