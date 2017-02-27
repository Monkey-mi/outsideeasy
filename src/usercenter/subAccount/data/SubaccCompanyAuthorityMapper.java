package usercenter.subAccount.data;

import java.util.List;
import java.util.Map;

import usercenter.subAccount.model.SubaccCompanyAuthority;


public interface SubaccCompanyAuthorityMapper {
	public List<SubaccCompanyAuthority> getSubaccCompanyAuthorityList(Map<String,Object> params);
	public void addSubaccCompanyAuthority(Map<String,Object> params);
	public void updateSubaccCompanyAuthority(SubaccCompanyAuthority obj);
	public void deleteSubaccCompanyAuthority(SubaccCompanyAuthority obj);
	public List<SubaccCompanyAuthority> getSubaccCompanyAuthority(Map<String,Object> params);
}
