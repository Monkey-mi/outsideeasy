package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.CheckFactoryCycleUnit;


public interface CheckFactoryCycleMapper {
	
	/**
	 * @Description: 获取验厂周期基础信息
	 * CheckFactoryCycleMapper
	 * getCheckFactoryCycleList
	 * @return List<CheckFactoryCycle>
	 * @author mishengliang
	 * 2016-8-15 下午7:49:20
	 */
	public List<CheckFactoryCycleUnit> getCheckFactoryCycleList();
	
	/**
	 * @Description: 获取验厂周期信息
	 * CheckFactoryCycleMapper
	 * getCheckFactoryCycleById
	 * @param params
	 * @return CheckFactoryCycleUnit
	 * @author mishengliang
	 * 2016-8-16 下午2:09:41
	 */
	public CheckFactoryCycleUnit getCheckFactoryCycleById(Map<String, Object> params);
	
	public void addCheckFactoryCycle(CheckFactoryCycleUnit obj);
	public void updateCheckFactoryCycle(CheckFactoryCycleUnit obj);
	public void deleteCheckFactoryCycle(CheckFactoryCycleUnit obj);
}
