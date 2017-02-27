package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfContractAttachmentMapper;
import platform.contract.model.PfContractAttachment;


@Service
public class PfContractAttachmentService {
	@Autowired
	private PfContractAttachmentMapper mapper;


	public List<PfContractAttachment> getContractAttachmentList(Map<String,Object> params) {
		return mapper.getPfContractAttachmentList(params);
	}
	public void addContractAttachment(PfContractAttachment[] arr) {
		for(PfContractAttachment obj: arr) {
			mapper.addPfContractAttachment(obj);
		}
	}
	public void updateContractAttachment(PfContractAttachment[] arr) {
		for(PfContractAttachment obj: arr) {
			mapper.updatePfContractAttachment(obj);
		}
	}
	public void deleteContractAttachment(PfContractAttachment[] arr) {
		for(PfContractAttachment obj: arr) {
			mapper.deletePfContractAttachment(obj);
		}
	}
}
