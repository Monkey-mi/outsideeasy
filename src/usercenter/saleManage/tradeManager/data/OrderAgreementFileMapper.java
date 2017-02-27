package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.OrderAgreementFile;


public interface OrderAgreementFileMapper {
	public Integer getOrderAgreementFileCount(Map<String,Object> params);
	public OrderAgreementFile getOrderAgreementFileforId(Map<String,Object> params);
	public void addOrderAgreementFile(OrderAgreementFile obj);
	public void updateOrderAgreementFile(OrderAgreementFile obj);
	public void deleteOrderAgreementFile(Map<String,Object> params);
	public OrderAgreementFile getOrderFileforId(Map<String,Object> params);
	public List<OrderAgreementFile> getOrderAgreementFile(Map<String,Object> params);
	public OrderAgreementFile getOrderAgreementFileforOne(Map<String,Object> params);
	public OrderAgreementFile getOrderFileforPurorderid(Map<String,Object> params);
}
