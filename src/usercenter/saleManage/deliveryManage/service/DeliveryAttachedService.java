package usercenter.saleManage.deliveryManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mongodb.service.FileOptService;

import usercenter.saleManage.deliveryManage.data.DeliveryAttachedMapper;
import usercenter.saleManage.deliveryManage.model.DeliveryAttached;


@Service
public class DeliveryAttachedService {
	@Autowired
	private DeliveryAttachedMapper mapper;
	@Autowired
	private FileOptService fileService;


	public List<DeliveryAttached> getDeliveryAttachedList(Map<String,Object> params) {
		return mapper.getDeliveryAttachedList(params);
	}
	public void addDeliveryAttached(Map<String,Object> params) {
			mapper.addDeliveryAttached(params);
	}
	public void updateDeliveryAttached(Map<String,Object> params) {
			mapper.updateDeliveryAttached(params);
	}
	public void deleteDeliveryAttached(Map<String,Object> params) {
		List<DeliveryAttached> deliveryAttacheds = getDeliveryAttachedList(params);
		if (deliveryAttacheds.size()>0) {
			if (deliveryAttacheds.get(0).getMogodb_id()!=null) {
				String filename = deliveryAttacheds.get(0).getMogodb_id();		
				fileService.deleteFileByName(filename);
			}
		}
		mapper.deleteDeliveryAttached(params);
	}
}
