package manager.webPublish.data;

import java.util.List;
import java.util.Map;

import manager.webPublish.model.WebContentModule;


public interface WebContentModuleMapper {
	public List<WebContentModule> getWebContentModuleList(Map<String,Object> params);
	public void addWebContentModule(WebContentModule obj);
	public void updateWebContentModule(WebContentModule obj);
	public void deleteWebContentModule(WebContentModule obj);
}
