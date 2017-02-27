package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOutHtmxbMapper;
import platform.contract.model.PfOutHtmxb;


@Service
public class PfOutHtmxbService {
	@Autowired
	private PfOutHtmxbMapper mapper;


	public List<PfOutHtmxb> getPfOutHtmxbList(Map<String,Object> params) {
		return mapper.getPfOutHtmxbList(params);
	}
	public void addPfOutHtmxb(PfOutHtmxb[] arr) {
		for(PfOutHtmxb obj: arr) {
			mapper.addPfOutHtmxb(obj);
		}
	}
	public void updatePfOutHtmxb(PfOutHtmxb[] arr) {
		for(PfOutHtmxb obj: arr) {
			mapper.updatePfOutHtmxb(obj);
		}
	}
	public void deleteOutHtmxb(PfOutHtmxb[] arr) {
		for(PfOutHtmxb obj: arr) {
			mapper.deletePfOutHtmxb(obj);
		}
	}
}
