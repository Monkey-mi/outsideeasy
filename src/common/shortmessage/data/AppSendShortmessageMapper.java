package common.shortmessage.data;

import java.util.List;
import java.util.Map;

import common.shortmessage.model.AppSendShortmessage;


public interface AppSendShortmessageMapper {
	public List<AppSendShortmessage> getAppSendShortmessageList(Map<String,Object> params);
	public void addAppSendShortmessage(AppSendShortmessage obj);
	public void updateAppSendShortmessage(AppSendShortmessage obj);
	public void deleteAppSendShortmessage(AppSendShortmessage obj);
	

	public int ipSendCountOneDay(Map<String, Object> params);
}
