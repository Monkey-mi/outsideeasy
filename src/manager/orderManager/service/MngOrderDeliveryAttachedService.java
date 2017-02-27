package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderDeliveryAttachedMapper;
import manager.orderManager.model.MngOrderDeliveryAttached;
import util.Const;
import util.WebUtil;

@Service
public class MngOrderDeliveryAttachedService {
	@Autowired
	private MngOrderDeliveryAttachedMapper mapper;


	public List<MngOrderDeliveryAttached> getMngOrderDeliveryAttachedList(Map<String,Object> params) {
		return mapper.getMngOrderDeliveryAttachedList(params);
	}
	public void addMngOrderDeliveryAttached(MngOrderDeliveryAttached[] arr) {
		for(MngOrderDeliveryAttached obj: arr) {
			mapper.addMngOrderDeliveryAttached(obj);
		}
	}
	public void updateMngOrderDeliveryAttached(MngOrderDeliveryAttached[] arr) {
		for(MngOrderDeliveryAttached obj: arr) {
			mapper.updateMngOrderDeliveryAttached(obj);
		}
	}
	public void deleteMngOrderDeliveryAttached(MngOrderDeliveryAttached[] arr) {
		for(MngOrderDeliveryAttached obj: arr) {
			mapper.deleteMngOrderDeliveryAttached(obj);
		}
	}
	/**
	 * @Description:判断记录是否可删除
	 * @param ycdh
	 * @return  true可删除；false 不可删除
	    message 提示信息
	 * @return Map<String,Object> 
	 */
	public Map<String,Object> canDelMngOrderDeliveryAttached(Map<String,Object> params){
		Map<String,Object> res=WebUtil.getDefaultResponseMap();
		List<MngOrderDeliveryAttached> list=getMngOrderDeliveryAttachedList(params);
		if(list.size()==0){
			res.put(Const.AJAX_SERVICE_SUCCESS, false);
			res.put(Const.AJAX_SERVICE_MESSAGE,"记录已不存在");
			return res;
		}
		return res;
	}
}
