package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfContractAttachment;


public interface PfContractAttachmentMapper {
	public List<PfContractAttachment> getPfContractAttachmentList(Map<String,Object> params);
	public void addPfContractAttachment(PfContractAttachment obj);
	public void updatePfContractAttachment(PfContractAttachment obj);
	public void deletePfContractAttachment(PfContractAttachment obj);
}
