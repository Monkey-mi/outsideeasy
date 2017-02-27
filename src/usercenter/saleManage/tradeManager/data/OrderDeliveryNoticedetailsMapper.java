package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderDeliveryNoticedetails;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVo;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVoInfo;


public interface OrderDeliveryNoticedetailsMapper {
	public List<OrderDeliveryVo> getOrderDeliveryNoticedetailsList(Map<String,Object> params);
	public void addOrderDeliveryNoticedetails(OrderDeliveryNoticedetails obj);
	public void updateOrderDeliveryNoticedetails(OrderDeliveryNoticedetails obj);
	public void deleteOrderDeliveryNoticedetails(OrderDeliveryNoticedetails obj);
	public List<OrderDeliveryVoInfo> getOrderDeliveryNoticedetailsListInfo(Map<String,Object> params);
	public Integer getOrderDeliveryNoticedetailsListCount(Map<String,Object> params);
	public List<OrderDeliveryVo> getOrderDeliveryNoticedetailsListAll(Map<String,Object> params);
	
 	/**
	 * @Description: 更新送货通知表 确认时间
	 * OrderDeliveryNoticedetailsMapper
	 * updateNoticeDetailsConfirmTime
	 * @param params void
	 * @author mishengliang
	 * 2016-8-31 上午11:40:15
	 */
	public void updateNoticeDetailsConfirmTime(Map<String, Object> params);	
	
	/**
	 * @Description: 批量修改确认时间
	 * OrderDeliveryNoticedetailsMapper
	 * updateConfirmDate
	 * @param params void
	 * @author mishengliang
	 * 2016-9-6 下午6:38:39
	 */
	public void updateConfirmDate(Map<String, Object> params);	
}
