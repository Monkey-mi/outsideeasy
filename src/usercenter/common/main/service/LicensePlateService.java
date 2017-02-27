package usercenter.common.main.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.common.main.data.LicensePlateMapper;
import usercenter.common.main.model.LicensePlate;


@Service
public class LicensePlateService {
	@Autowired
	private LicensePlateMapper mapper;

	/**
	 * 查询车牌号的列表
	* @Description:
	* LicensePlateService
	* getLicensePlateList
	* @param params
	* @return List<LicensePlate>
	* @author chenlong
	* 2016-12-5 下午2:39:19
	 */
	public List<LicensePlate> getLicensePlateList(Map<String,Object> params) {
		return mapper.getLicensePlateList(params);
	}
	/**
	 * 查询下拉列表
	* @Description:
	* LicensePlateService
	* getLicensePlateList
	* @param params
	* @return List<LicensePlate>
	* @author chenlong
	* 2016-12-5 下午2:39:19
	 */
	public List<LicensePlate> getLicensePlateForSelect(Map<String,Object> params) {
		return mapper.getLicensePlateForSelect(params);
	}
	/**
	 * 添加新的车牌号
	* @Description:
	* LicensePlateService
	* addLicensePlate
	* @param params void
	* @author chenlong
	* 2016-12-5 下午2:40:17
	 */
	public boolean addLicensePlate(Map<String,Object> params) {
		boolean flag = regLicensePlate(params);
		if(flag){
			 params.put("enable", 0);
			 mapper.addLicensePlate(params);	
		}
		return flag;	   
	}
	/**
	 * 验证车牌号是否已存在
	* @Description:
	* LicensePlateService
	* regLicensePlate void
	* @author chenlong
	* 2016-12-5 下午2:44:47
	 */
	public boolean regLicensePlate(Map<String,Object> params){
		Integer count = mapper.regLicensePlate(params);
		if(count == null||count==0){//无
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 更新车牌的维护列表
	* @Description:
	* LicensePlateService
	* updateLicensePlate
	* @param params void
	* @author chenlong
	* 2016-12-6 下午4:27:54
	 */
	public boolean updateLicensePlate(Map<String,Object> params) {	
		boolean flag = regLicensePlate(params);
		if(flag){
			mapper.updateLicensePlate(params);	
		}
		return flag;			
	}
	
	public void deleteLicensePlate(LicensePlate[] arr) {
		for(LicensePlate obj: arr) {
			mapper.deleteLicensePlate(obj);
		}
	}
}
