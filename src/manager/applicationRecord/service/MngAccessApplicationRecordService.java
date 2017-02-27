package manager.applicationRecord.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.applicationRecord.data.MngAccessApplicationRecordMapper;
import manager.applicationRecord.model.MngAccessApplicationRecord;


@Service
public class MngAccessApplicationRecordService {
	@Autowired
	private MngAccessApplicationRecordMapper mapper;
	@Autowired
	private MngSupplierFilesService mngSupplierFilesService;


	public List<MngAccessApplicationRecord> getMngAccessApplicationRecordList(Map<String,Object> params) {
		return mapper.getMngAccessApplicationRecordList(params);
	}
	public void addMngAccessApplicationRecord(MngAccessApplicationRecord[] arr) {
		for(MngAccessApplicationRecord obj: arr) {
			mapper.addMngAccessApplicationRecord(obj);
		}
	}
	public void updateMngAccessApplicationRecord(MngAccessApplicationRecord[] arr) {
		for(MngAccessApplicationRecord obj: arr) {
			mapper.updateMngAccessApplicationRecord(obj);
		}
	}
	public void deleteMngAccessApplicationRecord(MngAccessApplicationRecord[] arr) {
		for(MngAccessApplicationRecord obj: arr) {
			mapper.deleteMngAccessApplicationRecord(obj);
		}
	}
	/**
	* @Description:
	* MngAccessApplicationRecordService 更新为审核通过
	* updateStateApplication
	* @param params void
	* @author chenlong
	* 2016-8-4 上午9:04:03
	 */
	public String updateStateApplication(Map<String,Object> params){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("access_status", 3);
		String str = params.get("access_array").toString();
		String[] st = str.split(",");
		for(String num : st){
			param.put("record_id", Integer.parseInt(num));
			mapper.updateStateApplication(param);//更新准入申请流水的状态
			param.put("file_status", 0);
			mngSupplierFilesService.UpdateMngSupplierFileState(param);// 根据准入申请流水的ID，更新档案表中的状态			
		}
		return "success";
	}
	/**
	* @Description:
	* MngAccessApplicationRecordService 审核不通过
	* updateStateApplication2
	* @param params
	* @return String
	* @author chenlong
	* 2016-8-4 上午9:31:58
	 */
	public String updateStateApplication2(Map<String,Object> params){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("access_status", 4);
		String str = params.get("access_array").toString();
		String[] st = str.split(",");
		for(String num : st){
			param.put("record_id", Integer.parseInt(num));
			mapper.updateStateApplication(param);//更新准入申请流水的状态
		}
		return "success";
	}
}
