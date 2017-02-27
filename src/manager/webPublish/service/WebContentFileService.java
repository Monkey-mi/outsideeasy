package manager.webPublish.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.webPublish.data.WebContentFileMapper;
import manager.webPublish.model.WebContentFile;


@Service
public class WebContentFileService {
	@Autowired
	private WebContentFileMapper mapper;


	public List<WebContentFile> getWebContentFileList(Map<String,Object> params) {
		return mapper.getWebContentFileList(params);
	}
	public void addWebContentFile(Map<String,Object> params) {
			mapper.addWebContentFile(params);
	}
	public void updateWebContentFile(Map<String,Object> params) {
			mapper.updateWebContentFile(params);
	}
	public void deleteWebContentFile(WebContentFile[] arr) {
		for(WebContentFile obj: arr) {
			mapper.deleteWebContentFile(obj);
		}
	}
	public void addWebFiles(Map<String, Object> params) {
		String arrayStr=params.get("mogodbIdArr").toString();
		int web_id=Integer.parseInt(params.get("webId").toString());
		String[] arrayMogodbId=arrayStr.split(",");
		for(int i=0;i<arrayMogodbId.length;i++){
			params.put("mogodb_id", arrayMogodbId[i]);
			params.put("web_id", web_id);
			updateWebContentFile(params);
		}
	}
}
