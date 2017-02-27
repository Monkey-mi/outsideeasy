package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.StateCounts;
import usercenter.saleManage.deliveryManage.response.DeliveryRegisterDetailVo;
import usercenter.saleManage.tradeManager.model.PurchaseOrder;
import usercenter.saleManage.tradeManager.response.PurchaseOrderRemark;
import usercenter.saleManage.tradeManager.response.PurchaseOrderStatus;
import usercenter.saleManage.tradeManager.response.PurchaseOrderVo;
import usercenter.saleManage.tradeManager.response.PurchaseOrdersupId;


public interface PurchaseOrderMapper {
	public List<PurchaseOrder> getPurchaseOrderList(Map<String,Object> params);
	public void addPurchaseOrder(PurchaseOrder obj);
	public void updatePurchaseOrder(PurchaseOrder obj);
	public void deletePurchaseOrder(Map<String,Object> params);
	public PurchaseOrderStatus getOrderFordelete(Map<String,Object> params);
	public PurchaseOrderStatus getOrderstatus(Map<String,Object> params);
	public PurchaseOrderRemark getOrderRemark(Map<String,Object> params);
	public void updateOrderRemark(Map<String,Object> params);
	public PurchaseOrder getOrderByID(Map<String,Object> params);
	public List<PurchaseOrdersupId> getsupplierListID(Map<String,Object> params);
	public void updateOrderStatus(Map<String,Object> params);
	public PurchaseOrderVo getOrderDetailsByID(Map<String,Object> params);
	public List<DeliveryRegisterDetailVo> getDeliveryRegisterDetailsVoByID(Map<String,Object> params);
	public List<PurchaseOrder> getPurchaseOrderListForOut(Map<String,Object> params);
	public PurchaseOrderRemark getOrderRemarkForOut(Map<String,Object> params);
	public void updateOrderRemarkForOut(Map<String,Object> params);
	public PurchaseOrderStatus getOrderFordeleteForOut(Map<String,Object> params);
	public void deletePurchaseOrderForOut(Map<String,Object> params);
	public PurchaseOrderVo getOrderDetailsByIDForOut(Map<String,Object> params);
	public List<StateCounts>  getStatusCount(Map<String,Object> params);
	public Integer getStatusCountVo(Map<String,Object> params);
	public List<PurchaseOrder> getLastThreeDeliverOrder(Map<String, Object> params);
	public List<PurchaseOrder> getLastThreeDeliverOrderForOut(Map<String, Object> params);
	public PurchaseOrder getOrderDetailsByIDExcel(Map<String, Object> params);
}
