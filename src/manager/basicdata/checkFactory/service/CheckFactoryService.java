package manager.basicdata.checkFactory.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.basicdata.checkFactory.data.CheckFactoryMapper;
import manager.basicdata.checkFactory.model.CheckFactory;


@Service
public class CheckFactoryService {
	@Autowired
	private CheckFactoryMapper mapper;


	public List<CheckFactory> getCheckFactoryList(Map<String,Object> params) {
		return mapper.getCheckFactoryList(params);
	}
	public void addCheckFactory(CheckFactory[] arr) {
		for(CheckFactory obj: arr) {
			mapper.addCheckFactory(obj);
		}
	}
	public void updateCheckFactory(CheckFactory[] arr) {
		for(CheckFactory obj: arr) {
			mapper.updateCheckFactory(obj);
		}
	}
	public void deleteCheckFactory(CheckFactory[] arr) {
		for(CheckFactory obj: arr) {
			mapper.deleteCheckFactory(obj);
		}
	}
}
