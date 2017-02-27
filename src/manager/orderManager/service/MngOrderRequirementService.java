package manager.orderManager.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderRequirementMapper;
import manager.orderManager.model.MngOrderRequirement;


@Service
public class MngOrderRequirementService {
	@Autowired
	private MngOrderRequirementMapper mapper;


	public MngOrderRequirement getOrderRequirementList(Map<String,Object> params) {
		return mapper.getOrderRequirementList(params);
	}
	public void addOrderRequirement(MngOrderRequirement[] arr) {
		for(MngOrderRequirement obj: arr) {
			mapper.addOrderRequirement(obj);
		}
	}
	public void updateOrderRequirement(MngOrderRequirement[] arr) {
		for(MngOrderRequirement obj: arr) {
			mapper.updateOrderRequirement(obj);
		}
	}
	public void deleteOrderRequirement(MngOrderRequirement[] arr) {
		for(MngOrderRequirement obj: arr) {
			mapper.deleteOrderRequirement(obj);
		}
	}
}
