package common.user.data;

import java.util.List;
import java.util.Map;

import common.user.model.RegAccoutCompanyInfo;
import common.user.response.RegAccountCompanyVo;


public interface RegAccoutCompanyInfoMapper {
	public List<RegAccoutCompanyInfo> getRegAccoutCompanyInfoList(Map<String,Object> params);
	public void addRegAccoutCompanyInfo(RegAccoutCompanyInfo obj);
	public void updateRegAccoutCompanyInfo(RegAccoutCompanyInfo obj);
	public void deleteRegAccoutCompanyInfo(RegAccoutCompanyInfo obj);
	public List<RegAccountCompanyVo> getRegAccoutCompanyInfoOne(Map<String,Object> params);//
	public Integer getRegAccoutCompanyInfoCount(Map<String,Object> params);
	public List<RegAccountCompanyVo> getRegAccoutCompanyListID(Map<String,Object> params);
	
	/**
	 * @Description: 通过公司账号获取主账号ID
	 * RegAccoutCompanyInfoMapper
	 * getRegIdByCpId
	 * @param companyId
	 * @return Integer
	 * @author mishengliang
	 * 2016-10-28 下午1:21:31
	 */
	public Integer getRegIdByCpId(Integer companyId);
	
}
