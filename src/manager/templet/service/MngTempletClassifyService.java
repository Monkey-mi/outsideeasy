package manager.templet.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.templet.data.MngTempletClassifyMapper;
import manager.templet.model.MngTempletClassify;


@Service
public class MngTempletClassifyService {
	@Autowired
	private MngTempletClassifyMapper mapper;


	public List<MngTempletClassify> getMngTempletClassifyList(Map<String,Object> params) {
		return mapper.getMngTempletClassifyList(params);
	}
	public void addMngTempletClassify(MngTempletClassify[] arr) {
		for(MngTempletClassify obj: arr) {
			mapper.addMngTempletClassify(obj);
		}
	}
	public void updateMngTempletClassify(MngTempletClassify[] arr) {
		for(MngTempletClassify obj: arr) {
			mapper.updateMngTempletClassify(obj);
		}
	}
	public void deleteMngTempletClassify(MngTempletClassify[] arr) {
		for(MngTempletClassify obj: arr) {
			mapper.deleteMngTempletClassify(obj);
		}
	}
	/**
	 * @Description: 获取类型列表
	 * @param List<MngTempletClassify>
	 * @return Map
	 * @author chenlong
	 * @date 2016-7-5
	 */
	public List<MngTempletClassify> getClassifyList(Map<String,Object> params) {
		return mapper.getClassifyList(params);
	}
}
