package manager.regAccount.data;

import java.util.List;
import java.util.Map;

import manager.regAccount.model.RegAccountResponse;

import common.user.model.RegAccout;

public interface MmgRegAccountMapper {
	public List<RegAccout> getRegAccoutList(Map<String,Object> params);
	public void addRegAccout(RegAccout obj);
	public void updateRegAccout(RegAccout obj);
	public void deleteRegAccout(RegAccout obj);
	public int getCountForAdd(Map<String, Object> map);
	public int getCountForUpdate(Map<String, Object> map);
	public int getCountXiaji(Map<String,Object> map);//查询出是否存在子账号
	public List<RegAccountResponse> getRegAccoutListbg(Map<String,Object> params);//后台查询出带公司名的账户信息
}
