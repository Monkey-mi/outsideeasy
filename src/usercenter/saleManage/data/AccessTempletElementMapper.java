package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessTempletElement;


public interface AccessTempletElementMapper {
	public List<AccessTempletElement> getAccessTempletElementList(Map<String,Object> params);
	public void addAccessTempletElement(AccessTempletElement obj);
	public void updateAccessTempletElement(AccessTempletElement obj);
	public void deleteAccessTempletElement(AccessTempletElement obj);
}
