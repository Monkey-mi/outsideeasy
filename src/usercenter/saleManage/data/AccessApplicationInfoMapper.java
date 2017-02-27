package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationInfo;


public interface AccessApplicationInfoMapper {
	public List<AccessApplicationInfo> getAccessApplicationInfoList(Map<String,Object> params);
	public void addAccessApplicationInfo(Map<String,Object> params);
	public void updateAccessApplicationInfo(Map<String,Object> params);
	public void updateAccessApplicationInfoByInfoId(Map<String,Object> params);
	public void deleteAccessApplicationInfo(Map<String,Object> params);
	public Integer getEID(Map<String, Object> params);
	public void updateAccessApplicationInfoBySupplierId(
			Map<String, Object> params);
}
