package common.email.data;

import java.util.Map;

import common.email.model.AppSendEmailinfo;


public interface AppSendEmailinfoMapper {
	public AppSendEmailinfo getAppSendEmailinfoList(Map<String,Object> params);
	public void addAppSendEmailinfo(AppSendEmailinfo obj);
	public void updateAppSendEmailinfo(AppSendEmailinfo obj);
	public void deleteAppSendEmailinfo(AppSendEmailinfo obj);
	
	/**
	 * 更新验证邮件的有效性
	 *2016-3-17上午10:07:17
	 *updateEmailValid
	 *return:void
	 * mishengliang
	 */
	public void updateEmailValid(Map<String,Object> params);
}
