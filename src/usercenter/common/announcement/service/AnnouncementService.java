package usercenter.common.announcement.service;

import java.util.Date;
import java.util.List;
import java.util.Map;


import manager.webPublish.model.WebPublish;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.common.announcement.data.AnnouncementMapper;
import usercenter.common.announcement.model.Announcement;
import usercenter.common.announcement.model.WebContentVo;
import util.SRMStringUtil;

@Service
public class AnnouncementService {
	@Autowired
	private AnnouncementMapper mapper;
	
	public List<Announcement> getAnnouncementList(Map<String,Object> params) throws Exception {
		List<Announcement> list=mapper.getAnnouncementList(params);
		for (Announcement announcement : list) {
			String content=announcement.getContent();
			content=SRMStringUtil.xssEncodeReverse(content);
			announcement.setContent(content.getBytes("utf-8"));
		}
		return list;
	}
	public void addAnnouncement(Map<String,Object> params) {
		mapper.addAnnouncement(params);
	}
	public void updateAnnouncement(Map<String,Object> params) {
		params.put("update_dt",new Date());
		mapper.updateAnnouncement(params);
	}
	public void deleteAnnouncement(Map<String,Object> params) {
			mapper.deleteAnnouncement(params);
	}
	/**
	 * @Description:获取页面HTML
	 * AnnouncementService
	 * getHtml
	 * @param params
	 * @return
	 * @throws Exception String
	 * @author yukai
	 * 2016-11-9 下午2:32:16
	 */
	public String getHtml(Map<String, Object> params) throws Exception {
		String string="";
		List<Announcement> list=getAnnouncementList(params);
		if (list.size()>0) {
			string=list.get(0).getContent();
		}
		return string;
	}
	/**
	 * @Description:获取最新三条公告
	 * AnnouncementService
	 * getAnnouncementList
	 * @param params
	 * @return List<Announcement>
	 * @author yukai
	 * 2016-11-9 下午2:32:37
	 */
	public List<Announcement> getNewAnnouncementList(Map<String,Object> params) {
		return mapper.getNewAnnouncementList(params);
	}
	/**
	 * @Description:根据ID获取公告
	 * AnnouncementService
	 * getAnnouncementById
	 * @param params
	 * @return Announcement
	 * @author yukai
	 * 2016-11-10 上午9:05:20
	 * @throws Exception 
	 */
	public Announcement getAnnouncementById(Map<String,Object> params) throws Exception {
		Announcement announcement=mapper.getAnnouncementById(params);
		String content=announcement.getContent();
		content=SRMStringUtil.xssEncodeReverse(content);
		announcement.setContent(content.getBytes("utf-8"));
		return announcement;
	}
	/**
	 * @Description:根据页面模块获取对应页面
	 * AnnouncementService
	 * getHelpContentList
	 * @param params
	 * @return List<WebContentVo>
	 * @author yukai
	 * 2016-11-18 下午2:21:49
	 * @throws Exception 
	 */
	public List<WebContentVo> getHelpContentList(Map<String, Object> params) throws Exception {
		List<WebContentVo>  list=mapper.getHelpContentList(params);
		for (WebContentVo webContentVo : list) {
			params.put("module_id", webContentVo.getModule_id());
			List<Announcement> list1=getAnnouncementList(params);
			webContentVo.setList(list1);
		}
		return list;
	}
}
