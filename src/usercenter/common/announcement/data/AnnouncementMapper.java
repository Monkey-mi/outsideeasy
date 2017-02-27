package usercenter.common.announcement.data;

import java.util.List;
import java.util.Map;

import usercenter.common.announcement.model.Announcement;
import usercenter.common.announcement.model.WebContentVo;


public interface AnnouncementMapper {
	public List<Announcement> getAnnouncementList(Map<String,Object> params);
	public void addAnnouncement(Map<String,Object> params);
	public void updateAnnouncement(Map<String,Object> params);
	public void deleteAnnouncement(Map<String,Object> params);
	public List<Announcement> getNewAnnouncementList(
			Map<String, Object> params);
	public Announcement getAnnouncementById(Map<String,Object> params);
	public List<WebContentVo> getHelpContentList(Map<String,Object> params);
}
