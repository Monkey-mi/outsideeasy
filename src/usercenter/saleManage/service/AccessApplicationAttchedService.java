package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationAttchedMapper;
import usercenter.saleManage.model.AccessApplicationAttched;

import common.mongodb.service.FileOptService;

@Service
public class AccessApplicationAttchedService {
	@Autowired
	private AccessApplicationAttchedMapper mapper;
	@Autowired
	private FileOptService fileService;
	
	public void addAccessApplicationAttched(Map<String, Object>params){
		mapper.addAccessApplicationAttched(params);
	}
	public void deleteAccessApplicationAttchedByRI(Map<String, Object>params){
		mapper.deleteAccessApplicationAttchedByRI(params);
	}
	public void delAccessApplicationAttched(Map<String, Object>params){
		mapper.deleteAccessApplicationAttched(params);
	}
	public List<AccessApplicationAttched> getAccessApplicationAttched(Map<String, Object>params){
		return mapper.getAccessApplicationAttchedList(params);
	}
	public void updateAccessApplicationAttched(Map<String, Object>params){
		mapper.updateAccessApplicationAttched(params);
	}
	public void updateAccessApplicationAttchedName(Map<String, Object>params){
		mapper.updateAccessApplicationAttchedName(params);
	}
	public List<AccessApplicationAttched> getAllAccessAttched(
			Map<String, Object> params) {
		return mapper.getAllAccessAttched(params);
	}
	public void delAccessApplicationAttcheds(Map<String, Object> params) {
		Map<String , Object> map=new HashMap<String, Object>();
		if (!"".equals(params.get("delFileIds").toString()) && params.get("delFileIds").toString()!=null) {
			String arrayStr=params.get("delFileIds").toString();
			String[] arrayfile_id=arrayStr.split(",");
			for(int i=0;i<arrayfile_id.length;i++){
				map.put("id", arrayfile_id[i]);
				/*List<AccessApplicationAttched>attcheds=getAccessApplicationAttched(map);
				if (attcheds.size()>0) {
					AccessApplicationAttched attched=attcheds.get(0);
					if(attched.getMogodb_id() != null){
						String filename = attched.getMogodb_id();		
						fileService.deleteFileByName(filename);
					}
				}*/
				delAccessApplicationAttched(map);
			}
		}
	}
	public void delUselessAttched(Map<String, Object> params) {
		List<AccessApplicationAttched>list=getAccessApplicationAttched(params);
		for (AccessApplicationAttched attched : list) {
			if(attched.getMogodb_id() != null){
				String filename = attched.getMogodb_id();		
				fileService.deleteFileByName(filename);
			}
			params.put("id", attched.getId());
			delAccessApplicationAttched(params);
		}
	}
	public void updateAccessApplicationAttchedMogoId(Map<String, Object> params) {
		mapper.updateAccessApplicationAttchedMogoId(params);
	}
	
	@SuppressWarnings("unchecked")
	public void addAndDelFileInfos(Map<String, Object> params){
		Integer recordId = Integer.parseInt(params.get("recordId").toString());
		Integer supplierId = Integer.parseInt(params.get("supplierId").toString());
		String addFileInfos = params.get("addFileInfos").toString();
		String delFileInfos = params.get("delFileInfos").toString();
		//增加文件操作
		JSONArray addFiles = JSONArray.fromObject(addFileInfos);
		Map<String, Object> fileInfo = new HashMap<String, Object>();
		for (int i = 0; i < addFiles.size(); i++) {
			fileInfo = addFiles.getJSONObject(i);
			fileInfo.put("app_id", null);
			fileInfo.put("remark", null);
			fileInfo.put("record_id", recordId);
			fileInfo.put("supplier_id", supplierId);
			addAccessApplicationAttched(fileInfo);
		}
		//删除文件操作
		JSONArray delFiles = JSONArray.fromObject(delFileInfos);
		for (int i = 0; i < delFiles.size(); i++) {
			Integer fileId = delFiles.getInt(i);
			fileInfo.put("id", fileId);
			delAccessApplicationAttched(fileInfo);
		}
		//更新文件名
		String fileNameChangeInfos = params.get("fileNameChangeInfos").toString();
		JSONArray fileNames = JSONArray.fromObject(fileNameChangeInfos);
		for (int i = 0; i < fileNames.size(); i++) {
			updateAccessApplicationAttchedName(fileNames.getJSONObject(i));
		}
	}
}
