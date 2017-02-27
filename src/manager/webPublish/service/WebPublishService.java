package manager.webPublish.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

import util.Const;
import util.SRMStringUtil;
import util.SessionUtil;

import manager.common.user.model.UserInfo;
import manager.webPublish.data.WebContentFileMapper;
import manager.webPublish.data.WebPublishMapper;
import manager.webPublish.model.WebContentFile;
import manager.webPublish.model.WebPublish;


@Service
public class WebPublishService {
	@Autowired
	private WebPublishMapper mapper;
	@Autowired
	private WebContentFileMapper webContentFileMapper;
	@Autowired
	private FileOptService fileOptService;

	public List<WebPublish> getWebPublishList(Map<String,Object> params) throws Exception {
		List<WebPublish> list=mapper.getWebPublishList(params);
		for (WebPublish webPublish : list) {
			String content=webPublish.getContent();
			content=SRMStringUtil.xssEncodeReverse(content);
			webPublish.setContent(content.getBytes("utf-8"));
		}
		return list;
	}
	public void addWebPublish(Map<String,Object> params) {
		UserInfo uInfo = SessionUtil.getCurrentUser();
		params.put("creator", uInfo.getName());
		mapper.addWebPublish(params);
	}
	public void updateWebPublish(Map<String,Object> params) {
		params.put("update_dt",new Date());
		mapper.updateWebPublish(params);
	}
	public void deleteWebPublish(Map<String,Object> params) {
		List<WebContentFile> files=webContentFileMapper.getWebContentFileList(params);
		if (files.size()>0) {
			for (WebContentFile file : files) {
				fileOptService.deleteFileByName(file.getMogodb_id());
				webContentFileMapper.deleteWebContentFile(file);
			}
		}
		mapper.deleteWebPublish(params);
	}
	public String getHtml(Map<String, Object> params) throws Exception {
		String string="";
		List<WebPublish> list=getWebPublishList(params);
		if (list.size()>0) {
			string=list.get(0).getContent();
		}
		return string;
	}
}
