package usercenter.purchaseManage.supplierManager.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.org.apache.commons.collections.CollectionUtils;

import common.user.model.LoginAccount;

import usercenter.purchaseManage.supplierManager.data.SupplierCheckfactoryInformMapper;
import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryInform;
import usercenter.purchaseManage.supplierManager.model.WaitNotifySupplier;
import usercenter.supplierFiles.model.SupplierFiles;
import usercenter.supplierFiles.service.SupplierFilesService;
import util.SessionUtil;


@Service
public class SupplierCheckfactoryInformService {
	@Autowired
	private SupplierFilesService supplierFileService;
	@Autowired
	private SupplierCheckfactoryInformMapper mapper;


	public List<SupplierCheckfactoryInform> getSupplierCheckfactoryInformList(Map<String,Object> params) {
		return mapper.getSupplierCheckfactoryInformList(params);
	}
	public void addSupplierCheckfactoryInform(SupplierCheckfactoryInform[] arr) {
		for(SupplierCheckfactoryInform obj: arr) {
			mapper.addSupplierCheckfactoryInform(obj);
		}
	}
	public void updateSupplierCheckfactoryInform(SupplierCheckfactoryInform[] arr) {
		for(SupplierCheckfactoryInform obj: arr) {
			mapper.updateSupplierCheckfactoryInform(obj);
		}
	}
	public void deleteSupplierCheckfactoryInform(SupplierCheckfactoryInform[] arr) {
		for(SupplierCheckfactoryInform obj: arr) {
			mapper.deleteSupplierCheckfactoryInform(obj);
		}
	}
	
	/**
	 * @Description: 获取免检供应商
	 * SupplierCheckfactoryInformService
	 * getExemptCheckSupplier
	 * @param params
	 * @return List<SupplierFiles>
	 * @author mishengliang
	 * 2016-8-22 下午4:41:38
	 */
	public List<SupplierFiles> getExemptCheckSupplier(Map<String, Object> params,Map<String, Object> respMap){
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
		return supplierFileService.getExemptCheckSupplier(params,respMap);
	}
	
	/**
	 * @Description: 获取待通知供应商
	 * SupplierCheckfactoryInformService
	 * getWaitNotifySuppliers
	 * @param params
	 * @return List<WaitNotifySupplier>
	 * @author mishengliang
	 * 2016-8-23 下午2:30:14
	 */
	public List<WaitNotifySupplier> getWaitNotifySuppliers(Map<String, Object> params,Map<String, Object> respMap){
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
    	
    	//主账号线下验厂
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type() == 0){//主账号
			params.put("regId", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type() == 1){//子账号
			params.put("saId", loginAccount.getLogin_id());
		}
		
		params.put("beforeDate", 15);//提前15天提醒
		params.put("limit", limit);
		params.put("start", start);
		params.put("provinceCodes", provinceCodes);
		params.put("cityCodes", cityCodes);
		Integer waitNotiSupplierTotal = mapper.getWaitNotifySuppliersTotal(params);
		respMap.put("waitNotiSupplierTotal", waitNotiSupplierTotal);
		
		return mapper.getWaitNotifySuppliers(params);
	}
	
	/**
	 * @Description: 获取已通知供应商
	 * SupplierCheckfactoryInformService
	 * getNotifiedSuppliers
	 * @param params
	 * @return List<SupplierCheckfactoryInform>
	 * @author mishengliang
	 * 2016-8-23 下午3:56:54
	 */
	public List<SupplierCheckfactoryInform> getNotifiedSuppliers(Map<String, Object> params,Map<String, Object> respMap){
		Integer companyId = Integer.parseInt(params.get("companyId").toString());
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
		params.put("companyId", companyId);
		params.put("provinceCodes", provinceCodes);
		params.put("cityCodes", cityCodes);
		Integer notifiedSupplierTotal = mapper.getNotifiedSuppliersTotal(params);
		respMap.put("notifiedSupplierTotal", notifiedSupplierTotal);
		
		return mapper.getNotifiedSuppliers(params);
	}
	
	/**
	 * @Description: 取消验厂通知
	 * SupplierCheckfactoryInformService
	 * cancelNotifyToCheckFac
	 * @param params void
	 * @author mishengliang
	 * 2016-8-24 下午3:45:19
	 */
	public void cancelNotifyToCheckFac(Map<String, Object> params){
		BigInteger supplierId = new BigInteger((String)params.get("supplierId"));
		BigInteger[] supplierIds = {supplierId};
		cancelNotifyCommon(supplierIds);
	}
	
