package usercenter.supplierFiles.service;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctc.wstx.util.DataUtil;

import usercenter.saleManage.model.CheckfactoryReport;
import usercenter.saleManage.service.CheckfactoryReportService;
import usercenter.supplierFiles.data.SupplierFactoryCycleInfoMapper;
import usercenter.supplierFiles.model.CheckFactoryCycleUnit;
import usercenter.supplierFiles.model.SupplierFactoryCycleInfo;
import util.DataTrans;


@Service
public class SupplierFactoryCycleInfoService {
	@Autowired
	private SupplierFactoryCycleInfoMapper mapper;
	@Autowired
	private CheckfactoryReportService checkFacRepService;
	@Autowired
	private CheckFactoryCycleService checkFacCycService;


	public List<SupplierFactoryCycleInfo> getSupplierFactoryCycleInfoList(Map<String,Object> params) {
		return mapper.getSupplierFactoryCycleInfoList(params);
	}
	
	/**
	 * @Description: 增加供应商验厂周期记录
	 * SupplierFactoryCycleInfoService
	 * addSupplierFactoryCycleInfo
	 * @param checkfacInfo void
	 * @author mishengliang
	 * 2016-8-16 下午1:39:12
	 */
	public void addSupplierFactoryCycleInfo(SupplierFactoryCycleInfo checkfacInfo) {
			mapper.addSupplierFactoryCycleInfo(checkfacInfo);
	}
	
	/**
	 * @Description: 更新验厂周期 
	 * SupplierFactoryCycleInfoService
	 * updateSupplierFactoryCycleInfo
	 * @param params void
	 * @author mishengliang
	 * 2016-8-11 下午1:39:50
	 */
	public void updateSupplierFactoryCycleInfo(Map<String, Object> params) {
			mapper.updateSupplierFactoryCycleInfo(params);
	}
	
	public void deleteSupplierFactoryCycleInfo(SupplierFactoryCycleInfo[] arr) {
		for(SupplierFactoryCycleInfo obj: arr) {
			mapper.deleteSupplierFactoryCycleInfo(obj);
		}
	}
	
	/**
	 * @Description: 不存在 添加 ；存在 更新一条记录
	 * SupplierFactoryCycleInfoService
	 * addOrUpdate
	 * @param params void
	 * @author mishengliang
	 * 2016-8-16 上午11:24:41
	 */
	public void addOrUpdate(Map<String, Object> params){
		Integer supplierId = DataTrans.transToIntegerFromString((String)params.get("supplierId"));
		Integer facCycId = DataTrans.transToIntegerFromString((String)params.get("checkFacId")); 
		addOrUpdateCommon(params, supplierId, facCycId);
	}
	
	/**
	 * @Description: 批量设置周期
	 * SupplierFactoryCycleInfoService
	 * addOrUpdateBatch
	 * @param params void
	 * @author mishengliang
	 * 2016-9-27 下午1:48:13
	 */
	public void addOrUpdateBatch(Map<String, Object> params){
		Integer facCycId = DataTrans.transToIntegerFromString((String)params.get("checkFacId")); 
		String[] supplierIdss = ((String)params.get("supplierIds")).split(",");
		Integer[] supplierIds = new Integer[supplierIdss.length];
		for(int i = 0; i < supplierIdss.length; i++){
			supplierIds[i] = new Integer(supplierIdss[i]);
			addOrUpdateCommon(params,supplierIds[i],facCycId);
		}
	}

	/**
	 * @Description: 
	 * SupplierFactoryCycleInfoService
	 * addOrUpdateCommon
	 * @param params
	 * @param supplierId
	 * @param facCycId void
	 * @author mishengliang
	 * 2016-9-27 上午11:35:04
	 */
	private void addOrUpdateCommon(Map<String, Object> params,Integer supplierId, Integer facCycId) {
		//查找此供应商的上一次验厂报告时间
		params.put("supplier_id", supplierId);
		params.put("limit_num", 1);
		CheckfactoryReport report = checkFacRepService.getCheckfactoryReportList(params).get(0);
		Date checkFacDate = report.getCheck_factory_dt();
		//查找此验厂周期的对应的天数
		params.put("factoryCycleId", facCycId);
		CheckFactoryCycleUnit unit = checkFacCycService.getCheckFactoryCycleById(params);
		Integer cycDays = unit.getCycle_value();
		//计算下次验厂时间
		Calendar calender = Calendar.getInstance();
		calender.setTime(checkFacDate);
		calender.add(Calendar.DATE, cycDays);
		Date nextCheckDt = calender.getTime();
		
		Boolean isExist = mapper.getSupplierIdExist(params) > 0 ? true : false;
		if(isExist){//存在供应商验厂周期记录
			params.put("nextCheckDt", nextCheckDt);
			updateSupplierFactoryCycleInfo(params);//更新记录
		}else{//不存在档案记录
			SupplierFactoryCycleInfo checkfacInfo = new SupplierFactoryCycleInfo();
			checkfacInfo.setFactory_cycle_id(facCycId);
			checkfacInfo.setSupplier_id(supplierId);
			checkfacInfo.setNext_check_dt(nextCheckDt);
			
			addSupplierFactoryCycleInfo(checkfacInfo);//增加记录
		}
	}
	
}
