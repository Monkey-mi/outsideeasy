package manager.ipmanager.data;

import java.util.List;
import java.util.Map;

import manager.ipmanager.ipResponse.AllAccount;
import manager.ipmanager.model.IpAddress;


public interface IpAddressMapper {
	public List<IpAddress> getIpAddressList(Map<String,Object> params);
	public void addIpAddress(IpAddress obj);
	public void updateIpAddress(IpAddress obj);
	public void updateStateIpAddress(Map<String,Object> params);
	public List<AllAccount> getRegAccount(Map<String,Object> params);
	public List<AllAccount> getSubAccount(Map<String,Object> params);
}
