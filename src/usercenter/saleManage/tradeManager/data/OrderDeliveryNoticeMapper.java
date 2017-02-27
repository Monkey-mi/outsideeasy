package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderDeliveryNotice;


public interface OrderDeliveryNoticeMapper {
	public List<OrderDeliveryNotice> getOrderDeliveryNoticeList(Map<String,Object> params);
	public void addOrderDeliveryNotice(OrderDeliveryNotice obj);
	public void updateOrderDeliveryNotice(OrderDeliveryNotice obj);
	public void deleteOrderDeliveryNotice(OrderDeliveryNotice obj);
	public Integer getOrderDeliveryNoticeListCount(Map<String,Object> params);
	public Integer getOrderDeliveryNoticeListInfoCount(Map<String,Object> params);
	public List<OrderDeliveryNotice> getOrderDeliveryNoticeListInfo(Map<String,Object> params);
	public OrderDeliveryNotice getOrderDeliveryNoticeListForAccept(Map<String,Object> params);
	/**
	 * @Description: 在修改前将为空的确认日期 改为 通知日期
	 * OrderDeliveryNoticeMapper
	 * updateNullConfirmDate
	 * @param params void
	 * @author mishengliang
	 * 2016-9-7 下午6:01:33
	 */
	public void updateNullConfirmDate(Map<String, Object> params);
	
	/**
	 * @Description:  更新送货通知状态
	 * OrderDeliveryNoticeMapper
	 * updateDeliveryStatue
	 * @param params void
	 * @author mishengliang
	 * 2016-8-31 上午11:27:33
	 */
	public void updateDeliveryStatue(Map<String, Object> params);
	public List<OrderDeliveryNotice> getLastThreeOrderDeliveryNotice(Map<String, Object> params);
	public int getToBeConfirmedDeliveryNoticeCount(Map<String, Object> params);
	public Integer getDeliveryStatu(Map<String, Object> params);
	public Map<String, Object> getDeliveryUdt(Map<String, Object> params);
}