	/**
	 * @Description: 批量取消验厂通知操作
	 * SupplierCheckfactoryInformService
	 * batchCancelNotifyToCheckFac
	 * @param params
	 * @author mishengliang
	 * 2016-9-18 上午10:49:03
	 */
	public void batchCancelNotifyToCheckFac(Map<String, Object> params){
		String[] supplierIdss = ((String)params.get("supplierIds")).split(",");
		BigInteger[] supplierIds = new BigInteger[supplierIdss.length];
		for(int i = 0; i < supplierIdss.length; i++){
			supplierIds[i] = new BigInteger(supplierIdss[i]);
		}
		cancelNotifyCommon(supplierIds);
	}
	
	/**
	 * @Description: 公用的取消通知接口
	 * SupplierCheckfactoryInformService
	 * cancelNotifyCommon
	 * @param supplierIds void
	 * @author mishengliang
	 * 2016-9-18 上午10:47:27
	 */
	private void cancelNotifyCommon(BigInteger[] supplierIds){
		Date now = new Date();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer regId = loginAccount.getLogin_id();
		mapper.cancelNotifyToCheckFac(regId,now,supplierIds);
	}
	
	/**
	 * @Description: 设置免检供应商
	 * SupplierCheckfactoryInformService
	 * siteNoCheckSupplierFile
	 * @param params void
	 * @author mishengliang
	 * 2016-8-24 下午4:56:27
	 */
	public void siteNoCheckSupplierFile(Map<String, Object> params){
		BigInteger supplierId = new BigInteger((String)params.get("supplierId"));
		BigInteger[] supplierIds = {supplierId};
		siteNoCheckSupplierFileCommon(supplierIds);
	}
	public void batchSiteNoCheckSupplierFile(Map<String, Object> params){
		String[] supplierIdss = ((String)params.get("supplierIds")).split(",");
		BigInteger[] supplierIds = new BigInteger[supplierIdss.length];
		for(int i = 0; i < supplierIdss.length; i++){
			supplierIds[i] = new BigInteger(supplierIdss[i]);
		}
		siteNoCheckSupplierFileCommon(supplierIds);
	}
	private void siteNoCheckSupplierFileCommon(BigInteger[] supplierIds){
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		String noCheckor = loginAccount.getLogin_name();
		Integer noCheckorId = loginAccount.getLogin_id();
		supplierFileService.siteNoCheckSupplierFile(noCheckorId,noCheckor,supplierIds);
	}
	
	/**
	 * @Description: 批量恢复验厂
	 * SupplierCheckfactoryInformService
	 * regainCheckFac
	 * @param params void
	 * @author mishengliang
	 * 2016-8-24 下午5:40:28
	 */
	public void regainCheckFac(Map<String, Object> params){
		BigInteger supplierId = new BigInteger((String)params.get("supplierId"));
		BigInteger[] supplierIds = {supplierId};
		regainCheckFacCommon(supplierIds);
	}
	public void batchRegainCheckFac(Map<String, Object> params){
		String[] supplierIdss = ((String)params.get("supplierIds")).split(",");
		BigInteger[] supplierIds = new BigInteger[supplierIdss.length];
		for(int i = 0; i < supplierIdss.length; i++){
			supplierIds[i] = new BigInteger(supplierIdss[i]);
		}
		regainCheckFacCommon(supplierIds);
	}
	private void regainCheckFacCommon(BigInteger[] supplierIds){
		supplierFileService.regainCheckFac(supplierIds);
	}
	
	/**
	 * @Description: 通知供应商验厂
	 * SupplierCheckfactoryInformService
	 * notifySupplier
	 * @param checkFacInfoParam void
	 * @author mishengliang
	 * 2016-8-25 上午11:21:32
	 */
	public void notifySupplier(SupplierCheckfactoryInform checkFacInfoParam){
		mapper.notifySupplier(checkFacInfoParam);
	}

	/**
	 * @Description: 更新验厂通知，即上传的通知报告与供应商相关联
	 * SupplierCheckfactoryInformService
	 * updateNotifySupplier
	 * @param params void
	 * @author mishengliang
	 * 2016-8-25 下午1:54:56
	 */
	public void updateNotifySupplier(Map<String, Object> params){
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		params.put("createDt", new Date());
		params.put("updateDt", new Date());
		params.put("status", 0);
		params.put("operatorId", loginAccount.getLogin_id());
		params.put("operatorName", loginAccount.getLogin_name());
		mapper.updateNotifySupplier(params);
	}
	public Integer getNeedCheckFactoryCount(Map<String, Object> params) {
		return mapper.getNeedCheckFactoryCount(params);
	}
}
