/**    
 * 文件名：PfSupplierExtraInfoMapper.java    
 *    
 * 版本信息：    
 * 日期：2016-4-7    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.data;

import java.util.List;

import platform.company.model.PfBankAccount;
import platform.company.model.PfCompetitor;
import platform.company.model.PfDevice;
import platform.company.model.PfGoods;
import platform.company.model.PfInvoiceTitle;
import platform.company.model.PfMainCustomer;
import platform.company.model.PfMaterial;


/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfSupplierExtraInfoMapper    
 * 创建人：mishengliang    
 * 创建时间：2016-4-7 下午4:32:56    
 * 修改人：mishengliang    
 * 修改时间：2016-4-7 下午4:32:56    
 * @version     
 *     
 */
public interface PfCompanyExtraInfoMapper {

	/**
	 * 通过公司ID获取银行账户信息
	 *getBankAccount
	 *@param companyId
	 *@return
	 *List<BankAccount>
	 *@author mishengliang
	 *2016-4-5下午4:28:39
	 */
	public List<PfBankAccount> getBankAccount(Integer companyId);

	/**
	 * 通过公司ID获取发票抬头
	 *getInvoiceTitleNames
	 *@param companyId
	 *@return
	 *List<String>
	 *@author mishengliang
	 *2016-4-5下午4:30:02
	 */
	public List<PfInvoiceTitle> getInvoiceTitleNames(Integer companyId);

	/**
	 * 根据companyId获取销售商品条目，只包含商品名称
	 *getSaleItemByCompanyId
	 *@param companyId 公司ID
	 *@return
	 *List<String>
	 *@author mishengliang
	 *2016-3-28上午9:53:35
	 */
	public List<String> getSaleItemByCompanyId(Integer companyId);

	/**
	 * 根据companyId获取购买材料条目，只包含材料名称
	 *getBuyItemByCompanyId
	 *@param companyId 公司ID
	 *@return
	 *List<String>
	 *@author mishengliang
	 *2016-3-28上午9:53:40
	 */
	public List<String> getBuyItemByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取销售商品对象，包含商品名称和品牌
	*getSaleModelByCompanyId
	*@param companyId
	*@return
	*List<PfGoods>
	*@author mishengliang
	*2016-4-7下午6:20:26
	 */
	public List<PfGoods> getSaleModelByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取购买材料的对象,，包含材料名称和品牌
	*getBuyModelByCompanyId
	*@param companyId
	*@return
	*List<PfMaterial>
	*@author mishengliang
	*2016-4-7下午6:21:51
	 */
	public List<PfMaterial> getBuyModelByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取主要客户信息；返回为主要客户对象，主要客户对象扩展字段，更有利于维护
	*getMainCustomerByCompanyId
	*@param companyId
	*@return
	*List<PfMainCustomer>
	*@author mishengliang
	*2016-4-7下午7:16:17
	 */
	public List<PfMainCustomer> getMainCustomerByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取竞争对手信息;返回为竞争对手对象，竞争对手对象扩展字段，更有利于维护
	*getCompetitorByCompanyId
	*@param companyId
	*@return
	*List<PfCompetitor>
	*@author mishengliang
	*2016-4-7下午7:21:04
	 */
	public List<PfCompetitor> getCompetitorByCompanyId(Integer companyId);
	
	/**
	 * 根据companyId获取设备信息;
	*getDeviceByCompanyId
	*@param companyId
	*@return
	*List<E>
	*@author mishengliang
	*2016-4-8上午10:10:37
	 */
	public List<PfDevice> getDeviceByCompanyId(Integer companyId);
}
