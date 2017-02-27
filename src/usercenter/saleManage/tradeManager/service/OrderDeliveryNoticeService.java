package usercenter.saleManage.tradeManager.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.OrderDeliveryNoticeMapper;
import usercenter.saleManage.tradeManager.model.OrderDeliveryNotice;
import usercenter.saleManage.tradeManager.response.OrderDeleveryNoticeVo;
import usercenter.saleManage.tradeManager.response.OrderDeliverNoticeVr;
import usercenter.saleManage.tradeManager.response.OrderDeliveryNoticeInfo;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVo;
import usercenter.saleManage.tradeManager.response.OrderDeliveryVoInfo;
import util.Const;


@Service
public class OrderDeliveryNoticeService {
	@Autowired
	private OrderDeliveryNoticeMapper mapper;
	@Autowired
	private OrderDeliveryNoticedetailsService orderDeliveryNoticedetailsService;

	/**
	* 查询出送货通知
	* @Description:
	* OrderDeliveryNoticeService
	* getOrderDeliveryNoticeList
	* @param params
	* @return List<OrderDeliveryNotice>
	* @author chenlong
	* 2016-8-25 上午11:15:41
	 */
	public List<OrderDeleveryNoticeVo> getOrderDeliveryNoticeList(Map<String,Object> params) {
		 params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		 List<OrderDeleveryNoticeVo>  list =  new ArrayList<OrderDeleveryNoticeVo>();	 
		 List<OrderDeliveryNotice>  list1 = mapper.getOrderDeliveryNoticeList(params);//送货通知
		 Map<String,Object> map = new HashMap<String, Object>();
		 map.put("pur_order_id", params.get("pur_order_id"));
		 for(OrderDeliveryNotice orderDeliveryNotice : list1){
			 OrderDeleveryNoticeVo orderDeleveryNoticeVo =  new OrderDeleveryNoticeVo();		
			 map.put("delivery_notice_id", orderDeliveryNotice.getDelivery_notice_id());
			 List<OrderDeliveryVo> orderDeliveryVos = orderDeliveryNoticedetailsService.getOrderDeliveryNoticedetailsList(map);//送货通知明细
			 Integer count = orderDeliveryNoticedetailsService.getOrderDeliveryNoticedetailsListCount(map);
			 orderDeleveryNoticeVo.setOrderDeliveryNotice(orderDeliveryNotice);//赋值
			 orderDeleveryNoticeVo.setOrderDeliveryVos(orderDeliveryVos);//赋值
			 orderDeleveryNoticeVo.setCount(count);//orderDeleveryNoticeVo
			 list.add(orderDeleveryNoticeVo);//赋值
		 }
		 return list;
	}
	/**
	 * 为接收订单查询通知是否确认
	* @Description:
	* OrderDeliveryNoticeService
	* getOrderDeliveryNoticeListForAccept
	* @param params
	* @return OrderDeliveryNotice
	* @author chenlong
	* 2016-9-20 下午6:14:06
	 */
	public OrderDeliveryNotice getOrderDeliveryNoticeListForAccept(Map<String,Object> params) {		 
		 OrderDeliveryNotice  orderDeliveryNotice = mapper.getOrderDeliveryNoticeListForAccept(params);//送货通知		 
		 return orderDeliveryNotice;
	}
	/**
	* 详情查询出送货通知数量
	* @Description:
	* OrderDeliveryNoticeService
	* getOrderDeliveryNoticeList
	* @param params
	* @return List<OrderDeliveryNotice>
	* @author chenlong
	* 2016-8-25 上午11:15:41
	 */
	public Integer getOrderDeliveryNoticeListCount(Map<String,Object> params) {		 
		 Integer count = mapper.getOrderDeliveryNoticeListCount(params);
		 return count;		
	}
	
	/**
	* 查询出送货通知
	* @Description:
	* OrderDeliveryNoticeService
	* getOrderDeliveryNoticeList
	* @param params
	* @return List<OrderDeliveryNotice>
	* @author chenlong
	* 2016-8-25 上午11:15:41
	 */
	public List<OrderDeliveryNoticeInfo> getOrderDeliveryNoticeListInfo(Map<String,Object> params) {
		 params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		 List<OrderDeliveryNoticeInfo>  list =  new ArrayList<OrderDeliveryNoticeInfo>();
		 List<OrderDeliveryNotice>  listForNotice = mapper.getOrderDeliveryNoticeListInfo(params);//送货通知
		 for(OrderDeliveryNotice orderDeliveryNotice : listForNotice){
			 OrderDeliveryNoticeInfo orderDeleveryNoticeVo =  new OrderDeliveryNoticeInfo();
			 OrderDeliverNoticeVr o =  new OrderDeliverNoticeVr();
			 params.put("deliveryNoticeId", orderDeliveryNotice.getDelivery_notice_id());
			 List<OrderDeliveryVoInfo> orderDeliveryVoInfos = orderDeliveryNoticedetailsService.getOrderDeliveryNoticedetailsListInfo(params);//送货通知明细
			 o.setDelivery_notice_id(orderDeliveryNotice.getDelivery_notice_id());
			 o.setCreator_name(orderDeliveryNotice.getCreator_name());
			 o.setDelivery_notice_bh(orderDeliveryNotice.getDelivery_notice_bh());
			 o.setNotice_dt(orderDeliveryNotice.getNotice_dt());
			 o.setNotice_status(orderDeliveryNotice.getNotice_status());
			 o.setPur_cpyname_cn(orderDeliveryNotice.getCpyname_cn());
			 o.setUpdate_dt(orderDeliveryNotice.getUpdate_dt());
			 orderDeleveryNoticeVo.setOrderDeliveryNotice(o);
			 orderDeleveryNoticeVo.setOrderDeliveryVoInfos(orderDeliveryVoInfos);//赋值
			 list.add(orderDeleveryNoticeVo);//赋值
		 }
		 return list;
	}
	/**
	* 查询出送货通知数量
	* @Description:
	* OrderDeliveryNoticeService
	* getOrderDeliveryNoticeList
	* @param params
	* @return List<OrderDeliveryNotice>
	* @author chenlong
	* 2016-8-25 上午11:15:41
	 */
	public Integer getOrderDeliveryNoticeListInfoCount(Map<String,Object> params) {		 
		 Integer count = mapper.getOrderDeliveryNoticeListInfoCount(params);
		 return count;		
	}
	
