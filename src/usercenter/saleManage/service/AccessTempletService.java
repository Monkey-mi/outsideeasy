package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessTempletElementMapper;
import usercenter.saleManage.data.AccessTempletMapper;
import usercenter.saleManage.model.AccessTemplet;
import util.WebUtil;

@Service
public class AccessTempletService {
	@Autowired
	private AccessTempletMapper mapper;
	@Autowired
	private AccessTempletElementMapper aMapper;
	
	public List<AccessTemplet> getAccessTempletList(Map<String, Object>params){
		List<AccessTemplet> accessTemplets=mapper.getAccessTempletList(params);
		Map<String,Object> params1 = new HashMap<String, Object>();
		for (AccessTemplet accessTemplet : accessTemplets) {
			params1.put("templet_id", accessTemplet.getTemplet_id());
			accessTemplet.setElements(aMapper.getAccessTempletElementList(params1));
		}
		return accessTemplets;
	}
}
