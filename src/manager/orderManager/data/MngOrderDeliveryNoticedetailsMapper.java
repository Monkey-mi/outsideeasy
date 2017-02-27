package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderDeliveryNoticedetails;


public interface MngOrderDeliveryNoticedetailsMapper {
	public List<MngOrderDeliveryNoticedetails> getMngOrderDeliveryNoticedetailsList(Map<String,Object> params);
	public void addMngOrderDeliveryNoticedetails(MngOrderDeliveryNoticedetails obj);
	public void updateMngOrderDeliveryNoticedetails(MngOrderDeliveryNoticedetails obj);
	public void deleteMngOrderDeliveryNoticedetails(MngOrderDeliveryNoticedetails obj);
}
