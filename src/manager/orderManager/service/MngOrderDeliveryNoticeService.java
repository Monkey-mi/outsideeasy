package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderDeliveryNoticeMapper;
import manager.orderManager.model.MngOrderDeliveryNotice;


@Service
public class MngOrderDeliveryNoticeService {
	@Autowired
	private MngOrderDeliveryNoticeMapper mapper;


	public List<MngOrderDeliveryNotice> getMngOrderDeliveryNoticeList(Map<String,Object> params) {
		return mapper.getMngOrderDeliveryNoticeList(params);
	}
	public void addMngOrderDeliveryNotice(MngOrderDeliveryNotice[] arr) {
		for(MngOrderDeliveryNotice obj: arr) {
			mapper.addMngOrderDeliveryNotice(obj);
		}
	}
	public void updateMngOrderDeliveryNotice(MngOrderDeliveryNotice[] arr) {
		for(MngOrderDeliveryNotice obj: arr) {
			mapper.updateMngOrderDeliveryNotice(obj);
		}
	}
	public void deleteMngOrderDeliveryNotice(MngOrderDeliveryNotice[] arr) {
		for(MngOrderDeliveryNotice obj: arr) {
			mapper.deleteMngOrderDeliveryNotice(obj);
		}
	}
}
