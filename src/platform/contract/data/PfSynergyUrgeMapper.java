package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderCheckDetails;
import platform.contract.model.PfOrderDeliveryNotice;
import platform.contract.model.PfOrderDeliveryNoticedetails;
import platform.contract.model.PfOrderQualitycheck;
import platform.contract.model.PfPurchaseOrderDetails;



public interface PfSynergyUrgeMapper {
	public List<PfOrderDeliveryNotice> getPfOrderDeliveryNoticeList(Map<String,Object> params);
	public void addPfOrderDeliveryNotice(PfOrderDeliveryNotice obj);
	public void updatePfOrderDeliveryNotice(Map<String,Object> params);
	
	public List<PfOrderDeliveryNoticedetails> getPfOrderDeliveryNoticedetailsList(Map<String,Object> params);
	public void addPfOrderDeliveryNoticedetails(PfOrderDeliveryNoticedetails obj);
	public void updatePfOrderDeliveryNoticedetails(PfOrderDeliveryNoticedetails obj);
	
	//更新订单明细数量
	public void updatePfOrderDetailSync(PfPurchaseOrderDetails obj);
	
	public void addPfOrderQualitycheck(PfOrderQualitycheck obj);
	
	public void addPfOrderCheckDetails(PfOrderCheckDetails obj);
	//获取供应商档案id
	public List<PfOrderDeliveryNotice> getPfSup_company_idAndSupplier_idList(Map<String,Object> params);
}
