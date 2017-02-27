package manager.common.codegen.service;

import java.util.List;
import java.util.Map;

import manager.common.codegen.data.CgrDetailMapper;
import manager.common.codegen.model.CgrDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class CgrDetailService {
	@Autowired
	private CgrDetailMapper mapper;


	public List<CgrDetail> getCgrDetailList(Map<String,Object> params) {
		return mapper.getCgrDetailList(params);
	}
	public void addCgrDetail(CgrDetail[] arr) {
		for(CgrDetail obj: arr) {
			mapper.addCgrDetail(obj);
		}
	}
	public void updateCgrDetail(CgrDetail[] arr) {
		for(CgrDetail obj: arr) {
			mapper.updateCgrDetail(obj);
		}
	}
	public void deleteCgrDetail(CgrDetail[] arr) {
		for(CgrDetail obj: arr) {
			mapper.deleteCgrDetail(obj);
		}
	}
}
