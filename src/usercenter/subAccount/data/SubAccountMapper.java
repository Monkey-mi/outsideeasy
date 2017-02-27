package usercenter.subAccount.data;

import java.util.List;
import java.util.Map;

import common.user.model.RegAccout;

import usercenter.subAccount.model.SubAccount;


public interface SubAccountMapper {
	public List<SubAccount> getSubAccountList(Map<String,Object> params);
	public List<SubAccount> getSubAccountListByReg_id(Map<String,Object> params);
	public Integer getSubAccountListByReg_id_count(Map<String,Object> params);
	public void addSubAccount(SubAccount obj);
	public void updateSubAccount(SubAccount obj);
	public void deleteSubAccount(Map<String,Object> params);
	int findSubAccountByorg_id(Map<String,Object> params);
	int findSubAccountByreg_id(Map<String,Object> params);
	public SubAccount getSubAccountBysa_id(Map<String,Object> params);
	int findSubAccountByName(Map<String,Object> params);
	
	/**
	 * 根据子账号名获取子账号信息
	*getSubAccountByName
	*@param params
	*@return
	*List<SubAccount>
	*@author mishengliang
	*2016-5-16下午3:29:58
	 */
	public List<SubAccount> getSubAccountByName(Map<String,Object> params);
	
	void updateResetPassword(Map<String,Object> params);
	public void updateSubAccoutPsw(SubAccount subAccount);
	
	/**
	 * 更新账户上次登录IP
	*updateLastIpAddress
	*@param params
	*void
	*@author mishengliang
	*2016-6-22下午6:55:50
	 */
	public void updateLastIpAddress(Map<String, Object> params);
	public int checkMobileExist(Map<String, Object> params);
}
