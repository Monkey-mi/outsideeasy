package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderCheckDetailsMapper;
import manager.orderManager.model.MngOrderCheckDetails;
import util.Const;
import util.WebUtil;

@Service
public class MngOrderCheckDetailsService {
	@Autowired
	private MngOrderCheckDetailsMapper mapper;


	public List<MngOrderCheckDetails> getMngOrderCheckDetailsList(Map<String,Object> params) {
		return mapper.getMngOrderCheckDetailsList(params);
	}
	public void addMngOrderCheckDetails(MngOrderCheckDetails[] arr) {
		for(MngOrderCheckDetails obj: arr) {
			mapper.addMngOrderCheckDetails(obj);
		}
	}
	public void updateMngOrderCheckDetails(MngOrderCheckDetails[] arr) {
		for(MngOrderCheckDetails obj: arr) {
			mapper.updateMngOrderCheckDetails(obj);
		}
	}
	public void deleteMngOrderCheckDetails(MngOrderCheckDetails[] arr) {
		for(MngOrderCheckDetails obj: arr) {
			mapper.deleteMngOrderCheckDetails(obj);
		}
	}
	/**
	 * @Description:判断记录是否可删除
	 * @param ycdh
	 * @return  true可删除；false 不可删除
	    message 提示信息
	 * @return Map<String,Object> 
	 */
	public Map<String,Object> canDelMngOrderCheckDetails(Map<String,Object> params){
		Map<String,Object> res=WebUtil.getDefaultResponseMap();
		List<MngOrderCheckDetails> list=getMngOrderCheckDetailsList(params);
		if(list.size()==0){
			res.put(Const.AJAX_SERVICE_SUCCESS, false);
			res.put(Const.AJAX_SERVICE_MESSAGE,"记录已不存在");
			return res;
		}
		return res;
	}
}
