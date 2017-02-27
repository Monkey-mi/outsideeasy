package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.MainCustomerMapper;
import manager.supplier.model.Goods;
import manager.supplier.model.MainCustomer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessApplicationCustomerMapper;
import usercenter.saleManage.model.AccessApplicationCustomer;
import util.BeanUtil;



@Service
public class MainCustomerService {
	@Autowired
	private MainCustomerMapper mapper;
	@Autowired
	private AccessApplicationCustomerMapper accMapper;

	public List<MainCustomer> getMainCustomerList(Map<String,Object> params) {
		return mapper.getMainCustomerList(params);
	}
	public List<AccessApplicationCustomer> getAccMainCustomerList(Map<String,Object> params) {
		return accMapper.getAccessApplicationCustomerList(params);
	}
	@Transactional
	public void addMainCustomer(MainCustomer[] arr) {
		for(MainCustomer obj: arr) {
			mapper.addMainCustomer(obj);
		}
	}
	@Transactional
	public void updateMainCustomer(MainCustomer[] arr) {
		for(MainCustomer obj: arr) {
			mapper.updateMainCustomer(obj);
		}
	}
	@Transactional
	public void deleteMainCustomer(MainCustomer[] arr) {
		for(MainCustomer obj: arr) {
			mapper.deleteMainCustomer(obj);
		}
	}
	public void addAccMainCustomer(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			MainCustomer item=(MainCustomer)BeanUtil.mapToObject(params,MainCustomer.class);
			item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addMainCustomer(item);
			params.put("AppCustomerId", item.getCustomer_id());
		}
		params.put("customerName",params.get("customer_name"));
		accMapper.addAccessApplicationCustomer(params);
	}
	public void updateAccMainCustomer(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			MainCustomer item=(MainCustomer)BeanUtil.mapToObject(params,MainCustomer.class);
			item.setCustomer_id(Integer.parseInt(params.get("app_customer_id").toString()));
			mapper.updateMainCustomer(item);
		}
		params.put("customerId",params.get("customer_id"));
		params.put("customerName",params.get("customer_name"));
		accMapper.updateAccessApplicationCustomer(params);
	}
}
