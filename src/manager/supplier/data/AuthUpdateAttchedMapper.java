package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.AuthUpdateAttched;


public interface AuthUpdateAttchedMapper {
	public List<AuthUpdateAttched> getAuthUpdateAttchedList(Map<String,Object> params);
	public void addAuthUpdateAttched(AuthUpdateAttched obj);
	public void updateAuthUpdateAttched(AuthUpdateAttched obj);
	public void deleteAuthUpdateAttched(AuthUpdateAttched obj);
}
