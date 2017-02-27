package usercenter.saleManage.deliveryManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.deliveryManage.data.DeliveryRegisterDetailsMapper;
import usercenter.saleManage.deliveryManage.model.DeliveryRegisterDetails;
import usercenter.saleManage.deliveryManage.response.DeliveryRegisterDetailVo;
import usercenter.saleManage.tradeManager.service.PurchaseOrderService;


@Service
public class DeliveryRegisterDetailsService {
	@Autowired
	private DeliveryRegisterDetailsMapper mapper;
	@Autowired
	private PurchaseOrderService poService;

	public List<DeliveryRegisterDetails> getDeliveryRegisterDetailsList(Map<String,Object> params) {
		return mapper.getDeliveryRegisterDetailsList(params);
	}
	public void addDeliveryRegisterDetails(Map<String,Object> params) {
			mapper.addDeliveryRegisterDetails(params);
	}
	public void updateDeliveryRegisterDetails(DeliveryRegisterDetails[] arr) {
		for(DeliveryRegisterDetails obj: arr) {
			mapper.updateDeliveryRegisterDetails(obj);
		}
	}
	public void deleteDeliveryRegisterDetails(Map<String,Object> params) {
			mapper.deleteDeliveryRegisterDetails(params);
	}
	public List<DeliveryRegisterDetailVo> getAgreementNumByID(
			Map<String, Object> params) {
		return poService.getDeliveryRegisterDetailsVoByID(params);
	}
}
