package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.AuthcationInfo;


public interface AuthcationInfoMapper {
	public List<AuthcationInfo> getAuthcationInfoList(Map<String,Object> params);
	public void addAuthcationInfo(AuthcationInfo obj);
	public void updateAuthcationInfo(AuthcationInfo obj);
	public void deleteAuthcationInfo(AuthcationInfo obj);
}