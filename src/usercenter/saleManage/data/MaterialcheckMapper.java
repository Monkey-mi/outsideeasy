package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.Materialcheck;


public interface MaterialcheckMapper {
	public List<Materialcheck> getMaterialcheckList(Map<String,Object> params);
	public List<Materialcheck> getAllMaterialcheckList(Map<String,Object> params);
	public void addMaterialcheck(Materialcheck obj);
	public void updateMaterialcheck(Materialcheck obj);
	public void deleteMaterialcheck(Materialcheck obj);
	public List<Materialcheck> getLastThreeMaterialCheck(
			Map<String, Object> params);
	public int hasMaterialCheck(Map<String, Object> params);
}
