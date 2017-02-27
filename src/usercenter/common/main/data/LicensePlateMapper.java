package usercenter.common.main.data;


import java.util.List;
import java.util.Map;

import usercenter.common.main.model.LicensePlate;


public interface LicensePlateMapper {
	public List<LicensePlate> getLicensePlateList(Map<String,Object> params);
	public void addLicensePlate(Map<String,Object> params);
	public Integer regLicensePlate(Map<String,Object> params);
	public void updateLicensePlate(Map<String,Object> params);
	public void deleteLicensePlate(LicensePlate obj);
	public List<LicensePlate> getLicensePlateForSelect(Map<String,Object> params);
}
