package manager.templet.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.templet.data.MngTempletElementTypeMapper;
import manager.templet.model.MngTempletElementType;


@Service
public class MngTempletElementTypeService {
	@Autowired
	private MngTempletElementTypeMapper mapper;


	public List<MngTempletElementType> getMngTempletElementTypeList(Map<String,Object> params) {
		return mapper.getMngTempletElementTypeList(params);
	}
	public void addMngTempletElementType(MngTempletElementType[] arr) {
		for(MngTempletElementType obj: arr) {
			mapper.addMngTempletElementType(obj);
		}
	}
	public void updateMngTempletElementType(MngTempletElementType[] arr) {
		for(MngTempletElementType obj: arr) {
			mapper.updateMngTempletElementType(obj);
		}
	}
	public void deleteMngTempletElementType(MngTempletElementType[] arr) {
		for(MngTempletElementType obj: arr) {
			mapper.deleteMngTempletElementType(obj);
		}
	}
	/**
	 * @Description: 获取页面元素类型表
	 * @param Map
	 * @return List
	 * @author chenlong
	 * @date 2016-7-5
	 */
	public List<MngTempletElementType> getTypeList(Map<String,Object> params) {
		return mapper.getTypeList(params);
	}
}
