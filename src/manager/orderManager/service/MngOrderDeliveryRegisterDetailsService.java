package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderDeliveryRegisterDetailsMapper;
import manager.orderManager.model.MngOrderDeliveryRegisterDetails;
import util.Const;
import util.WebUtil;

@Service
public class MngOrderDeliveryRegisterDetailsService {
	@Autowired
	private MngOrderDeliveryRegisterDetailsMapper mapper;


	public List<MngOrderDeliveryRegisterDetails> getMngOrderDeliveryRegisterDetailsList(Map<String,Object> params) {
		return mapper.getMngOrderDeliveryRegisterDetailsList(params);
	}
	public void addMngOrderDeliveryRegisterDetails(MngOrderDeliveryRegisterDetails[] arr) {
		for(MngOrderDeliveryRegisterDetails obj: arr) {
			mapper.addMngOrderDeliveryRegisterDetails(obj);
		}
	}
	public void updateMngOrderDeliveryRegisterDetails(MngOrderDeliveryRegisterDetails[] arr) {
		for(MngOrderDeliveryRegisterDetails obj: arr) {
			mapper.updateMngOrderDeliveryRegisterDetails(obj);
		}
	}
	public void deleteMngOrderDeliveryRegisterDetails(MngOrderDeliveryRegisterDetails[] arr) {
		for(MngOrderDeliveryRegisterDetails obj: arr) {
			mapper.deleteMngOrderDeliveryRegisterDetails(obj);
		}
	}
	/**
	 * @Description:判断记录是否可删除
	 * @param ycdh
	 * @return  true可删除；false 不可删除
	    message 提示信息
	 * @return Map<String,Object> 
	 */
	public Map<String,Object> canDelMngOrderDeliveryRegisterDetails(Map<String,Object> params){
		Map<String,Object> res=WebUtil.getDefaultResponseMap();
		List<MngOrderDeliveryRegisterDetails> list=getMngOrderDeliveryRegisterDetailsList(params);
		if(list.size()==0){
			res.put(Const.AJAX_SERVICE_SUCCESS, false);
			res.put(Const.AJAX_SERVICE_MESSAGE,"记录已不存在");
			return res;
		}
		return res;
	}
}
