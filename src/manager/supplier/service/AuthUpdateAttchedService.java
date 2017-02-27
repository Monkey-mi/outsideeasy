package manager.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.supplier.data.AuthUpdateAttchedMapper;
import manager.supplier.model.AuthUpdateAttched;


@Service
public class AuthUpdateAttchedService {
	@Autowired
	private AuthUpdateAttchedMapper mapper;


	public List<AuthUpdateAttched> getAuthUpdateAttchedList(Map<String,Object> params) {
		return mapper.getAuthUpdateAttchedList(params);
	}
	public void addAuthUpdateAttched(AuthUpdateAttched[] arr) {
		for(AuthUpdateAttched obj: arr) {
			mapper.addAuthUpdateAttched(obj);
		}
	}
	public void updateAuthUpdateAttched(AuthUpdateAttched[] arr) {
		for(AuthUpdateAttched obj: arr) {
			mapper.updateAuthUpdateAttched(obj);
		}
	}
	public void deleteAuthUpdateAttched(AuthUpdateAttched[] arr) {
		for(AuthUpdateAttched obj: arr) {
			mapper.deleteAuthUpdateAttched(obj);
		}
	}
}
