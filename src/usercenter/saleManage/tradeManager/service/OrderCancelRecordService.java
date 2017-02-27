package usercenter.saleManage.tradeManager.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.OrderCancelRecordMapper;
import usercenter.saleManage.tradeManager.model.OrderCancelRecord;


@Service
public class OrderCancelRecordService {
	@Autowired
	private OrderCancelRecordMapper mapper;

	/**
	 * 查询出取消的原因
	* @Description:
	* OrderCancelRecordService
	* getOrderCancelRecordList
	* @param params
	* @return List<OrderCancelRecord>
	* @author chenlong
	* 2016-8-23 下午4:33:43
	 */
	public OrderCancelRecord getOrderCancelRecord(Map<String,Object> params) {
		return mapper.getOrderCancelRecordById(params);
	}
	/**
	 * 增加一条取消信息
	* @Description:
	* OrderCancelRecordService
	* addOrderCancelRecord
	* @param params void
	* @author chenlong
	* 2016-8-29 下午4:14:57
	 */
	public void addOrderCancelRecord(Map<String,Object> params) {
			mapper.addOrderCancelRecord(params);		
	}
	public void updateOrderCancelRecord(OrderCancelRecord[] arr) {
		for(OrderCancelRecord obj: arr) {
			mapper.updateOrderCancelRecord(obj);
		}
	}
	public void deleteOrderCancelRecord(OrderCancelRecord[] arr) {
		for(OrderCancelRecord obj: arr) {
			mapper.deleteOrderCancelRecord(obj);
		}
	}
}
