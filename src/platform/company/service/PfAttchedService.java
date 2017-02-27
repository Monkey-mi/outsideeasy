package platform.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.outsideasy.ws.erp.supplier.vo.AttchedOut;
import common.mongodb.service.FileOptService;

import platform.common.model.PfRegisterAttched;
import platform.common.service.PfRegisterAttchedService;
import platform.company.data.PfAttchedMapper;

@Service
public class PfAttchedService {

	@Autowired
	private PfAttchedMapper pfAttchedMapper;
	@Autowired
	private PfRegisterAttchedService registerAttchedService;
	@Autowired
	private FileOptService fileService;
	
	public List<AttchedOut> getAttchedOutList(Map<String,Object> params){
		return pfAttchedMapper.getAttchedOutList(params);
	}
	
	/**
	 * @Description: 获取map格式的附件表信息
	 * PfAttchedService
	 * getAttchedMapListByCpId
	 * @param params
	 * @return List<Map<String,Object>>
	 * @author mishengliang
	 * 2016-10-31 上午9:21:50
	 */
	public List<Map<String, Object>> getAttchedMapListByCpId(Map<String,Object> params){
		return pfAttchedMapper.getAttchedMapListByCpId(params);
	}
	
	public void  updateAttchedById(Map<String,Object> params) {
		pfAttchedMapper.updateAttchedById(params);
	}
	@SuppressWarnings("unchecked")
	public void addOrUpdateAttchedCluster(String attched, Integer companyId) {
		if(attched == null)return;
		attched = "["+ attched +"]";
		JSONArray attchedArray = JSONArray.fromObject(attched);
		
		for(int i = 0; i<attchedArray.size(); i++){
			Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> params = new HashMap<String, Object>();//新增的数据集合
			JSONObject attchedJsonObject = attchedArray.getJSONObject(i);
			if("0".equals(attchedJsonObject.get("isUpdate").toString())||attchedJsonObject.get("isUpdate")==null){
				updateParams = attchedJsonObject;
				updateParams.put("companyId", companyId);
				updateAttchedById(updateParams);
			}else {
				params.put("companyId", companyId);
				params.put("fileTypeId", attchedJsonObject.get("fileTypeId"));
				if(registerAttchedService.getAppRegisterAttchedList(params).size()>0){
					PfRegisterAttched attchedOld = registerAttchedService.getAppRegisterAttchedList(params).get(0);
					fileService.deleteFileByName(attchedOld.getMogodb_id());//删除原有的文件
					registerAttchedService.deleteAppRegisterAttched(attchedOld);
				}
				updateParams = attchedJsonObject;
				updateParams.put("companyId", companyId);
				updateAttchedById(updateParams);
			}
		}
	}
}
