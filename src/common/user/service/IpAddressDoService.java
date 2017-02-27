package common.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.data.IpAddressDoMapper;
import common.user.model.IpAddress;


@Service
public class IpAddressDoService {
	@Autowired
	private IpAddressDoMapper mapper;

	/**
	 * 获取账号下的IP地址
	 * 可能包含多个，且可能同时含有临时和常用
	*getIpAddressList
	*@param params
	*@return
	*List<IpAddress>
	*@author mishengliang
	*2016-6-22下午2:17:36
	 */
	public List<IpAddress> getIpAddressList(Map<String,Object> params) {
		return mapper.getIpAddressList(params);
	}
	
	/**
	 * 增加IP记录
	*addIpAddress
	*@param arr
	*void
	*@author mishengliang
	*2016-7-13下午1:43:48
	 */
	public void addIpAddress(IpAddress obj) {
			mapper.addIpAddress(obj);
	}
	
	public void updateIpAddress(IpAddress[] arr) {
		for(IpAddress obj: arr) {
			mapper.updateIpAddress(obj);
		}
	}
	public void deleteIpAddress(IpAddress[] arr) {
		for(IpAddress obj: arr) {
			mapper.deleteIpAddress(obj);
		}
	}
}
