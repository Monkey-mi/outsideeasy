package usercenter.saleManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessTempletHeadMapper;
import usercenter.saleManage.model.AccessTempletHead;


@Service
public class AccessTempletHeadService {
	@Autowired
	private AccessTempletHeadMapper mapper;


	public List<AccessTempletHead> getAccessTempletHeadList(Map<String,Object> params) {
		return mapper.getAccessTempletHeadList(params);
	}
	public void addAccessTempletHead(AccessTempletHead[] arr) {
		for(AccessTempletHead obj: arr) {
			mapper.addAccessTempletHead(obj);
		}
	}
	public void updateAccessTempletHead(AccessTempletHead[] arr) {
		for(AccessTempletHead obj: arr) {
			mapper.updateAccessTempletHead(obj);
		}
	}
	public void deleteAccessTempletHead(AccessTempletHead[] arr) {
		for(AccessTempletHead obj: arr) {
			mapper.deleteAccessTempletHead(obj);
		}
	}
	
	/**
	 * AccessTempletHeadService
	 * getHID
	 * @param owner void
	 * @author mishengliang
	 * 2016-10-28 上午11:33:33
	 */
	public Integer getHID(Integer owner){
		return mapper.getHID(owner);
	}
}
