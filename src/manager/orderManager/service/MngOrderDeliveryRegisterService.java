package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderDeliveryRegisterMapper;
import manager.orderManager.model.MngOrderDeliveryRegister;
import util.Const;
import util.WebUtil;

@Service
public class MngOrderDeliveryRegisterService {
	@Autowired
	private MngOrderDeliveryRegisterMapper mapper;


	public List<MngOrderDeliveryRegister> getMngOrderDeliveryRegisterList(Map<String,Object> params) {
		return mapper.getMngOrderDeliveryRegisterList(params);
	}
	public void addMngOrderDeliveryRegister(MngOrderDeliveryRegister[] arr) {
		for(MngOrderDeliveryRegister obj: arr) {
			mapper.addMngOrderDeliveryRegister(obj);
		}
	}
	public void updateMngOrderDeliveryRegister(MngOrderDeliveryRegister[] arr) {
		for(MngOrderDeliveryRegister obj: arr) {
			mapper.updateMngOrderDeliveryRegister(obj);
		}
	}
	public void deleteMngOrderDeliveryRegister(MngOrderDeliveryRegister[] arr) {
		for(MngOrderDeliveryRegister obj: arr) {
			mapper.deleteMngOrderDeliveryRegister(obj);
		}
	}
	/**
	 * @Description:判断记录是否可删除
	 * @param ycdh
	 * @return  true可删除；false 不可删除
	    message 提示信息
	 * @return Map<String,Object> 
	 */
	public Map<String,Object> canDelMngOrderDeliveryRegister(Map<String,Object> params){
		Map<String,Object> res=WebUtil.getDefaultResponseMap();
		List<MngOrderDeliveryRegister> list=getMngOrderDeliveryRegisterList(params);
		if(list.size()==0){
			res.put(Const.AJAX_SERVICE_SUCCESS, false);
			res.put(Const.AJAX_SERVICE_MESSAGE,"记录已不存在");
			return res;
		}
		return res;
	}
}
