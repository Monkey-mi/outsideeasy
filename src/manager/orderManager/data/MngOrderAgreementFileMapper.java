package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderAgreementFile;


public interface MngOrderAgreementFileMapper {
	public List<MngOrderAgreementFile> getMngOrderAgreementFileList(Map<String,Object> params);
	public void addMngOrderAgreementFile(MngOrderAgreementFile obj);
	public void updateMngOrderAgreementFile(MngOrderAgreementFile obj);
	public void deleteMngOrderAgreementFile(MngOrderAgreementFile obj);
}
