package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.taskManager.data.MngAppTaskBomMapper;
import manager.taskManager.model.MngAppTaskBom;


@Service
public class MngAppTaskBomService {
	@Autowired
	private MngAppTaskBomMapper mapper;


	public List<MngAppTaskBom> getAppTaskBomList(Map<String,Object> params) {
		return mapper.getAppTaskBomList(params);
	}
	public void addAppTaskBom(MngAppTaskBom[] arr) {
		for(MngAppTaskBom obj: arr) {
			mapper.addAppTaskBom(obj);
		}
	}
	public void updateAppTaskBom(MngAppTaskBom[] arr) {
		for(MngAppTaskBom obj: arr) {
			mapper.updateAppTaskBom(obj);
		}
	}
	public void deleteAppTaskBom(MngAppTaskBom[] arr) {
		for(MngAppTaskBom obj: arr) {
			mapper.deleteAppTaskBom(obj);
		}
	}
	
	/**
	 * 查询与任务列表相关的数据
	 * @param params t_id
	 * @return List<MngAppTaskBom>
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public List<MngAppTaskBom> getAppTaskBomListbg(Map<String,Object> params) {
		return mapper.getAppTaskBomListbg(params);
	}
}
