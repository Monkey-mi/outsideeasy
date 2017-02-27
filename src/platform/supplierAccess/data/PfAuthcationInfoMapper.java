package platform.supplierAccess.data;

import java.util.List;
import java.util.Map;

import platform.supplierAccess.model.PfAuthcationInfo;


public interface PfAuthcationInfoMapper {
	public List<PfAuthcationInfo> getPfAuthcationInfoList(Map<String,Object> params);
	public void addPfAuthcationInfo(PfAuthcationInfo obj);
	public void updatePfAuthcationInfo(PfAuthcationInfo obj);
	public void deletePfAuthcationInfo(PfAuthcationInfo obj);
	
	/**
	 * 根据公司ID查询指定状态下最近的一条历史记录信息
	*getPfAuthcationInfoByCompanyId
	*@param params
	*@return
	*PfAuthcationInfo
	*@author mishengliang
	*2016-5-20上午9:51:17
	 */
	public PfAuthcationInfo getPfAuthcationInfoByCompanyId(Map<String,Object> params); 
}
