package common.user.data;

import java.util.List;
import java.util.Map;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegSalt;
import common.user.model.TempCompany;



public interface RegAccoutMapper {
	public List<RegAccout> getRegAccoutList(Map<String,Object> params);
	public void addRegAccout(RegAccout obj);
	public void updateRegAccout(LoginAccount obj);
	public void updateRegAccoutById(LoginAccount obj);
	public void deleteRegAccout(RegAccout obj);
	
	/**
	 * 通过regId更新email_valid,reg_email
	*updateRegAccoutEamilValid
	*@param params
	*void
	*@author mishengliang
	*2016-5-17下午2:08:53
	 */
	public void updateRegAccoutEamilValid(Map<String,Object> params);

	/**
	 * 判断邮件是否已经注册，返回值>0代表其已注册
	 *2016-3-9上午10:33:40
	 *getUserEmailCount
	 *return:Integer
	 * mishengliang
	 */
	public Integer getUserEmailCount(Map<String,Object> params);
	
	/**
	 * 判断用户名是否被注册
	 *2016-3-9上午11:33:52
	 *getUserNameCount
	 *return:Integer
	 * mishengliang
	 */
	public Integer getUserNameCount(Map<String,Object> params);
	
	/**
	 * 根据账户名修改密码
	 *2016-3-14上午10:38:04
	 *updateRegAccoutPsw
	 *return:void
	 * mishengliang
	 */
	public void updateRegAccoutPsw(RegAccout regAccount);
	
	/**
	 * 根据账户名修改邮箱
	 *2016-3-16下午5:31:40
	 *updateRegAccoutEmail
	 *return:void
	 * mishengliang
	 */
	public void updateRegAccoutEmail(RegAccout regAccount);
	
	public void addCompany(TempCompany obj);
	
	/**
	 * 获取注册企业名，以判断是否企业是否注册过
	 *2016-3-9上午10:27:49
	 *getUserCompanyNameCount
	 *return:Integer
	 * mishengliang
	 */
	public Integer getUserCompanyNameCount(Map<String, Object> params);
	public void addSalt(RegSalt rs);
	public List<RegSalt> getRegSaltList(Map<String, Object> params);
	public void updateRegSalt(RegSalt rs);
	public void deleteRegSalt(String acc_name);
	
	/**
	 * 更新账号的最新登录IP地址
	*updateLastIpAddress
	*@param params
	*void
	*@author mishengliang
	*2016-6-22下午4:46:35
	 */
	public void updateLastIpAddress(Map<String, Object> params);
}
