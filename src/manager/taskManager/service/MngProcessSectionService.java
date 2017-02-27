package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.taskManager.data.MngProcessSectionMapper;
import manager.taskManager.model.MngProcessSection;


@Service
public class MngProcessSectionService {
	@Autowired
	private MngProcessSectionMapper mapper;


	public List<MngProcessSection> getMngProcessSectionList(Map<String,Object> params) {
		return mapper.getMngProcessSectionList(params);
	}
	public void addMngProcessSection(MngProcessSection[] arr) {
		for(MngProcessSection obj: arr) {
			mapper.addMngProcessSection(obj);
		}
	}
	public void updateMngProcessSection(MngProcessSection[] arr) {
		for(MngProcessSection obj: arr) {
			mapper.updateMngProcessSection(obj);
		}
	}
	public void deleteMngProcessSection(MngProcessSection[] arr) {
		for(MngProcessSection obj: arr) {
			mapper.deleteMngProcessSection(obj);
		}
	}
}
