package common.sysmodule.data;

import java.util.List;
import java.util.Map;

import common.sysmodule.model.WsIdentity;


public interface WsIdentityMapper {
	public List<WsIdentity> getWsIdentityList(Map<String,Object> params);
	public void addWsIdentity(WsIdentity obj);
	public void updateWsIdentity(WsIdentity obj);
	public void deleteWsIdentity(WsIdentity obj);
	public List<WsIdentity> getEnabledIdentity(String identify);
}
