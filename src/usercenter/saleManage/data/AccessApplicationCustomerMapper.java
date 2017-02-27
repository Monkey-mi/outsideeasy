package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationCustomer;


public interface AccessApplicationCustomerMapper {
	public List<AccessApplicationCustomer> getAccessApplicationCustomerList(Map<String,Object> params);
	public void addAccessApplicationCustomer(Map<String,Object> params);
	public void updateAccessApplicationCustomer(Map<String,Object> params);
	public void deleteAccessApplicationCustomer(Map<String,Object> params);
	public void deleteAccessApplicationCustomerByRI(Map<String,Object> params);
}
