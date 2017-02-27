package manager.company.service;

import java.util.List;
import java.util.Map;

import manager.company.data.MngCompanyMapper;
import manager.company.model.MngCompany;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MngCompanyService {
	@Autowired
	private MngCompanyMapper mapper;


	public List<MngCompany> getCompanyList(Map<String,Object> params) {
		return mapper.getCompanyList(params);
	}
	public void addCompany(MngCompany company) {
		 mapper.addCompany(company);
	}
	public void updateCompany(MngCompany[] arr) {
		for(MngCompany obj: arr) {
			mapper.updateCompany(obj);
		}
	}
	public void deleteCompany(MngCompany[] arr) {
		for(MngCompany obj: arr) {
			mapper.deleteCompany(obj);
		}
	}
	
	/**
	 * 根据企业名判断是否已经注册
	 *2016-3-9上午10:31:27
	 *getUserCompanyNameCount
	 *return:Integer
	 * mishengliang
	 */
	public Boolean getUserCompanyNameCount(Map<String, Object> params){
		return mapper.getUserCompanyNameCount(params)>0;
	}
	
}
