package common.email.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.email.data.AppSendEmailinfoMapper;
import common.email.model.AppSendEmailinfo;


@Service
public class AppSendEmailinfoService {
	@Autowired
	private AppSendEmailinfoMapper mapper;

	/**
	 * 通过UUID查找发送的邮件信息
	*getAppSendEmailinfoList
	*@param params
	*@return
	*AppSendEmailinfo
	*@author mishengliang
	*2016-5-17上午11:00:01
	 */
	public AppSendEmailinfo getAppSendEmailinfoList(Map<String,Object> params) {
		return mapper.getAppSendEmailinfoList(params);
	}
	
	/**
	 * 添加邮件记录
	 *2016-3-11下午1:09:40
	 *addAppSendEmailinfo
	 *return:void
	 * mishengliang
	 */
	public void addAppSendEmailinfo(AppSendEmailinfo emailInfo) {
			mapper.addAppSendEmailinfo(emailInfo);
	}
	
	public void updateAppSendEmailinfo(AppSendEmailinfo[] arr) {
		for(AppSendEmailinfo obj: arr) {
			mapper.updateAppSendEmailinfo(obj);
		}
	}
	public void deleteAppSendEmailinfo(AppSendEmailinfo[] arr) {
		for(AppSendEmailinfo obj: arr) {
			mapper.deleteAppSendEmailinfo(obj);
		}
	}
	
	/**
	 * 更新验证邮件的有效性
	 *2016-3-17上午9:50:08
	 *updateEmailValid
	 *return:void
	 * mishengliang
	 */
	public void updateEmailValid(Map<String,Object> params){
		mapper.updateEmailValid(params);
	}
}
