package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderAgreementFileMapper;
import manager.orderManager.model.MngOrderAgreementFile;


@Service
public class MngOrderAgreementFileService {
	@Autowired
	private MngOrderAgreementFileMapper mapper;


	public List<MngOrderAgreementFile> getMngOrderAgreementFileList(Map<String,Object> params) {
		return mapper.getMngOrderAgreementFileList(params);
	}
	public void addMngOrderAgreementFile(MngOrderAgreementFile[] arr) {
		for(MngOrderAgreementFile obj: arr) {
			mapper.addMngOrderAgreementFile(obj);
		}
	}
	public void updateMngOrderAgreementFile(MngOrderAgreementFile[] arr) {
		for(MngOrderAgreementFile obj: arr) {
			mapper.updateMngOrderAgreementFile(obj);
		}
	}
	public void deleteMngOrderAgreementFile(MngOrderAgreementFile[] arr) {
		for(MngOrderAgreementFile obj: arr) {
			mapper.deleteMngOrderAgreementFile(obj);
		}
	}
}
