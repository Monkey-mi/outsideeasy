package usercenter.saleManage.tradeManager.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.OrderRequirementMapper;
import usercenter.saleManage.tradeManager.model.OrderRequirement;


@Service
public class OrderRequirementService {
	@Autowired
	private OrderRequirementMapper mapper;

   /**
    * 
    * 得到采购要求
   * @Description:
   * OrderRequirementService
   * getOrderRequirement
   * @param params
   * @return OrderRequirement
   * @author chenlong
   * 2017-1-20 下午5:01:52
    */
	public OrderRequirement getOrderRequirement(Map<String,Object> params) {
		OrderRequirement orderRequirement =  mapper.getOrderRequirement(params);
		return orderRequirement;
	}
	
}
