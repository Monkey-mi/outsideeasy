/**    
 * 文件名：PfSupplierMapper.java    
 *    
 * 版本信息：    
 * 日期：2016-4-7    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.data;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import platform.company.model.CompanyInfoVo;
import platform.company.model.PfCompany;
import platform.company.model.PfCompanyExtraInfo;
import platform.company.model.PfCompanySimpleInfo;
import platform.company.model.PfBankAccount;


/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfSupplierMapper    
 * 创建人：mishengliang
 * 创建时间：2016-4-7 下午4:15:02    
 * 修改人：mishengliang    
 * 修改时间：2016-4-7 下午4:15:02    
 * @version     
 *     
 */
public interface PfCompanyMapper {
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
	public List<PfCompanySimpleInfo> getCompanySimpleInfo(Map<String, Object> params);

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
	public PfCompanySimpleInfo getCompanyBaseInfo(Integer companyId);

	/**
	 * @Description: 查看是否属于当前账号的供应商
	 * PfCompanyMapper
	 * getIsSupplier
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-9-22 下午2:04:23
	 */
	public Integer getIsSupplier(Map<String, Object> params);

	/**
	 * 通过公司ID获取公司的额外信息
	 *getCompanyExtraInfo
	 *@param companyId
	 *@return
	 *CompanyExtraInfo
	 *@author mishengliang
	 *2016-4-5上午11:06:25
	 */
	public PfCompanyExtraInfo getCompanyExtraInfo(Integer companyId);

	/**
	 * 根据公司信息查询
	*updateSupplierInfo
	*@param params
	*void
	*@author mishengliang
	*2016-4-14下午1:22:46
	 */
	public void updateSupplierInfo(Map<String, Object> params);
	
	/**
	 * @Description:新增公司信息
	 * PfCompanyMapper
	 * addSupplierInfo
	 * @param params void
	 * @author yukai
	 * 2016-8-4 上午9:04:35
	 */
	public void addSupplierInfo(Map<String, Object> params);
	
	/**
	 * 根据公司ID获取企业信息表中的申请状态
	*getApplyStsByCompanyId
	*@param companyId
	*void
	*@author mishengliang
	*2016-5-19上午10:19:31
	 */
	public Integer getApplyStsByCompanyId(Integer companyId);
	
	/**
	 * 根据申请状态获取所有的供应商名称、id
	 * @author yangliping
	 * 2016年5月20日13:26:47
	 * */
	public List<PfCompanySimpleInfo> getSupplierNameList(Map<String,Object> params);

	public List<CompanyInfoVo> getCompanyListByRegId(Map<String, Object> params);

	public List<PfCompanySimpleInfo> getSupplierByName(
			Map<String, Object> params);

	public PfCompanySimpleInfo getCompanyFromDictionary(
			Map<String, Object> params);
	
	public String getCompanyNameByCompanyId(Map<String,Object> params);
	
	public List<PfCompanySimpleInfo> getCompanyByName(
			Map<String, Object> params);
}
