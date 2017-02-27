package common.user.data;

import java.util.List;
import java.util.Map;

import common.user.model.RoleAccountRef;


public interface RoleAccountRefMapper {
	public List<RoleAccountRef> getRoleAccountRefList(Map<String,Object> params);
	public void addRoleAccountRef(RoleAccountRef obj);
	public void updateRoleAccountRef(RoleAccountRef obj);
	public void deleteRoleAccountRef(RoleAccountRef obj);
	
	public int getRoleAccountRefCount(Map<String,Object> params);
}
