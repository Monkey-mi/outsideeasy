package usercenter.purchaseManage.purchaseCategory.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.purchaseManage.purchaseCategory.data.PurchaseNatureMapper;
import usercenter.purchaseManage.purchaseCategory.model.PurchaseNature;


@Service
public class PurchaseNatureService {
	@Autowired
	private PurchaseNatureMapper mapper;


	public List<PurchaseNature> getPurchaseNatureList(Map<String,Object> params) {
		return mapper.getPurchaseNatureList(params);
	}
	public void addPurchaseNature(PurchaseNature[] arr) {
		for(PurchaseNature obj: arr) {
			mapper.addPurchaseNature(obj);
		}
	}
	public void updatePurchaseNature(PurchaseNature[] arr) {
		for(PurchaseNature obj: arr) {
			mapper.updatePurchaseNature(obj);
		}
	}
	public void deletePurchaseNature(PurchaseNature[] arr) {
		for(PurchaseNature obj: arr) {
			mapper.deletePurchaseNature(obj);
		}
	}
}
