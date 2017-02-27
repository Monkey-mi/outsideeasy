package usercenter.common.main.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.common.main.data.DriverMobilePhoneMapper;
import usercenter.common.main.model.DriverMobilePhone;



@Service
public class DriverMobilePhoneService {
	@Autowired
	private DriverMobilePhoneMapper mapper;

	/**
	 * 查询司机手机号的列表
	* @Description:
	* DriverMobilePhoneService
	* getDriverMobilePhoneList
	* @param params
	* @return List<DriverMobilePhone>
	* @author chenlong
	* 2016-12-5 下午2:38:43
	 */
	public List<DriverMobilePhone> getDriverMobilePhoneList(Map<String,Object> params) {
		return mapper.getDriverMobilePhoneList(params);
	}
	/**
	 * 查询可用手机号列表
	* @Description:
	* DriverMobilePhoneService
	* getDriverMobilePhoneForSelect
	* @param params
	* @return List<DriverMobilePhone>
	* @author chenlong
	* 2016-12-19 下午1:48:34
	 */
	public List<DriverMobilePhone> getDriverMobilePhoneForSelect(Map<String,Object> params) {
		params.put("enable", 0);
		return mapper.getDriverMobilePhoneForSelect(params);
	}
	/**
	 * 增加一个司机、手机号信息
	* @Description:
	* DriverMobilePhoneService
	* addDriverMobilePhone
	* @param params void
	* @author chenlong
	* 2016-12-5 下午2:38:01
	 */
	public boolean addDriverMobilePhone(Map<String,Object> params) {
		boolean flag = regDriverMobilePhone(params);
		if(flag){
			 params.put("enable", 0);		
			 mapper.addDriverMobilePhone(params);
		}
		return flag;
	}
	/**
	 * 验证添加的是否重复
	* @Description:
	* DriverMobilePhoneService
	* regDriverMobilePhone
	* @param params
	* @return boolean
	* @author chenlong
	* 2016-12-5 下午3:07:53
	 */
	public boolean regDriverMobilePhone(Map<String,Object> params){
		Integer count = mapper.regDriverMobilePhone(params);
		if(count == null||count==0){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 更新司机手机号，是否禁用
	* @Description:
	* DriverMobilePhoneService
	* updateDriverMobilePhone
	* @param params void
	* @author chenlong
	* 2016-12-6 下午5:34:19
	 */
	public boolean updateDriverMobilePhone(Map<String,Object> params) {
		boolean flag = regDriverMobilePhone(params);		
		if(flag){
			Integer count = mapper.regDriverMobilePhone2(params);
			if(count == null||count==0){
				flag = true;
				mapper.updateDriverMobilePhone(params);
			}else{
				flag = false;				 
			}				
		}
		return flag;			
	}
	public void deleteDriverMobilePhone(DriverMobilePhone[] arr) {
		for(DriverMobilePhone obj: arr) {
			mapper.deleteDriverMobilePhone(obj);
		}
	}
}
