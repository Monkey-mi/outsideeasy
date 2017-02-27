package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderQualitycheckMapper;
import manager.orderManager.model.MngOrderQualitycheck;
import util.Const;
import util.WebUtil;

@Service
public class MngOrderQualitycheckService {
	@Autowired
	private MngOrderQualitycheckMapper mapper;


	public List<MngOrderQualitycheck> getMngOrderQualitycheckList(Map<String,Object> params) {
		return mapper.getMngOrderQualitycheckList(params);
	}
	public void addMngOrderQualitycheck(MngOrderQualitycheck[] arr) {
		for(MngOrderQualitycheck obj: arr) {
			mapper.addMngOrderQualitycheck(obj);
		}
	}
	public void updateMngOrderQualitycheck(MngOrderQualitycheck[] arr) {
		for(MngOrderQualitycheck obj: arr) {
			mapper.updateMngOrderQualitycheck(obj);
		}
	}
	public void deleteMngOrderQualitycheck(MngOrderQualitycheck[] arr) {
		for(MngOrderQualitycheck obj: arr) {
			mapper.deleteMngOrderQualitycheck(obj);
		}
	}
	/**
	 * @Description:判断记录是否可删除
	 * @param ycdh
	 * @return  true可删除；false 不可删除
	    message 提示信息
	 * @return Map<String,Object> 
	 */
	public Map<String,Object> canDelMngOrderQualitycheck(Map<String,Object> params){
		Map<String,Object> res=WebUtil.getDefaultResponseMap();
		List<MngOrderQualitycheck> list=getMngOrderQualitycheckList(params);
		if(list.size()==0){
			res.put(Const.AJAX_SERVICE_SUCCESS, false);
			res.put(Const.AJAX_SERVICE_MESSAGE,"记录已不存在");
			return res;
		}
		return res;
	}
}
