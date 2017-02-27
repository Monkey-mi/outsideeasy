package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOrderAgreementFileMapper;
import platform.contract.model.PfOrderAgreementFile;


@Service
public class PfOrderAgreementFileService {
	@Autowired
	private PfOrderAgreementFileMapper mapper;


	public List<PfOrderAgreementFile> getOrderAgreementFileList(Map<String,Object> params) {
		return mapper.getPfOrderAgreementFileList(params);
	}
	public void addOrderAgreementFile(PfOrderAgreementFile obj) {
			mapper.addPfOrderAgreementFile(obj);
	}
	public void updateOrderAgreementFile(PfOrderAgreementFile[] arr) {
		for(PfOrderAgreementFile obj: arr) {
			mapper.updatePfOrderAgreementFile(obj);
		}
	}
	public void deleteOrderAgreementFile(PfOrderAgreementFile[] arr) {
		for(PfOrderAgreementFile obj: arr) {
			mapper.deletePfOrderAgreementFile(obj);
		}
	}
}
