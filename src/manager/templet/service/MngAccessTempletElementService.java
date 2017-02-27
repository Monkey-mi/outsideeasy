package manager.templet.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.templet.data.MngAccessTempletElementMapper;
import manager.templet.model.MngAccessTempletElement;


@Service
public class MngAccessTempletElementService {
	@Autowired
	private MngAccessTempletElementMapper mapper;


	public List<MngAccessTempletElement> getMngAccessTempletElementList(Map<String,Object> params) {
		return mapper.getMngAccessTempletElementList(params);
	}
	public void addMngAccessTempletElement(MngAccessTempletElement[] arr) {
		for(MngAccessTempletElement obj: arr) {
			mapper.addMngAccessTempletElement(obj);
		}
	}
	public void updateMngAccessTempletElement(MngAccessTempletElement[] arr) {
		for(MngAccessTempletElement obj: arr) {
			mapper.updateMngAccessTempletElement(obj);
		}
	}
	public void deleteMngAccessTempletElement(MngAccessTempletElement[] arr) {
		for(MngAccessTempletElement obj: arr) {
			mapper.deleteMngAccessTempletElement(obj);
		}
	}
	/**
	 * @Description: 获取元素列表
	 * @param Map
	 * @return List<MngAccessTempletElement>
	 * @author chenlong
	 * @date 2016-7-5
	 */
	public List<MngAccessTempletElement> getElementList(Map<String,Object> params) {
		return mapper.getElementList(params);
	}
}
