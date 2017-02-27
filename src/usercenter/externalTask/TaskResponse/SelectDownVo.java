package usercenter.externalTask.TaskResponse;

import java.io.Serializable;
import java.util.List;

import usercenter.common.main.model.DriverMobilePhone;
import usercenter.common.main.model.LicensePlate;
/**
 * 返回下拉选项
 * @author lenovo
 */
public class SelectDownVo implements Serializable{
	
private static final long serialVersionUID = 1178104441445478883L;

private List<DriverMobilePhone> lDriverMobilePhones;
private List<LicensePlate> licensePlates;

public List<DriverMobilePhone> getlDriverMobilePhones() {
	return lDriverMobilePhones;
}
public void setlDriverMobilePhones(List<DriverMobilePhone> lDriverMobilePhones) {
	this.lDriverMobilePhones = lDriverMobilePhones;
}
public List<LicensePlate> getLicensePlates() {
	return licensePlates;
}
public void setLicensePlates(List<LicensePlate> licensePlates) {
	this.licensePlates = licensePlates;
}

}
