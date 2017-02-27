package manager.supplier.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.supplier.data.AttchedMapper;
import manager.supplier.model.Attched;
//import manager.supplier.model.FileType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessApplicationAttchedMapper;
import usercenter.saleManage.model.AccessApplicationAttched;

import common.mongodb.service.FileOptService;

//import platform.common.model.PfRegisterAttched;



@Service
public class AttchedService {
	@Autowired
	private AttchedMapper mapper;

	public List<Attched> getAttchedList(Map<String,Object> params) {
		return mapper.getAttchedList(params);
	}
	public List<AccessApplicationAttched> getSupplierFileAttchedList(Map<String,Object> params) {
		return mapper.getSupplierFileAttchedList(params);
	}
	public List<Attched> getAttchedList1(Map<String,Object> params) {
		return mapper.getAttchedList1(params);
	}
	@Transactional
	public void addAttched(Attched[] arr) {
		for(Attched obj: arr) {
			mapper.addAttched(obj);
		}
	}
	@Transactional
	public void updateAttched(Attched[] arr) {
		for(Attched obj: arr) {
			mapper.updateAttched(obj);
		}
	}
	@Transactional
	public void deleteAttched(Attched[] arr) {
		for(Attched obj: arr) {
			mapper.deleteAttched(obj);
		}
	}
	public void deleteAttched1(Attched attched) {
			mapper.deleteAttched(attched);
	}
	public void addAttched1(Map<String,Object> params) {
			mapper.addAttched1(params);
	}
	public void updateAttched1(Map<String,Object> params) {
			mapper.updateAttched1(params);
	}
	public Attched getFilePathByPathAndId(Integer id){
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("id", id);
		List<Attched> list=getAttchedList(params);
		return list.get(0);
	}
/*	public List<FileType> getFileTypeList(Map<String,Object> params) {
		return mapper.getFileTypeList(params);
	}
	
	public void updateAttched1(Attched obj) {
		mapper.updateAttched(obj);
}*/
	/**
	 * @Description:根据companyId删除附件
	 * AttchedService
	 * deleteAttchedByCompanyId
	 * @param params void
	 * @author yukai
	 * 2016-8-30 上午10:14:45
	 */
	public void deleteAttchedByCompanyId(Map<String, Object> params) {
		List<Attched> attcheds=getAttchedList1(params);
		if (attcheds.size()>0) {
			for (Attched attched : attcheds) {
				/*if (attched.getMogodb_id()!=null) {
					String filename = attched.getMogodb_id();		
					fileService.deleteFileByName(filename);
				}*/
				deleteAttched1(attched);
			}
		}
	}
}
