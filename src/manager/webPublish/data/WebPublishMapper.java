package manager.webPublish.data;

import java.util.List;
import java.util.Map;

import manager.webPublish.model.WebPublish;


public interface WebPublishMapper {
	public List<WebPublish> getWebPublishList(Map<String,Object> params);
	public void addWebPublish(Map<String,Object> params);
	public void updateWebPublish(Map<String,Object> params);
	public void deleteWebPublish(Map<String,Object> params);
}
