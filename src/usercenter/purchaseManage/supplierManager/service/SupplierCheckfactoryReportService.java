package usercenter.purchaseManage.supplierManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.purchaseManage.supplierManager.data.SupplierCheckfactoryReportMapper;
import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryReport;
import util.SessionUtil;

import common.user.model.LoginAccount;


@Service
public class SupplierCheckfactoryReportService {
	@Autowired
	private SupplierCheckfactoryReportMapper mapper;


	public List<SupplierCheckfactoryReport> getSupplierCheckfactoryReportList(Map<String,Object> params) {
		return mapper.getSupplierCheckfactoryReportList(params);
	}
	public void addSupplierCheckfactoryReport(SupplierCheckfactoryReport[] arr) {
		for(SupplierCheckfactoryReport obj: arr) {
			mapper.addSupplierCheckfactoryReport(obj);
		}
	}
	public void updateSupplierCheckfactoryReport(SupplierCheckfactoryReport[] arr) {
		for(SupplierCheckfactoryReport obj: arr) {
			mapper.updateSupplierCheckfactoryReport(obj);
		}
	}
	public void deleteSupplierCheckfactoryReport(SupplierCheckfactoryReport[] arr) {
		for(SupplierCheckfactoryReport obj: arr) {
			mapper.deleteSupplierCheckfactoryReport(obj);
		}
	}
	
	/**
	 * @Description: 通过账号获取验厂报告列表
	 * SupplierCheckfactoryReportService
	 * getSupplierCheckfactoryReportListByAccount
	 * @return List<SupplierCheckfactoryReport>
	 * @author mishengliang
	 * 2016-8-22 下午3:10:51
	 */
	public List<SupplierCheckfactoryReport> getSupplierCheckfactoryReportListByAccount(Map<String, Object> params,Map<String, Object> respMap){
		int limit =params.get("limit")!=null?Integer.parseInt(params.get("limit").toString()):0;
    	int page =params.get("page")!=null?Integer.parseInt(params.get("page").toString()):0;
    	int start = limit*page;
    	
		String[] provinceCodess = ((String)params.get("provinceCodes")).split(",");
		String[] cityCodess = ((String)params.get("cityCodes")).split(",");
		Integer[] provinceCodes = new Integer[provinceCodess.length];
		Integer[] cityCodes = new Integer[cityCodess.length];
		if(provinceCodess[0] != ""){
			for(int i = 0; i < provinceCodes.length; i++){
				provinceCodes[i] = new Integer(provinceCodess[i]);
			}
		}else{
			provinceCodes = null;
		}
		if(cityCodess[0] != ""){
			for(int i = 0; i < cityCodes.length; i++){
				cityCodes[i] = new Integer(cityCodess[i]);
			}
		}else{
			cityCodes = null;
		}
    	
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type() == 0){//主账号
			params.put("regId", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type() == 1){//子账号
			params.put("saId", loginAccount.getLogin_id());
		}
		params.put("limit", limit);
		params.put("start", start);
		params.put("provinceCodes", provinceCodes);
		params.put("cityCodes", cityCodes);
		Integer reportTotal = mapper.getSupplierCheckfactoryReportListByAccountTotal(params);
		respMap.put("reportTotal", reportTotal);
		return mapper.getSupplierCheckfactoryReportListByAccount(params);
	}
}
