package common.user.data;

import java.util.List;
import java.util.Map;

import common.user.model.IpAddress;


public interface IpAddressDoMapper {
	/**
	 * 获取账号下的IP地址
	 * 可能包含多个，且可能同时含有临时和常用
	*getIpAddressList
	*@param params
	*@return
	*List<IpAddress>
	*@author mishengliang
	*2016-6-22下午2:20:25
	 */
	public List<IpAddress> getIpAddressList(Map<String,Object> params);
	
	public void addIpAddress(IpAddress obj);
	public void updateIpAddress(IpAddress obj);
	public void deleteIpAddress(IpAddress obj);
}
