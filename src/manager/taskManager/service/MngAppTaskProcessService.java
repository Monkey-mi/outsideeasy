package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.taskManager.data.MngAppTaskProcessMapper;
import manager.taskManager.model.MngAppTaskProcess;


@Service
public class MngAppTaskProcessService {
	@Autowired
	private MngAppTaskProcessMapper mapper;


	public List<MngAppTaskProcess> getAppTaskProcessList(Map<String,Object> params) {
		return mapper.getAppTaskProcessList(params);
	}
	public void addAppTaskProcess(MngAppTaskProcess[] arr) {
		for(MngAppTaskProcess obj: arr) {
			mapper.addAppTaskProcess(obj);
		}
	}
	public void updateAppTaskProcess(MngAppTaskProcess[] arr) {
		for(MngAppTaskProcess obj: arr) {
			mapper.updateAppTaskProcess(obj);
		}
	}
	public void deleteAppTaskProcess(MngAppTaskProcess[] arr) {
		for(MngAppTaskProcess obj: arr) {
			mapper.deleteAppTaskProcess(obj);
		}
	}
	
	/**
	 * 查询与任务列表相关的数据
	 * @param params t_id
	 * @return List<MngAppTaskProcess>
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public List<MngAppTaskProcess> getAppTaskProcessListbg(Map<String,Object> params) {
		return mapper.getAppTaskProcessListbg(params);
	}
}
