package manager.ipmanager.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.ipmanager.data.IpAddressMapper;
import manager.ipmanager.ipResponse.AllAccount;
import manager.ipmanager.model.IpAddress;


@Service
public class IpAddressService {
	@Autowired
	private IpAddressMapper mapper;


	public List<IpAddress> getIpAddressList(Map<String,Object> params) {
		return mapper.getIpAddressList(params);
	}
	public void addIpAddress(IpAddress[] arr) {
		for(IpAddress obj: arr) {
			mapper.addIpAddress(obj);
		}
	}
	public void updateIpAddress(IpAddress[] arr) {
		for(IpAddress obj: arr) {
			mapper.updateIpAddress(obj);
		}
	}
	/**	
	 * @Description:  * 改变为失效状态
	 * @param IpAddress【】
	 * @return 
	 * @author chenlong
	 * @date 2016-6-28
	 */
	public String updateStateIpAddress(Map<String,Object> params) {	 
		    params.put("ip_state", -1);
			mapper.updateStateIpAddress(params);
			return "success";
	}
	/**	
	 * @Description:  发回子账号和主账号名称
	 * @param 
	 * @return List<AllAccount> 
	 * @author chenlong
	 * @date 2016-6-28
	 */
	public List<AllAccount> getAllAccount(Map<String,Object> params) {	 		 
		List<AllAccount> list1= mapper.getSubAccount(params);
		List<AllAccount> alllist = new ArrayList<AllAccount>();
		List<AllAccount> list2= mapper.getRegAccount(params);
		for(AllAccount lists : list2){
			 alllist.add(lists);
		}	
		for(AllAccount list : list1){	
			 alllist.add(list);
		}		
			return alllist;
	}
}
