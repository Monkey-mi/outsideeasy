package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderAgreementFile;


public interface PfOrderAgreementFileMapper {
	public List<PfOrderAgreementFile> getPfOrderAgreementFileList(Map<String,Object> params);
	public void addPfOrderAgreementFile(PfOrderAgreementFile obj);
	public void updatePfOrderAgreementFile(PfOrderAgreementFile obj);
	public void deletePfOrderAgreementFile(PfOrderAgreementFile obj);
}
