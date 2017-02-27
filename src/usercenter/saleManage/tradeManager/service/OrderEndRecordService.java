package usercenter.saleManage.tradeManager.service;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.OrderEndRecordMapper;
import usercenter.saleManage.tradeManager.model.OrderEndRecord;


@Service
public class OrderEndRecordService {
	@Autowired
	private OrderEndRecordMapper mapper;

	/**
	 * 查询出终止的原因
	* @Description:
	* OrderEndRecordService
	* getOrderEndRecordList
	* @param params
	* @return List<OrderEndRecord>
	* @author chenlong
	* 2016-8-23 下午4:33:02
	 */
	public OrderEndRecord getOrderEndRecord(Map<String,Object> params) {
		return mapper.getOrderEndRecordById(params);
	}
	/**
	 * 外协查询出终止的原因
	* @Description:
	* OrderEndRecordService
	* getOrderEndRecordList
	* @param params
	* @return List<OrderEndRecord>
	* @author chenlong
	* 2016-8-23 下午4:33:02
	 */
	public OrderEndRecord getOrderEndRecordByIdForOut(Map<String,Object> params) {
		return mapper.getOrderEndRecordByIdForOut(params);
	}	
	/**
	 * 添加中止的信息
	* @Description:
	* OrderEndRecordService
	* addOrderEndRecord
	* @param params void
	* @author chenlong
	* 2016-9-1 上午9:01:19
	 */
	public void addOrderEndRecord(Map<String,Object> params) {	
			mapper.addOrderEndRecord(params);
	}
	/**
	 * 更新终止记录的状态值为1
	* @Description:
	* OrderEndRecordService
	* updateOrderEndRecord
	* @param params void
	* @author chenlong
	* 2016-8-26 下午2:32:37
	 */
	public void updateOrderEndRecord(Map<String,Object> params) {	
		    params.put("end_status", 1);
		    params.put("confirm_dt",new Date());
			mapper.updateOrderEndRecord(params);		
	}
	/**
	 * 更新终止申请为不可用
	* @Description:
	* OrderEndRecordService
	* updateOrderEndRecordStop
	* @param params void
	* @author chenlong
	* 2016-9-1 上午11:01:59
	 */
	public void updateOrderEndRecordStop(Map<String,Object> params) {
		params.put("end_status", 2);//2为取消
		mapper.updateOrderEndRecordStop(params);		
}
	public void deleteOrderEndRecord(OrderEndRecord[] arr) {
		for(OrderEndRecord obj: arr) {
			mapper.deleteOrderEndRecord(obj);
		}
	}
}
