package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.CheckfactoryInform;


public interface CheckfactoryInformMapper {
	public List<CheckfactoryInform> getCheckfactoryInformList(Map<String,Object> params);
	public void addCheckfactoryInform(CheckfactoryInform obj);
	public void updateCheckfactoryInform(CheckfactoryInform obj);
	public void deleteCheckfactoryInform(CheckfactoryInform obj);
	public List<CheckfactoryInform> getAllCheckfactoryInformList(Map<String,Object> params);
	public void confirmCheckfactoryInform(Map<String, Object> params);
	public int getCountForToBeConfirmed(Map<String, Object> params);
}
