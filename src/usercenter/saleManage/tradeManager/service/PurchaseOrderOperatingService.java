package usercenter.saleManage.tradeManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.PurchaseOrderOperatingMapper;
import usercenter.saleManage.tradeManager.model.PurchaseOrderOperating;


@Service
public class PurchaseOrderOperatingService {
	@Autowired
	private PurchaseOrderOperatingMapper mapper;


	public List<PurchaseOrderOperating> getPurchaseOrderOperatingList(Map<String,Object> params) {
		return mapper.getPurchaseOrderOperatingList(params);
	}
	
	public void updatePurchaseOrderOperating(PurchaseOrderOperating[] arr) {
		for(PurchaseOrderOperating obj: arr) {
			mapper.updatePurchaseOrderOperating(obj);
		}
	}
	public void deletePurchaseOrderOperating(PurchaseOrderOperating[] arr) {
		for(PurchaseOrderOperating obj: arr) {
			mapper.deletePurchaseOrderOperating(obj);
		}
	}
	/**
	 * 插入一条订单操作信息
	* @Description:
	* PurchaseOrderOperatingService
	* addPurchaseOrderOperating
	* @param params void
	* @author chenlong
	* 2016-8-22 上午9:01:40
	 */
	public void addPurchaseOrderOperating(Map<String,Object> params) {
		mapper.addPurchaseOrderOperating(params);
}
}
