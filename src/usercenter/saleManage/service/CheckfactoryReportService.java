package usercenter.saleManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.model.RegAccout;

import usercenter.saleManage.data.CheckfactoryReportMapper;
import usercenter.saleManage.model.CheckfactoryReport;
import util.SessionUtil;


@Service
public class CheckfactoryReportService {
	@Autowired
	private CheckfactoryReportMapper mapper;


	public List<CheckfactoryReport> getCheckfactoryReportList(Map<String,Object> params) {
		return mapper.getCheckfactoryReportList(params);
	}
	public void addCheckfactoryReport(CheckfactoryReport[] arr) {
		for(CheckfactoryReport obj: arr) {
			mapper.addCheckfactoryReport(obj);
		}
	}
	public void updateCheckfactoryReport(CheckfactoryReport[] arr) {
		for(CheckfactoryReport obj: arr) {
			mapper.updateCheckfactoryReport(obj);
		}
	}
	public void deleteCheckfactoryReport(CheckfactoryReport[] arr) {
		for(CheckfactoryReport obj: arr) {
			mapper.deleteCheckfactoryReport(obj);
		}
	}
	
	public List<CheckfactoryReport> getAllCheckfactoryReportList(Map<String,Object> params) {
		return mapper.getAllCheckfactoryReportList(params);
	}
	
	/**
	* 获取拥有者的供应商列表信息
	*getCheckfactoryReportAndcheckCycleList
	*@param params
	*@return
	*List<CheckfactoryReport>
	*@author mishengliang
	*2016-7-28下午5:17:52
	*/
	public List<Map<String, Object>> getCheckfactoryReportAndcheckCycleList(Map<String,Object> params) {
		return mapper.getCheckfactoryReportAndcheckCycleList(params);
	}
	/**
	 * @Description:获取最新三条验厂报告信息
	 * CheckfactoryReportService
	 * getLastThreeCheckFactory
	 * @param params
	 * @return List<CheckfactoryReport>
	 * @author yukai
	 * 2016-8-30 下午5:46:34
	 */
	public List<CheckfactoryReport> getLastThreeCheckFactory(
			Map<String, Object> params) {
		return mapper.getLastThreeCheckFactory(params);
	}
	/**
	 * @Description:检查是否有验厂报告
	 * CheckfactoryReportService
	 * hasCheckFactory
	 * @param params
	 * @return boolean
	 * @author yukai
	 * 2016-9-1 上午9:44:23
	 */
	public boolean hasCheckFactory(Map<String, Object> params) {
		boolean flag;
		if (mapper.hasCheckFactory(params)==0) {
			flag=false;
		}else {
			flag=true;
		}
		return flag;
	}
}
