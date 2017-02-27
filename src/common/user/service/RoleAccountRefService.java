/*
 * 平台角色用户关联
 * */
package common.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.data.RoleAccountRefMapper;
import common.user.model.RoleAccountRef;


@Service
public class RoleAccountRefService {
	@Autowired
	private RoleAccountRefMapper mapper;


	public List<RoleAccountRef> getRoleAccountRefList(Map<String,Object> params) {
		return mapper.getRoleAccountRefList(params);
	}
	public void addRoleAccountRef(RoleAccountRef obj) {
		mapper.addRoleAccountRef(obj);
		
	}
	public void updateRoleAccountRef(RoleAccountRef[] arr) {
		for(RoleAccountRef obj: arr) {
			mapper.updateRoleAccountRef(obj);
		}
	}
	public void deleteRoleAccountRef(RoleAccountRef obj) {
		mapper.deleteRoleAccountRef(obj);
		
	}
	
	public int getRoleAccountRefCount(Map<String,Object> params){
		return mapper.getRoleAccountRefCount(params);
	}
}
