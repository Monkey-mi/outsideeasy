package manager.basicdata.industryClass.service;

import java.util.List;
import java.util.Map;

import manager.basicdata.industryClass.data.IndustryClassMapper;
import manager.basicdata.industryClass.model.IndustryClass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class IndustryClassService {
	@Autowired
	private IndustryClassMapper mapper;


	public List<IndustryClass> getIndustryClassList(Map<String,Object> params) {
		return mapper.getIndustryClassList(params);
	}
	public void addIndustryClass(IndustryClass[] arr) {
		for(IndustryClass obj: arr) {
			mapper.addIndustryClass(obj);
		}
	}
	public void updateIndustryClass(IndustryClass[] arr) {
		for(IndustryClass obj: arr) {
			mapper.updateIndustryClass(obj);
		}
	}
	public void deleteIndustryClass(IndustryClass[] arr) {
		for(IndustryClass obj: arr) {
			mapper.deleteIndustryClass(obj);
		}
	}
}
