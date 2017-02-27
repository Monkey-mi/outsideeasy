package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessTemplet;


public interface AccessTempletMapper {
	public List<AccessTemplet> getAccessTempletList(Map<String,Object> params);
}
