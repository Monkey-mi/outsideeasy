package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.MainCustomer;


public interface MainCustomerMapper {
	public List<MainCustomer> getMainCustomerList(Map<String,Object> params);
	public void addMainCustomer(MainCustomer obj);
	public void updateMainCustomer(MainCustomer obj);
	public void deleteMainCustomer(MainCustomer obj);
}
