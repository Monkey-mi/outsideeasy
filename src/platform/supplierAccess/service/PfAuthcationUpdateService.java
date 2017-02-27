package platform.supplierAccess.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.supplierAccess.data.PfAuthcationUpdateMapper;
import platform.supplierAccess.model.PfAuthcationUpdate;
import platform.supplierAccess.model.UpdateRegisterAttched;


@Service
public class PfAuthcationUpdateService {
	@Autowired
	private PfAuthcationUpdateMapper mapper;


	public List<PfAuthcationUpdate> getPfAuthcationUpdateList(Map<String,Object> params) {
		return mapper.getPfAuthcationUpdateList(params);
	}
	/**	供应商变更  
	 *参数：json格式的map
	 *返回值：String 
	 *2016-5-17
	 **/
	public void updateSupplierChangeStateByWS(Map<String, Object> params){
		String ids=params.get("ids").toString();
		String state=params.get("state").toString();
		int sta=Integer.parseInt(state);
		//刷新变更表状态
		mapper.updatePfAuthcationState(params);
		if(sta==3){
			
		}else if(sta==2){
				//获取明细信息
				List<PfAuthcationUpdate> pfaList=mapper.getPfAuthcationUpdateList(params);
				//将变更表信息刷入正式表
				for(PfAuthcationUpdate pfa:pfaList){
					mapper.updateSupplierFromUpdate(pfa);
				}
				//获取 附件信息
				List<UpdateRegisterAttched> uraList=mapper.getUpdateRegisterAttchedList(params);
				//将变更表附件信息刷入正式表
				for(UpdateRegisterAttched ura:uraList){
					mapper.updateRegisterAttched(ura);
				}
		}
	}
	
	/**
	 * 获取最近一条变更记录信息
	*getLastAuthcationUpdateItem
	*@param params
	*@return
	*PfAuthcationUpdate
	*@author mishengliang
	*2016-5-23上午10:42:27
	 */
	public PfAuthcationUpdate getLastAuthcationUpdateItem(Map<String, Object> params){
		return mapper.getLastAuthcationUpdateItem(params);
	}
	
	/**
	 * 插入一条变更数据
	*addPfAuthcationUpdate
	*@param authInfo
	*void
	*@author mishengliang
	*2016-5-23下午5:34:28
	 */
	public void addPfAuthcationUpdate(PfAuthcationUpdate authInfo){
		mapper.addPfAuthcationUpdate(authInfo);
	}
	
	/**
	 * 更新原有的变更信息
	*updatePfAuthcationUpdate
	*@param authInfo
	*void
	*@author mishengliang
	*2016-5-24下午2:28:59
	 */
	public void updatePfAuthcationUpdate(PfAuthcationUpdate authInfo){
		mapper.updatePfAuthcationUpdate(authInfo);
	}
}
