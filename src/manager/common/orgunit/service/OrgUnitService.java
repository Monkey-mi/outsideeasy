package manager.common.orgunit.service;

import java.util.List;
import java.util.Map;

import manager.common.orgunit.data.OrgUnitMapper;
import manager.common.orgunit.model.OrgUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class OrgUnitService {
	@Autowired
	private OrgUnitMapper mapper;


	public List<OrgUnit> getOrgUnitList(Map<String,Object> params) {
		return mapper.getOrgUnitList(params);
	}
	public void addOrgUnit(OrgUnit[] arr) {
		for(OrgUnit obj: arr) {
			mapper.addOrgUnit(obj);
		}
	}
	public void updateOrgUnit(OrgUnit[] arr) {
		for(OrgUnit obj: arr) {
			mapper.updateOrgUnit(obj);
		}
	}
	public void deleteOrgUnit(OrgUnit[] arr) {
		for(OrgUnit obj: arr) {
			mapper.deleteOrgUnit(obj);
		}
	}
}
