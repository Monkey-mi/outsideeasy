package platform.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.common.data.PfRegisterAttchedMapper;
import platform.common.model.PfRegisterAttched;


@Service
public class PfRegisterAttchedService {
	@Autowired
	private PfRegisterAttchedMapper mapper;


	public List<PfRegisterAttched> getAppRegisterAttchedList(Map<String,Object> params) {
		return mapper.getAppRegisterAttchedList(params);
	}
	/**
	 * @Description: 对图片文件进行预览
	 * @param Map
	 * @return List<PfRegisterAttched> 
	 * @author chenlong
	 * @date 2016-7-13
	 */
	public List<PfRegisterAttched> getRegisterAttchedList(Map<String,Object> params){
		return mapper.getRegisterAttchedList(params);
	}
	/**
	 * 增加图片文件记录
	*addAppRegisterAttched
	*@param obj
	*void
	*@author mishengliang
	*2016-4-26下午5:49:58
	 */
	public Integer addAppRegisterAttched(PfRegisterAttched obj) {
			mapper.addAppRegisterAttched(obj);
			return obj.getId();
	}
	
	/**
	 * 更新数据
	*updateAppRegisterAttched
	*@param obj
	*void
	*@author mishengliang
	*2016-4-27下午2:48:07
	 */
	public void updateAppRegisterAttched(PfRegisterAttched obj) {
			mapper.updateAppRegisterAttched(obj);
	}
	
	/**
	 * 
	*deleteAppRegisterAttched
	*@param arr
	*void
	*@author mishengliang
	*2016-4-27下午5:50:19
	 */
	public void deleteAppRegisterAttched(PfRegisterAttched obj) {
			mapper.deleteAppRegisterAttched(obj);
	}
}
