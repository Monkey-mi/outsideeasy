package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessAccount;


public interface AccessAccountMapper {
	public List<AccessAccount> getAccessAccountList(Map<String,Object> params);
	public void addAccessAccount(Map<String,Object> params);
	public void updateAccessAccount(Map<String,Object> params);
	public void deleteAccessAccount(Map<String,Object> params);
	public void deleteAccessAccountByRI(Map<String,Object> params);
}
