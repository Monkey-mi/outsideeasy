package common.sysmodule.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import common.sysmodule.data.WsIdentityMapper;
import common.sysmodule.model.WsIdentity;


@Service
public class WsIdentityService {
	@Autowired
	private WsIdentityMapper mapper;


	public List<WsIdentity> getWsIdentityList(Map<String,Object> params) {
		return mapper.getWsIdentityList(params);
	}
	public void addWsIdentity(WsIdentity[] arr) {
		for(WsIdentity obj: arr) {
			mapper.addWsIdentity(obj);
		}
	}
	@CacheEvict(value="users", allEntries=true)
	public void updateWsIdentity(WsIdentity[] arr) {
		for(WsIdentity obj: arr) {
			mapper.updateWsIdentity(obj);
		}
	}
	@CacheEvict(value="users", allEntries=true)
	public void deleteWsIdentity(WsIdentity[] arr) {
		for(WsIdentity obj: arr) {
			mapper.deleteWsIdentity(obj);
		}
	}
	@Cacheable(value = "wsCache", key = "#identify")
	public List<WsIdentity> getEnabledIdentity(String identify) {
		return mapper.getEnabledIdentity(identify);
	}
}
