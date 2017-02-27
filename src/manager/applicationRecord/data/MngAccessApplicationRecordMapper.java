package manager.applicationRecord.data;

import java.util.List;
import java.util.Map;

import manager.applicationRecord.model.MngAccessApplicationRecord;


public interface MngAccessApplicationRecordMapper {
	public List<MngAccessApplicationRecord> getMngAccessApplicationRecordList(Map<String,Object> params);
	public void addMngAccessApplicationRecord(MngAccessApplicationRecord obj);
	public void updateMngAccessApplicationRecord(MngAccessApplicationRecord obj);
	public void deleteMngAccessApplicationRecord(MngAccessApplicationRecord obj);
	public void updateStateApplication(Map<String,Object> params);
	public MngAccessApplicationRecord getAccessApplication(Map<String,Object> params);
}
