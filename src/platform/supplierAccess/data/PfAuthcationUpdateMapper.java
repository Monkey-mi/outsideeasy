package platform.supplierAccess.data;

import java.util.List;
import java.util.Map;

import platform.supplierAccess.model.PfAuthcationUpdate;
import platform.supplierAccess.model.UpdateRegisterAttched;


public interface PfAuthcationUpdateMapper {
	public List<PfAuthcationUpdate> getPfAuthcationUpdateList(Map<String,Object> params);
	public void updatePfAuthcationState(Map<String,Object> params);
	public void updateSupplierFromUpdate(PfAuthcationUpdate obj);
	public List<UpdateRegisterAttched> getUpdateRegisterAttchedList(Map<String,Object> params);
	
	public void updateRegisterAttched(UpdateRegisterAttched obj);
	
	/**
	 * 获取最近一条变更信息的记录
	*getLastAuthcationUpdateItem
	*@param params
	*void
	*@author mishengliang
	*2016-5-23上午10:31:46
	 */
	public PfAuthcationUpdate getLastAuthcationUpdateItem(Map<String,Object> params);
	
	/**
	 * 增加一条变更信息
	*addPfAuthcationUpdate
	*@param authInfo
	*void
	*@author mishengliang
	*2016-5-23下午5:35:51
	 */
	public void addPfAuthcationUpdate(PfAuthcationUpdate authInfo);
	
	/**
	 * 更新原有的变更信息
	*updatePfAuthcationUpdate
	*@param authInfo
	*void
	*@author mishengliang
	*2016-5-24下午2:21:22
	 */
	public void updatePfAuthcationUpdate(PfAuthcationUpdate authInfo);
}
