package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationCompetitor;


public interface AccessApplicationCompetitorMapper {
	public List<AccessApplicationCompetitor> getAccessApplicationCompetitorList(Map<String,Object> params);
	public void addAccessApplicationCompetitor(Map<String,Object> params);
	public void updateAccessApplicationCompetitor(Map<String,Object> params);
	public void deleteAccessApplicationCompetitor(Map<String,Object> params);
	public void deleteAccessApplicationCompetitorByRI(Map<String,Object> params);
}
