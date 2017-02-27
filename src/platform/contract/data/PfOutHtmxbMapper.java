package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOutHtmxb;


public interface PfOutHtmxbMapper {
	public List<PfOutHtmxb> getPfOutHtmxbList(Map<String,Object> params);
	public void addPfOutHtmxb(PfOutHtmxb obj);
	public void updatePfOutHtmxb(PfOutHtmxb obj);
	public void deletePfOutHtmxb(PfOutHtmxb obj);
}
