package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessRecord;


public interface AccessRecordMapper {
	public List<AccessRecord> getAccessRecordList(Map<String,Object> params);
	public void addAccessRecord(Map<String,Object> params);
	public void updateAccessRecord(Map<String,Object> params);
	public void deleteAccessRecord(Map<String,Object> params);
	public int getCountForToBeSubmittedAccess(Map<String, Object> params);
	public int getCountForToBeReturnedAccess(Map<String, Object> params);
	public AccessRecord checkRecordExist(Map<String, Object> params);
	public List<AccessRecord> getSubmitRecordBySubmitId(Map<String, Object> params);
	public  List<Map<String, Object>> getStatusByRecordId(Map<String, Object> params);
	public List<AccessRecord> getAccessRecordListForVerify(
			Map<String, Object> params);
	public int getAccessRecordListForVerify_count(Map<String, Object> params);
}
