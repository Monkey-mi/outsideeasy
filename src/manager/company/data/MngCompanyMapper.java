package manager.company.data;

import java.util.List;
import java.util.Map;

import manager.company.model.MngCompany;



public interface MngCompanyMapper {
	public List<MngCompany> getCompanyList(Map<String,Object> params);
	public void addCompany(MngCompany obj);
	public void updateCompany(MngCompany obj);
	public void deleteCompany(MngCompany obj);
	
	/**
	 * 获取注册企业名，以判断是否企业是否注册过
	 *2016-3-9上午10:27:49
	 *getUserCompanyNameCount
	 *return:Integer
	 * mishengliang
	 */
	public Integer getUserCompanyNameCount(Map<String, Object> params);
}
