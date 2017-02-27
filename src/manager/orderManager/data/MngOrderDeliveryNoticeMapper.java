package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderDeliveryNotice;


public interface MngOrderDeliveryNoticeMapper {
	public List<MngOrderDeliveryNotice> getMngOrderDeliveryNoticeList(Map<String,Object> params);
	public void addMngOrderDeliveryNotice(MngOrderDeliveryNotice obj);
	public void updateMngOrderDeliveryNotice(MngOrderDeliveryNotice obj);
	public void deleteMngOrderDeliveryNotice(MngOrderDeliveryNotice obj);
}
