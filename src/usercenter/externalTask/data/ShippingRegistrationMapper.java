package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.DeStatusVo;
import usercenter.externalTask.model.ShippingRegistration;


public interface ShippingRegistrationMapper {
	public List<ShippingRegistration> getShippingRegistrationList(Map<String,Object> params);
	public void addShippingRegistration(Map<String,Object> params);
	public void updateShippingRegistration(Map<String,Object> params);
	public void deleteShippingRegistration(Map<String,Object> params);
	public ShippingRegistration getShippingForID(Map<String,Object> params);
	public ShippingRegistration getShippingForNumber(Map<String,Object> params);
	public List<Integer> getShippingStatusForEdit(Map<String,Object> params);
	public Integer  getShippingStatus(Map<String,Object> params);
	public Integer getShippingStatusForID(Map<String,Object> params);
	public void updateShippingRegistrationForCancel(Map<String,Object> params);
	public List<DeStatusVo> getShippingIdForNum(Map<String,Object> params);
}
