package common.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.SessionUtil;

import common.user.data.RegAccoutCompanyInfoMapper;
import common.user.model.LoginAccount;
import common.user.model.RegAccoutCompanyInfo;
import common.user.response.RegAccountCompanyVo;

@Service
public class RegAccoutCompanyInfoService {
@Autowired
private RegAccoutCompanyInfoMapper mapper;


public List<RegAccoutCompanyInfo> getRegAccoutCompanyInfoList(Map<String,Object> params) {
	List<RegAccoutCompanyInfo> list  =  mapper.getRegAccoutCompanyInfoList(params);
	return list;
}
/**
* @Description: 返回主账号下的所有可用的公司
* RegAccoutCompanyInfoService
* getRegAccoutCompanyInfoOne
* @param params
* @return List<RegAccountCompanyVo>
* @author chenlong
* 2016-8-8 下午2:47:21
 */
public List<RegAccountCompanyVo> getRegAccoutCompanyInfoOne(Map<String,Object> params) {
	LoginAccount loginAccount = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
	params.put("reg_id", loginAccount.getLogin_id());//将账号id放入
	List<RegAccountCompanyVo> list  =  mapper.getRegAccoutCompanyInfoOne(params);
	return list;
}
/**
* @Description: 返回主账号下所有公司的条数
* RegAccoutCompanyInfoService
* getRegAccoutCompanyInfoCount
* @param params
* @return Integer
* @author chenlong
* 2016-8-8 下午2:48:10
 */
public Integer getRegAccoutCompanyInfoCount(Map<String,Object> params){
	LoginAccount loginAccount = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
	params.put("reg_id", loginAccount.getLogin_id());//将账号id放入
	return mapper.getRegAccoutCompanyInfoCount(params);
}

/**
* @Description:返回主账号下的所有可用供应商的id
* RegAccoutCompanyInfoService
* getRegAccoutCompanyListID
* @param params
* @return List<RegAccountCompanyVo>
* @author chenlong
* 2016-8-8 下午2:49:14
*/
public List<RegAccountCompanyVo> getRegAccoutCompanyListID(Map<String,Object> params) {
	LoginAccount loginAccount = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
	params.put("reg_id", loginAccount.getLogin_id());//将账号id放入	
	return mapper.getRegAccoutCompanyListID(params);
}

/**
 * @Description: 通过公司账号获取主账号ID
 * RegAccoutCompanyInfoService
 * getRegIdByCpId
 * @param companyId
 * @return Integer
 * @author mishengliang
 * 2016-10-28 下午1:22:52
 */
public Integer getRegIdByCpId(Integer companyId){
	return mapper.getRegIdByCpId(companyId);
}
}
