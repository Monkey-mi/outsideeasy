package manager.applicationRecord.data;

import java.util.List;
import java.util.Map;

import manager.applicationRecord.model.MngAccessApplicationInfo;


public interface MngAccessApplicationInfoMapper {
	public List<MngAccessApplicationInfo> getMngAccessApplicationInfoList(Map<String,Object> params);
	public void addMngAccessApplicationInfo(MngAccessApplicationInfo obj);
	public void updateMngAccessApplicationInfo(MngAccessApplicationInfo obj);
	public void deleteMngAccessApplicationInfo(MngAccessApplicationInfo obj);
}
