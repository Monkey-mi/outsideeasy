package manager.common.orgunit.data;

import java.util.List;
import java.util.Map;

import manager.common.orgunit.model.OrgUnit;



public interface OrgUnitMapper {
	public List<OrgUnit> getOrgUnitList(Map<String,Object> params);
	public List<OrgUnit> getOrgUnitListByCode(String ou_code);
	public void addOrgUnit(OrgUnit obj);
	public void updateOrgUnit(OrgUnit obj);
	public void deleteOrgUnit(OrgUnit obj);
}
