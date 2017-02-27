package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOrderRequirementMapper;
import platform.contract.model.PfOrderRequirement;


@Service
public class PfOrderRequirementService {
	@Autowired
	private PfOrderRequirementMapper mapper;


	public List<PfOrderRequirement> getPfOrderRequirementList(Map<String,Object> params) {
		return mapper.getPfOrderRequirementList(params);
	}
	public void addPfOrderRequirement(Map<String,Object> params) {
			mapper.addPfOrderRequirement(params);
	}
	public void updatePfOrderRequirement(PfOrderRequirement[] arr) {
		for(PfOrderRequirement obj: arr) {
			mapper.updatePfOrderRequirement(obj);
		}
	}
	public void deleteOrderRequirement(PfOrderRequirement[] arr) {
		for(PfOrderRequirement obj: arr) {
			mapper.deletePfOrderRequirement(obj);
		}
	}
}
