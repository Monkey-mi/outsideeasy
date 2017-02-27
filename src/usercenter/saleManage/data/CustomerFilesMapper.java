package usercenter.saleManage.data;

import java.util.Date;
import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.CustomerFiles;


public interface CustomerFilesMapper {
	public List<CustomerFiles> getCustomerFilesList(Map<String,Object> params);
	public void addCustomerFiles(CustomerFiles obj);
	public void updateCustomerFiles(Map<String,Object> params);
	public void deleteCustomerFiles(CustomerFiles obj);
	/**
	 * @Description:获取供应商在当前登陆账号下的所有客户
	 * CustomerFilesMapper
	 * getCustomerFilesListByRegId
	 * @param params
	 * @return List<CustomerFiles>
	 * @author yukai
	 * 2016-8-2 上午10:16:59
	 */
	public List<CustomerFiles> getCustomerFilesListByRegId(Map<String,Object> params);
	/**
	 * @Description:检查供应商档案是否存在
	 * CustomerFilesMapper
	 * checkFilesExit
	 * @param params
	 * @return List<CustomerFiles>
	 * @author yukai
	 * 2016-8-16 下午2:52:26
	 */
	public CustomerFiles checkFilesExit(Map<String,Object> params);
	public List<CustomerFiles> getLastThreeCustomer(Map<String, Object> params);
	public Date getPassTime(Map<String, Object> params);
}
