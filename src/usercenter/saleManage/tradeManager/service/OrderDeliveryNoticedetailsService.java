package usercenter.saleManage.tradeManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.OrderDeliveryNoticedetailsMapper;
import usercenter.saleManage.tradeManager.model.OrderDeliveryNoticedetails;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVo;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVoInfo;


@Service
public class OrderDeliveryNoticedetailsService {
	@Autowired
	private OrderDeliveryNoticedetailsMapper mapper;

	/**
	 * 详情送货通知明细 1~10
	* @Description:
	* OrderDeliveryNoticedetailsService
	* getOrderDeliveryNoticedetailsList
	* @param params
	* @return List<OrderDeliveryVo>
	* @author chenlong
	* 2016-8-25 下午12:11:14
	 */
	public List<OrderDeliveryVo> getOrderDeliveryNoticedetailsList(Map<String,Object> params) {
		return mapper.getOrderDeliveryNoticedetailsList(params);
	}
	/**
	 * 详情送货通知明细数量
	* @Description:
	* OrderDeliveryNoticedetailsService
	* getOrderDeliveryNoticedetailsListCount
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-8-30 下午4:25:58
	 */
	public Integer getOrderDeliveryNoticedetailsListCount(Map<String,Object> params) {
		return mapper.getOrderDeliveryNoticedetailsListCount(params);
	}
	/**
	 * 详情送货通知明细 all
	* @Description:
	* OrderDeliveryNoticedetailsService
	* getOrderDeliveryNoticedetailsList
	* @param params
	* @return List<OrderDeliveryVo>
	* @author chenlong
	* 2016-8-25 下午12:11:14
	 */
	public List<OrderDeliveryVo> getOrderDeliveryNoticedetailsListAll(Map<String,Object> params) {
		return mapper.getOrderDeliveryNoticedetailsListAll(params);
	}
	/**
	 * 送货通知的明细
	* @Description:
	* OrderDeliveryNoticedetailsService
	* getOrderDeliveryNoticedetailsListInfo
	* @param params
	* @return List<OrderDeliveryVoInfo>
	* @author chenlong
	* 2016-8-26 下午6:12:21
	 */
	public List<OrderDeliveryVoInfo> getOrderDeliveryNoticedetailsListInfo(Map<String,Object> params) {
		return mapper.getOrderDeliveryNoticedetailsListInfo(params);
	}
	
	public void addOrderDeliveryNoticedetails(OrderDeliveryNoticedetails[] arr) {
		for(OrderDeliveryNoticedetails obj: arr) {
			mapper.addOrderDeliveryNoticedetails(obj);
		}
	}
	public void updateOrderDeliveryNoticedetails(OrderDeliveryNoticedetails[] arr) {
		for(OrderDeliveryNoticedetails obj: arr) {
			mapper.updateOrderDeliveryNoticedetails(obj);
		}
	}
	public void deleteOrderDeliveryNoticedetails(OrderDeliveryNoticedetails[] arr) {
		for(OrderDeliveryNoticedetails obj: arr) {
			mapper.deleteOrderDeliveryNoticedetails(obj);
		}
	}
	
	/**
	 * @Description: 更新送货通知表确认时间
	 * OrderDeliveryNoticedetailsService
	 * updateNoticeDetailsConfirmTime
	 * @param params void
	 * @author mishengliang
	 * 2016-8-31 上午11:40:26
	 */
	public void updateNoticeDetailsConfirmTime(Map<String, Object> params){
		mapper.updateNoticeDetailsConfirmTime(params);
	}
	
	/**
	 * @Description: 批量修改确认时间
	 * OrderDeliveryNoticedetailsService
	 * updateConfirmDate
	 * @param params void
	 * @author mishengliang
	 * 2016-9-6 下午6:37:44
	 */
	public void updateConfirmDate(Map<String, Object> params){
		mapper.updateConfirmDate(params);
	}
}
