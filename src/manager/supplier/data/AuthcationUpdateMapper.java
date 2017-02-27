package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.AuthcationUpdate;


public interface AuthcationUpdateMapper {
	public List<AuthcationUpdate> getAuthcationUpdateList(Map<String,Object> params);
	public void addAuthcationUpdate(AuthcationUpdate obj);
	public void updateAuthcationUpdate(AuthcationUpdate obj);
	public void deleteAuthcationUpdate(AuthcationUpdate obj);
}
