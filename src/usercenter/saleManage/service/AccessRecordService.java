package usercenter.saleManage.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessRecordMapper;
import usercenter.saleManage.model.AccessRecord;
import util.Const;

@Service
public class AccessRecordService {
	@Autowired
	private AccessRecordMapper mapper;
	@Autowired
	private AccessApplicationCategoryService aeService;
	
	public void updateAccessRecord(Map<String,Object> params){
		List<AccessRecord> records=getAccessRecordList(params);
		int access_status=Integer.parseInt(params.get("access_status").toString());
		if(records.size()>0){
			AccessRecord record=records.get(0);
			if (access_status==2) {
				if(record.getFirst_submit_dt()==null){
					params.put("first_submit_dt", new Date());
					params.put("orderby_dt", new Date());
					mapper.updateAccessRecord(params);
				}else {
					params.put("update_dt", new Date());
					params.put("orderby_dt", new Date());
					mapper.updateAccessRecord(params);
				}
			}else {
				mapper.updateAccessRecord(params);
			}
		}
	}
	public List<AccessRecord> getAccessRecordList(Map<String,Object> params) {
		return mapper.getAccessRecordList(params);
	}
	public void addAccessRecord(Map<String, Object> params) {
		mapper.addAccessRecord(params);
	}
	/**
	 * @Description:获取待提交准入申请的数量
	 * AccessRecordService
	 * getCountForToBeSubmittedAccess
	 * @param params
	 * @return int
	 * @author yukai
	 * 2016-8-31 上午10:55:45
	 */
	public int getCountForToBeSubmittedAccess(Map<String, Object>params){
		return mapper.getCountForToBeSubmittedAccess(params);
	}
	/**
	 * @Description:获取待退回准入申请的数量
	 * AccessRecordService
	 * getCountForToBeReturnedAccess
	 * @param params
	 * @return int
	 * @author yukai
	 * 2016-8-31 上午10:55:45
	 */
	public int getCountForToBeReturnedAccess(Map<String, Object>params){
		return mapper.getCountForToBeReturnedAccess(params);
	}
	public AccessRecord checkRecordExist(Map<String, Object> params) {
		return mapper.checkRecordExist(params);
	}
	/**
	 * @Description:根据提交人的company_id查询状态为已提交的记录
	 * AccessRecordService
	 * getSubmitRecordBySubmitId
	 * @param params
	 * @return List<AccessRecord>
	 * @author yukai
	 * 2016-9-20 下午3:26:19
	 */
	public List<AccessRecord> getSubmitRecordBySubmitId(
			Map<String, Object> params) {
		return mapper.getSubmitRecordBySubmitId(params);
	}
	
	/**
	 * @Description: 通过recordId获取审核状态
	 * AccessRecordService
	 * getStatusByRecordId
	 * @param params
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-11-3 下午1:53:19
	 */
	public Map<String, Object> getStatusByRecordId(Map<String, Object> params) {
		return mapper.getStatusByRecordId(params).get(0);//取最新的状态
	}
	/**
	 * @Description:获取准入申请审核列表
	 * AccessRecordService
	 * getAccessRecordListForVerify
	 * @param params
	 * @return List<AccessRecord>
	 * @author yukai
	 * 2016-12-19 下午4:18:58
	 */
	public List<AccessRecord> getAccessRecordListForVerify(
			Map<String, Object> params) {
		Map<String, Object> map=new HashMap<String, Object>();
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		params.put(Const.IS_CUSTOM_COUNT, true);
		int count=mapper.getAccessRecordListForVerify_count(params);
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		List<AccessRecord> list=mapper.getAccessRecordListForVerify(params);
		for (AccessRecord accessRecord : list) {
			map.put("record_id", accessRecord.getRecord_id());
			String categoryStr=aeService.getAccessApplicationCategoryStr(map);
			accessRecord.setCategoryStr(categoryStr);
		}
		return list;
	}
}
