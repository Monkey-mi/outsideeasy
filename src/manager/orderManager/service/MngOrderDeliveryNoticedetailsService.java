package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderDeliveryNoticedetailsMapper;
import manager.orderManager.model.MngOrderDeliveryNoticedetails;


@Service
public class MngOrderDeliveryNoticedetailsService {
	@Autowired
	private MngOrderDeliveryNoticedetailsMapper mapper;


	public List<MngOrderDeliveryNoticedetails> getMngOrderDeliveryNoticedetailsList(Map<String,Object> params) {
		return mapper.getMngOrderDeliveryNoticedetailsList(params);
	}
	public void addMngOrderDeliveryNoticedetails(MngOrderDeliveryNoticedetails[] arr) {
		for(MngOrderDeliveryNoticedetails obj: arr) {
			mapper.addMngOrderDeliveryNoticedetails(obj);
		}
	}
	public void updateMngOrderDeliveryNoticedetails(MngOrderDeliveryNoticedetails[] arr) {
		for(MngOrderDeliveryNoticedetails obj: arr) {
			mapper.updateMngOrderDeliveryNoticedetails(obj);
		}
	}
	public void deleteMngOrderDeliveryNoticedetails(MngOrderDeliveryNoticedetails[] arr) {
		for(MngOrderDeliveryNoticedetails obj: arr) {
			mapper.deleteMngOrderDeliveryNoticedetails(obj);
		}
	}
}