	public void addOrderDeliveryNotice(OrderDeliveryNotice[] arr) {
		for(OrderDeliveryNotice obj: arr) {
			mapper.addOrderDeliveryNotice(obj);
		}
	}
	public void updateOrderDeliveryNotice(OrderDeliveryNotice[] arr) {
		for(OrderDeliveryNotice obj: arr) {
			mapper.updateOrderDeliveryNotice(obj);
		}
	}
	public void deleteOrderDeliveryNotice(OrderDeliveryNotice[] arr) {
		for(OrderDeliveryNotice obj: arr) {
			mapper.deleteOrderDeliveryNotice(obj);
		}
	}
	
	/**
	 * @Description: 更新送货通知状态
	 * OrderDeliveryNoticeService
	 * updateDeliveryStatue
	 * @param params void
	 * @author mishengliang
	 * 2016-8-31 上午10:32:25
	 */
	public void updateDeliveryStatue(Map<String, Object> params){
		mapper.updateDeliveryStatue(params);
		orderDeliveryNoticedetailsService.updateNoticeDetailsConfirmTime(params);
	}
	
	/**
	 * @Description: 只是修改状态
	 * OrderDeliveryNoticeService
	 * updateConfirmDeliveryStatue
	 * @param params void
	 * @author mishengliang
	 * 2016-9-7 下午6:43:33
	 */
	public void updateConfirmDeliveryStatue(Map<String, Object> params){
		mapper.updateDeliveryStatue(params);
	}
	
	/**
	 * @Description: 批量修改确认时间
	 * OrderDeliveryNoticeService
	 * updateConfirmDate
	 * @param params void
	 * @author mishengliang
	 * 2016-9-6 下午6:36:55
	 */
	public void updateConfirmDate(Map<String, Object> params){
		Map<String, Object> paramsForUpdate = new HashMap<String, Object>();
		JSONArray jsonArrays = JSONArray.fromObject(params.get("dateArray"));
		
		mapper.updateNullConfirmDate(params);//在修改前将为空的确认日期 改为 通知日期
		for(int i = 0; i < jsonArrays.size(); i++){//循环更新确认日期
			JSONObject jsonObject = jsonArrays.getJSONObject(i);
			for(Object key : jsonObject.keySet()){
				paramsForUpdate.put("detailsId", key);
				paramsForUpdate.put("confirmDeliveryTime", jsonObject.get(key));
				orderDeliveryNoticedetailsService.updateConfirmDate(paramsForUpdate);
			}
		}
		mapper.updateDeliveryStatue(params);//更新状态
	}
	
	public Integer getDeliveryStatu(Map<String, Object> params){
		return mapper.getDeliveryStatu(params);
	}
	public Map<String, Object> getDeliveryUdt(Map<String, Object> params){
		return mapper.getDeliveryUdt(params);
	}
	
	/**
	 * @Description:查询最新三条送货通知
	 * OrderDeliveryNoticeService
	 * getLastThreeOrderDeliveryNotice
	 * @param params
	 * @return List<OrderDeleveryNoticeVo>
	 * @author yukai
	 * 2016-9-7 上午10:04:17
	 */
	public List<OrderDeliveryNotice> getLastThreeOrderDeliveryNotice(Map<String,Object> params) {
		 List<OrderDeliveryNotice>  list = mapper.getLastThreeOrderDeliveryNotice(params);
		 return list;
	}
	/**
	 * @Description:查询待确认送货通知数量
	 * OrderDeliveryNoticeService
	 * getToBeConfirmedDeliveryNoticeCount
	 * @param params
	 * @return int
	 * @author yukai
	 * 2016-9-7 下午2:39:38
	 */
	public int getToBeConfirmedDeliveryNoticeCount(Map<String,Object> params) {
		 return mapper.getToBeConfirmedDeliveryNoticeCount(params);
	}
}
