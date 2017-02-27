package usercenter.common.main.data;

import java.util.List;
import java.util.Map;

import usercenter.common.main.model.DriverMobilePhone;



public interface DriverMobilePhoneMapper {
	public List<DriverMobilePhone> getDriverMobilePhoneList(Map<String,Object> params);
	public void addDriverMobilePhone(Map<String,Object> params);
	public Integer regDriverMobilePhone(Map<String,Object> params);
	public Integer regDriverMobilePhone2(Map<String,Object> params);
	public void updateDriverMobilePhone(Map<String,Object> params);
	public void deleteDriverMobilePhone(DriverMobilePhone obj);
	public List<DriverMobilePhone> getDriverMobilePhoneForSelect(Map<String,Object> params);
}
