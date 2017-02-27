package manager.templet.data;

import java.util.List;
import java.util.Map;

import manager.templet.model.MngAccessTempletHead;
import manager.templet.searchResponse.SearchCompany;


public interface MngAccessTempletHeadMapper {
	public List<MngAccessTempletHead> getMngAccessTempletHeadList(Map<String,Object> params);
	public void addMngAccessTempletHead(MngAccessTempletHead obj);
	public void updateMngAccessTempletHead(MngAccessTempletHead obj);
	public void deleteMngAccessTempletHead(MngAccessTempletHead obj);
	public Integer checkAdd(Map<String,Object> params);
	public  Integer checkUpdatebg(Map<String,Object> params);
	public List<SearchCompany> searchCompanyName(Map<String,Object> params);
	public List<MngAccessTempletHead> searchModelt(Map<String,Object> params);
}
