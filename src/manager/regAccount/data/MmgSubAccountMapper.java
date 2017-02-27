package manager.regAccount.data;

import java.util.List;
import java.util.Map;

import usercenter.subAccount.model.SubAccount;

public interface MmgSubAccountMapper {
	public List<SubAccount> getSubAccountList(Map<String,Object> params);
	public void addSubAccount(SubAccount obj);
	public void updateSubAccount(SubAccount obj);
	public void deleteSubAccount(Map<String,Object> params);
	public void deleteSubAccountbg(SubAccount params);
	int findSubAccountByorg_id(Map<String,Object> params);
	public SubAccount getSubAccountBysa_id(Map<String,Object> params);
	int getXiajiCount(Map<String,Object> params);
	int getCountForAdd(Map<String,Object> params);
	int getCountForUpdate(Map<String,Object> params);
}
