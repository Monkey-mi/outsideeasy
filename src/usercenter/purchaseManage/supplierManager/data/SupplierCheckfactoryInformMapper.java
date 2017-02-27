package usercenter.purchaseManage.supplierManager.data;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryInform;
import usercenter.purchaseManage.supplierManager.model.WaitNotifySupplier;


public interface SupplierCheckfactoryInformMapper {
	public List<SupplierCheckfactoryInform> getSupplierCheckfactoryInformList(Map<String,Object> params);
	public void addSupplierCheckfactoryInform(SupplierCheckfactoryInform obj);
	public void updateSupplierCheckfactoryInform(SupplierCheckfactoryInform obj);
	public void deleteSupplierCheckfactoryInform(SupplierCheckfactoryInform obj);
	
	/**
	 * @Description: 获取待通知供应商
	 * SupplierCheckfactoryInformMapper
	 * getWaitNotifySuppliers
	 * @param params
	 * @return List<WaitNotifySupplier>
	 * @author mishengliang
	 * 2016-8-23 下午2:28:16
	 */
	public List<WaitNotifySupplier> getWaitNotifySuppliers(Map<String, Object> params);
	
	/**
	 * @Description: 获取待通知供应商总数
	 * SupplierCheckfactoryInformMapper
	 * getWaitNotifySuppliersTotal
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-8-24 上午11:05:52
	 */
	public Integer getWaitNotifySuppliersTotal(Map<String, Object> params);
	
	/**
	 * @Description: 获取已通知供应商
	 * SupplierCheckfactoryInformMapper
	 * getNotifySuppliers
	 * @param params
	 * @return List<SupplierCheckfactoryInform>
	 * @author mishengliang
	 * 2016-8-23 下午3:53:33
	 */
	public List<SupplierCheckfactoryInform> getNotifiedSuppliers(Map<String, Object> params);
	
	/**
	 * @Description: 获取已通知供应商总数
	 * SupplierCheckfactoryInformMapper
	 * getNotifiedSuppliersTotal
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-8-24 上午11:01:09
	 */
	public Integer getNotifiedSuppliersTotal(Map<String, Object> params);
	
	/**
	 * @Description: 取消验厂通知
	 * SupplierCheckfactoryInformMapper
	 * cancelNotifyToCheckFac
	 * @param params
	 * @author mishengliang
	 * 2016-8-24 下午3:42:44
	 */
	public void cancelNotifyToCheckFac(@Param("regId")Integer regId,@Param("updateDt")Date updateDt,@Param("supplierIds")BigInteger[] supplierIds);
	
	/**
	 * @Description: 
	 * SupplierCheckfactoryInformMapper
	 * notifySupplier
	 * @param checkFacInfo void
	 * @author mishengliang
	 * 2016-8-25 上午11:22:35
	 */
	public void notifySupplier(SupplierCheckfactoryInform checkFacInfo);
	
	/**
	 * @Description: 更新验厂通知，即上传的通知报告与供应商相关联
	 * SupplierCheckfactoryInformMapper
	 * updateNotifySupplier
	 * @param params void
	 * @author mishengliang
	 * 2016-8-25 下午1:55:05
	 */
	public void updateNotifySupplier(Map<String, Object> params);
	public Integer getNeedCheckFactoryCount(Map<String, Object> params);
}
