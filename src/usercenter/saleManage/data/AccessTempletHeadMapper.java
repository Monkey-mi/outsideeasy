package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessTempletHead;


public interface AccessTempletHeadMapper {
	public List<AccessTempletHead> getAccessTempletHeadList(Map<String,Object> params);
	public void addAccessTempletHead(AccessTempletHead obj);
	public void updateAccessTempletHead(AccessTempletHead obj);
	public void deleteAccessTempletHead(AccessTempletHead obj);
	
	public Integer getHID(Integer owner);
}
