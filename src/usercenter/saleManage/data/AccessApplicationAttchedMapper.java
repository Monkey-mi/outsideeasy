package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationAttched;


public interface AccessApplicationAttchedMapper {
	public List<AccessApplicationAttched> getAccessApplicationAttchedList(Map<String,Object> params);
	public void addAccessApplicationAttched(Map<String,Object> params);
	public void updateAccessApplicationAttched(Map<String,Object> params);
	public void updateAccessApplicationAttchedName(Map<String,Object> params);
	public void deleteAccessApplicationAttched(Map<String,Object> params);
	public void deleteAccessApplicationAttchedByRI(Map<String,Object> params);
	public List<AccessApplicationAttched> getAllAccessAttched(
			Map<String, Object> params);
	public void updateAccessApplicationAttchedMogoId(Map<String, Object> params);
}
