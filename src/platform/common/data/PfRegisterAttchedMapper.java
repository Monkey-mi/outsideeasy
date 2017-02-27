package platform.common.data;

import java.util.List;
import java.util.Map;

import platform.common.model.PfRegisterAttched;


public interface PfRegisterAttchedMapper {
	public List<PfRegisterAttched> getAppRegisterAttchedList(Map<String,Object> params);
	public void addAppRegisterAttched(PfRegisterAttched obj);
	public void updateAppRegisterAttched(PfRegisterAttched obj);
	public void deleteAppRegisterAttched(PfRegisterAttched obj);
	public List<PfRegisterAttched> getRegisterAttchedList(Map<String,Object> params);
}
