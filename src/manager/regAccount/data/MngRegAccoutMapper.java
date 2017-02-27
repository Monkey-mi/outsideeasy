package manager.regAccount.data;

import java.util.List;
import java.util.Map;

import manager.regAccount.model.MngCompanyInfo;
import manager.regAccount.model.MngOrganization;
import manager.regAccount.model.MngRegAccout;
import manager.regAccount.model.MngSysRole;
import manager.regAccount.model.MngdSupplierFiles;
import manager.supplier.model.SupplierFile;


public interface MngRegAccoutMapper {
	public List<MngRegAccout> getMngRegAccoutList(Map<String,Object> params);
	public void addMngRegAccout(Map<String,Object> params);
	public void updateMngRegAccout(MngRegAccout obj);
	public void deleteMngRegAccout(MngRegAccout obj);
	public void updateMngRegAccoutForID(Map<String,Object> params);
	public List<MngdSupplierFiles> getRegaccountForSupplier(Map<String,Object> params);
	public List<SupplierFile> getRegForCompany(Map<String,Object> params);
	public List<MngSysRole> getRolelist(Map<String,Object> params);
	public List<MngSysRole> getSubRolelist(Map<String,Object> params);
	public List<MngOrganization> getOrganizelist(Map<String,Object> params);
	public void addOrganization(MngOrganization params);
	public Integer getOrganizeCount(Map<String,Object> params);
	public void deleteSubRole(Map<String,Object> params);
	public void addSubaccountRole(Map<String,Object> params);
	public List<MngCompanyInfo> getMngCompanyInfoList(Map<String,Object> params);
	public int checkRegName(Map<String,Object> params);
}
