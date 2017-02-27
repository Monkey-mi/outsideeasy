package manager.webPublish.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.webPublish.data.WebContentModuleMapper;
import manager.webPublish.model.WebContentModule;


@Service
public class WebContentModuleService {
	@Autowired
	private WebContentModuleMapper mapper;


	public List<WebContentModule> getWebContentModuleList(Map<String,Object> params) {
		return mapper.getWebContentModuleList(params);
	}
	public void addWebContentModule(WebContentModule[] arr) {
		for(WebContentModule obj: arr) {
			mapper.addWebContentModule(obj);
		}
	}
	public void updateWebContentModule(WebContentModule[] arr) {
		for(WebContentModule obj: arr) {
			mapper.updateWebContentModule(obj);
		}
	}
	public void deleteWebContentModule(WebContentModule[] arr) {
		for(WebContentModule obj: arr) {
			mapper.deleteWebContentModule(obj);
		}
	}
}
