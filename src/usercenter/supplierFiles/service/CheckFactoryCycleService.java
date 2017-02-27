package usercenter.supplierFiles.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.supplierFiles.data.CheckFactoryCycleMapper;
import usercenter.supplierFiles.model.CheckFactoryCycleUnit;


@Service
public class CheckFactoryCycleService {
	@Autowired
	private CheckFactoryCycleMapper mapper;

	/**
	 * @Description: 获取验厂周期基础信息
	 * CheckFactoryCycleService
	 * getCheckFactoryCycleList
	 * @return List<CheckFactoryCycle>
	 * @author mishengliang
	 * 2016-8-15 下午7:48:48
	 */
	public List<CheckFactoryCycleUnit> getCheckFactoryCycleList() {
		return mapper.getCheckFactoryCycleList();
	}
	
	/**
	 * @Description: 获取验厂周期信息
	 * CheckFactoryCycleService
	 * getCheckFactoryCycleById
	 * @param params
	 * @return CheckFactoryCycleUnit
	 * @author mishengliang
	 * 2016-8-16 下午2:11:11
	 */
	public CheckFactoryCycleUnit getCheckFactoryCycleById(Map<String, Object> params) {
		return mapper.getCheckFactoryCycleById(params);
	}
	
	public void addCheckFactoryCycle(CheckFactoryCycleUnit[] arr) {
		for(CheckFactoryCycleUnit obj: arr) {
			mapper.addCheckFactoryCycle(obj);
		}
	}
	public void updateCheckFactoryCycle(CheckFactoryCycleUnit[] arr) {
		for(CheckFactoryCycleUnit obj: arr) {
			mapper.updateCheckFactoryCycle(obj);
		}
	}
	public void deleteCheckFactoryCycle(CheckFactoryCycleUnit[] arr) {
		for(CheckFactoryCycleUnit obj: arr) {
			mapper.deleteCheckFactoryCycle(obj);
		}
	}
}
