package manager.templet.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.templet.data.MngTempletElemnetControllTypeMapper;
import manager.templet.model.MngTempletElemnetControllType;


@Service
public class MngTempletElemnetControllTypeService {
	@Autowired
	private MngTempletElemnetControllTypeMapper mapper;


	public List<MngTempletElemnetControllType> getMngTempletElemnetControllTypeList(Map<String,Object> params) {
		return mapper.getMngTempletElemnetControllTypeList(params);
	}
	public void addMngTempletElemnetControllType(MngTempletElemnetControllType[] arr) {
		for(MngTempletElemnetControllType obj: arr) {
			mapper.addMngTempletElemnetControllType(obj);
		}
	}
	public void updateMngTempletElemnetControllType(MngTempletElemnetControllType[] arr) {
		for(MngTempletElemnetControllType obj: arr) {
			mapper.updateMngTempletElemnetControllType(obj);
		}
	}
	public void deleteMngTempletElemnetControllType(MngTempletElemnetControllType[] arr) {
		for(MngTempletElemnetControllType obj: arr) {
			mapper.deleteMngTempletElemnetControllType(obj);
		}
	}
	/**
	 * @Description: 获取元素类型表
	 * @param Map
	 * @return List<MngTempletElemnetControllType>
	 * @author chenlong
	 * @date 2016-7-7
	 */
	public List<MngTempletElemnetControllType> getelTypeList(Map<String,Object> params) {
		return mapper.getelTypeList(params);
	}
}
