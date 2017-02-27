package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.taskManager.data.MngAppTaskOutputMapper;
import manager.taskManager.model.MngAppTaskOutput;


@Service
public class MngAppTaskOutputService {
	@Autowired
	private MngAppTaskOutputMapper mapper;


	public List<MngAppTaskOutput> getAppTaskOutputList(Map<String,Object> params) {
		return mapper.getAppTaskOutputList(params);
	}
	public void addAppTaskOutput(MngAppTaskOutput[] arr) {
		for(MngAppTaskOutput obj: arr) {
			mapper.addAppTaskOutput(obj);
		}
	}
	public void updateAppTaskOutput(MngAppTaskOutput[] arr) {
		for(MngAppTaskOutput obj: arr) {
			mapper.updateAppTaskOutput(obj);
		}
	}
	public void deleteAppTaskOutput(MngAppTaskOutput[] arr) {
		for(MngAppTaskOutput obj: arr) {
			mapper.deleteAppTaskOutput(obj);
		}
	}
	
	/**
	 * 查询与任务列表相关的数据
	 * @param params t_id
	 * @return List<MngAppTaskOutput> 
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public List<MngAppTaskOutput> getAppTaskOutputListbg(Map<String,Object> params) {
		return mapper.getAppTaskOutputListbg(params);
	}
}
