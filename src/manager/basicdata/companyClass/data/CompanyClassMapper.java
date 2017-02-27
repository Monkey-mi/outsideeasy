package manager.basicdata.companyClass.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.companyClass.model.CompanyClass;



public interface CompanyClassMapper {
	public List<CompanyClass> getCompanyClassList(Map<String,Object> params);
	public void addCompanyClass(CompanyClass obj);
	public void updateCompanyClass(CompanyClass obj);
	public void deleteCompanyClass(CompanyClass obj);
	
	//根据 上级id和名称，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 上级id和名称，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
	//根据 上级id，获取记录数量
	int getXiajiCount(Map<String,Object> params);
}
