package usercenter.company.data;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import usercenter.company.model.UcBankAccount;
import usercenter.company.model.CompanySimpleInfo;
import usercenter.company.model.CompanyExtraInfo;
import usercenter.company.model.Company;


public interface CompanyMapper {
	public List<Company> getSupplierFileList(Map<String,Object> params);
	public void addSupplierFile(Company obj);
	public void updateSupplierFile(Company obj);
	public void deleteSupplierFile(Company obj);
	public Integer getCpynameId(Map<String,Object> params);
	/**
	 * 查找公司的简略信息，搜索展示的第一页信息
	*getCompanySimpleInfo
	*@param TradeClassOrCompanyName 搜索框输入信息
	*@param classString 行业代号集
	*@param addrNum 地址代号
	*@param regionCode 地址代号区域区分
	*@return
	*List<CompanySimpleInfo>
	*
	*2016-3-25上午10:58:49
	*@author mishengliang
	 */
	public List<CompanySimpleInfo> getCompanySimpleInfo(Map<String, Object> params);
	
	/**
	 * 根据companyId获取行业信息
	*getTradeClassByCompanyId
	*@param companyId 公司ID
	*@return
	*String
	*@author mishengliang
	*2016-3-28上午9:53:22
	 */
	public String getTradeClassByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取销售商品条目
	*getSaleItemByCompanyId
	*@param companyId 公司ID
	*@return
	*List<String>
	*@author mishengliang
	*2016-3-28上午9:53:35
	 */
	public List<String> getSaleItemByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取购买商品条目
	*getBuyItemByCompanyId
	*@param companyId 公司ID
	*@return
	*List<String>
	*@author mishengliang
	*2016-3-28上午9:53:40
	 */
	public List<String> getBuyItemByCompanyId(Integer companyId);
 
	/**
	 * 查询公司总数
	*getTotalNum
	*@param addr
	*@param tradeClassOrCompanyName
	*@return
	*Integer
	*@author mishengliang
	*2016-3-28下午8:24:59
	 */
	public Integer getTotalNum(Map<String, Object> params);
	
	/**
	 * 通过公司ID获取公司的基础信息
	*getCompanyBaseInfo
	*@param companyId
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-3-29下午1:58:44
	 */
	public CompanySimpleInfo getCompanyBaseInfo(Integer companyId);
	
	/**
	 * 通过公司ID获取公司的额外信息
	*getCompanyExtraInfo
	*@param companyId
	*@return
	*CompanyExtraInfo
	*@author mishengliang
	*2016-4-5上午11:06:25
	 */
	public CompanyExtraInfo getCompanyExtraInfo(Integer companyId);
	
	/**
	 * 通过公司ID获取银行账户信息
	*getBankAccount
	*@param companyId
	*@return
	*List<BankAccount>
	*@author mishengliang
	*2016-4-5下午4:28:39
	 */
	public List<UcBankAccount> getBankAccount(Integer companyId);
	
	/**
	 * 通过公司ID获取发票抬头
	*getInvoiceTitleNames
	*@param companyId
	*@return
	*List<String>
	*@author mishengliang
	*2016-4-5下午4:30:02
	 */
	public List<String> getInvoiceTitleNames(Integer companyId);
}
