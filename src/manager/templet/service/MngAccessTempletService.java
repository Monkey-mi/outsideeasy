package manager.templet.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.templet.data.MngAccessTempletMapper;
import manager.templet.model.MngAccessTemplet;


@Service
public class MngAccessTempletService {
	@Autowired
	private MngAccessTempletMapper mapper;


	public List<MngAccessTemplet> getMngAccessTempletList(Map<String,Object> params) {
		return mapper.getMngAccessTempletList(params);
	}
	public void addMngAccessTemplet(MngAccessTemplet[] arr) {
		for(MngAccessTemplet obj: arr) {
			mapper.addMngAccessTemplet(obj);
		}
	}
	public void updateMngAccessTemplet(MngAccessTemplet[] arr) {
		for(MngAccessTemplet obj: arr) {
			mapper.updateMngAccessTemplet(obj);
		}
	}
	public void deleteMngAccessTemplet(MngAccessTemplet[] arr) {
		for(MngAccessTemplet obj: arr) {
			mapper.deleteMngAccessTemplet(obj);
		}
	}
}
