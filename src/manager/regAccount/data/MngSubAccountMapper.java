package manager.regAccount.data;

import java.util.List;
import java.util.Map;

import manager.regAccount.model.MngSubAccount;
import manager.regAccount.model.MngdSupplierFiles;
import manager.supplier.model.SupplierFile;


public interface MngSubAccountMapper {
	public List<MngSubAccount> getMngSubAccountList(Map<String,Object> params);
	public void addMngSubAccount(Map<String,Object> params);
	public void updateMngSubAccount(Map<String,Object> params);
	public void deleteMngSubAccount(MngSubAccount obj);
	public List<MngdSupplierFiles> getSubaccountForSupplier(Map<String,Object> params);
	public List<SupplierFile> getSubForCompany(Map<String,Object> params);
	public Integer  checkSubName(Map<String,Object> params);
	public void updateMngSubAccoutForID(Map<String,Object> params);
	public void updateMngSubAccoutForReset(Map<String,Object> params);
	public void updateSubForSupplier(Map<String,Object> params);
	public List<MngdSupplierFiles> getAllSubaccountForSupplier(Map<String,Object> params);
	public void addSubaccountSupplier(Map<String,Object> params);
	public List<MngdSupplierFiles> getAllSubForCompany(Map<String,Object> params);
	public void updateSubForCompany(Map<String,Object> params);
	public void addSubaccountCompany(Map<String,Object> params);
	public int checkEmpNo(Map<String, Object> params);
}
