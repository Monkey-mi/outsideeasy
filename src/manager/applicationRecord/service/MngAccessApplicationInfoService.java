package manager.applicationRecord.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.applicationRecord.data.MngAccessApplicationInfoMapper;
import manager.applicationRecord.model.MngAccessApplicationInfo;


@Service
public class MngAccessApplicationInfoService {
	@Autowired
	private MngAccessApplicationInfoMapper mapper;


	public List<MngAccessApplicationInfo> getMngAccessApplicationInfoList(Map<String,Object> params) {
		return mapper.getMngAccessApplicationInfoList(params);
	}
	public void addMngAccessApplicationInfo(MngAccessApplicationInfo[] arr) {
		for(MngAccessApplicationInfo obj: arr) {
			mapper.addMngAccessApplicationInfo(obj);
		}
	}
	public void updateMngAccessApplicationInfo(MngAccessApplicationInfo[] arr) {
		for(MngAccessApplicationInfo obj: arr) {
			mapper.updateMngAccessApplicationInfo(obj);
		}
	}
	public void deleteMngAccessApplicationInfo(MngAccessApplicationInfo[] arr) {
		for(MngAccessApplicationInfo obj: arr) {
			mapper.deleteMngAccessApplicationInfo(obj);
		}
	}
}
