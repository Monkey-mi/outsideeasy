package manager.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.supplier.data.AuthcationInfoMapper;
import manager.supplier.model.AuthcationInfo;


@Service
public class AuthcationInfoService {
	@Autowired
	private AuthcationInfoMapper mapper;


	public List<AuthcationInfo> getAuthcationInfoList(Map<String,Object> params) {
		return mapper.getAuthcationInfoList(params);
	}
	public void addAuthcationInfo(AuthcationInfo[] arr) {
		for(AuthcationInfo obj: arr) {
			mapper.addAuthcationInfo(obj);
		}
	}
	public void updateAuthcationInfo(AuthcationInfo[] arr) {
		for(AuthcationInfo obj: arr) {
			mapper.updateAuthcationInfo(obj);
		}
	}
	public void deleteAuthcationInfo(AuthcationInfo[] arr) {
		for(AuthcationInfo obj: arr) {
			mapper.deleteAuthcationInfo(obj);
		}
	}
}
