package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationMetarial;


public interface AccessApplicationMetarialMapper {
	public List<AccessApplicationMetarial> getAccessApplicationMetarialList(Map<String,Object> params);
	public void addAccessApplicationMetarial(Map<String,Object> params);
	public void updateAccessApplicationMetarial(Map<String,Object> params);
	public void deleteAccessApplicationMetarial(Map<String,Object> params);
	public void deleteAccessApplicationMetarialByRI(Map<String,Object> params);
}
