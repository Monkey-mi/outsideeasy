package manager.webPublish.data;

import java.util.List;
import java.util.Map;

import manager.webPublish.model.WebContentFile;


public interface WebContentFileMapper {
	public List<WebContentFile> getWebContentFileList(Map<String,Object> params);
	public void addWebContentFile(Map<String,Object> params);
	public void updateWebContentFile(Map<String,Object> params);
	public void deleteWebContentFile(WebContentFile obj);
}
