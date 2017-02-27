package manager.templet.data;

import java.util.List;
import java.util.Map;

import manager.templet.model.MngAccessTemplet;


public interface MngAccessTempletMapper {
	public List<MngAccessTemplet> getMngAccessTempletList(Map<String,Object> params);
	public void addMngAccessTemplet(MngAccessTemplet obj);
	public void updateMngAccessTemplet(MngAccessTemplet obj);
	public void deleteMngAccessTemplet(MngAccessTemplet obj);
}
