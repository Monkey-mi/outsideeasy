package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderRequirement;


public interface PfOrderRequirementMapper {
	public List<PfOrderRequirement> getPfOrderRequirementList(Map<String,Object> params);
	public void addPfOrderRequirement(Map<String,Object> params);
	public void updatePfOrderRequirement(PfOrderRequirement obj);
	public void deletePfOrderRequirement(PfOrderRequirement obj);
}
