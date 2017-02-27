package platform.supplierAccess.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.supplierAccess.data.PfAuthcationInfoMapper;
import platform.supplierAccess.model.PfAuthcationInfo;


@Service
public class PfAuthcationInfoService {
	@Autowired
	private PfAuthcationInfoMapper mapper;


	public List<PfAuthcationInfo> getPfAuthcationInfoList(Map<String,Object> params) {
		return mapper.getPfAuthcationInfoList(params);
	}
	public void addPfAuthcationInfo(PfAuthcationInfo obj) {
			mapper.addPfAuthcationInfo(obj);
	}
	public void addPfAuthcationInfo(PfAuthcationInfo[] arr) {
		for(PfAuthcationInfo obj: arr) {
			mapper.addPfAuthcationInfo(obj);
		}
	}
	public void updatePfAuthcationInfo(PfAuthcationInfo[] arr) {
		for(PfAuthcationInfo obj: arr) {
			mapper.updatePfAuthcationInfo(obj);
		}
	}
	public void deletePfAuthcationInfo(PfAuthcationInfo[] arr) {
		for(PfAuthcationInfo obj: arr) {
			mapper.deletePfAuthcationInfo(obj);
		}
	}
	
	/**
	 * 根据公司ID查询指定状态下最近的一条历史记录信息
	*getPfAuthcationInfoByCompanyId
	*@param params
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-20上午10:07:48
	 */
	public PfAuthcationInfo getPfAuthcationInfoByCompanyId(Map<String,Object> params){
		return mapper.getPfAuthcationInfoByCompanyId(params);
	}
}
