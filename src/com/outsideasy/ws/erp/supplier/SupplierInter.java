package com.outsideasy.ws.erp.supplier;

import javax.jws.WebService;

@WebService
public interface SupplierInter {
	/**保存 文件到mongodb
	 * 参数：文件字节流  buff  
	 * 其他参数
	 * 返回值：json 格式 
	 * @author wuqia
	 * 2016-8-20
	 * @throws Exception 
	 * */
	public String getSaveFileCommon(byte [] buff,String jsonmap) throws Exception;
	/**获取 验厂报告 附件表
	 * 参数：供应商id supplier_id
	 * 返回值：json 格式 
	 * @author wuqia
	 * 2016-8-20
	 * */
	public String getPfSupplierCheckfactoryReportList(String jsonmap);
	/**获取物料确认 附件表
	 * 参数：供应商id supplier_id
	 * 返回值：json 格式 
	 * @author wuqia
	 * 2016-8-20
	 * */
	public String getPfSupplierMaterialcheckList(String jsonmap);
	/**准入受理功能
	 * 参数：流水id record_id
	 * 	       准入状态 access_status
	 * 	        审核意见 audit_opinion
	 * 	        公司id company_id
	 *     管理账户id login_id
	 * 返回值：json 格式 
	 * @author wuqia
	 * 2016-8-16
	 * */
	public String getPfSupplierAccessChange(String jsonmap);
	/**获取子账户列表
	 * 参数：公司id company_id
	 * 返回值：json 格式 
	 * 2016-8-16*/
	public String getPfSubAccout(String jsonmap);
	/**准入邀请
	 * 参数:供应商名称 companyStr 字符串 以;为分隔符
	 * 提交邀请的供应商id companyId
	 * 管理账户id login_id
	 * 返回值：json 格式 
	 * 2016-8-16*/
	public String getAccessInvite(String jsonmap);
	/**获取材料级别，只有一层
	 * 参数:无
	 * 返回值：json 格式list<Treemodel>
	 * 2016-3-24*/
	public String getMaterialLevelTree(String jsonmap);
	/**获取材料类别书
	 * 参数：json格式的map 
	 * 包含 上级节点 node
	 * 返回值：json 格式list<Treemodel>
	 * 2016-3-24*/
	public String getMaterialClassTree(String jsonmap);
	/**获取准入申请信息
	 * 参数：json格式的map
	 * 有 cpyname_cn 公司名称
	 * record_id 流水id
	 * access_status 申请状态
	 * condition 查询条件
	 * 返回值：json 格式list<SupplierFileOut>
	 * 2016-8-8*/
	public String getAccessApplicationRecord(String jsonmap);
	/**获取供应商列表
	 * 参数：json格式的map
	 * 有 level_id 分层编号
	 * mc_id 材料编号
	 * condition 查询条件
	 * 返回值：json 格式list<SupplierFileOut>
	 * 2016-3-24*/
	public String getSupplierFileOutList(String jsonmap);
	/**修改供应商
	 * 参数：json格式的SupplierFile[]
	 * 返回值：json 格式list<SupplierFileIn>
	 * 2016-3-24*/
	String updateSupplierFileIn(String jsonlist);
	/**获取供应商的产品
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<GoodsOut>
	 *2016-3-28
	 **/
	String getGoodsOutList(String jsonmap);
	/**获取供应商准入申请的产品
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<GoodsOut>
	 *2016-8-16
	 **/
	String getAccGoodsOutList(String jsonmap);
	/**获取供应商的注册附件
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<AttchedOut>
	 *2016-3-28
	 **/
	String getAttchedOutList(String jsonmap);
	/**获取供应商准入申请的注册附件
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<AttchedOut>
	 *2016-8-16
	 **/
	String getAccAttchedOutList(String jsonmap);
	/**获取供应商的主要客户
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<MainCustomerOut>
	 *2016-3-28
	 **/
	String getMainCustomerOutList(String jsonmap);
	/**获取供应商准入申请的主要客户
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<MainCustomerOut>
	 *2016-8-16
	 **/
	String getAccMainCustomerOutList(String jsonmap);
	/**获取供应商的竞争对手
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<CompetitorOut>
	 *2016-3-28
	 **/
	String getCompetitorOutList(String jsonmap);
	/**获取供应商准入申请的竞争对手
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<CompetitorOut>
	 *2016-8-16
	 **/
	String getAccCompetitorOutList(String jsonmap);
	/**获取供应商的主要用料
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<MetarialOut>
	 *2016-3-28
	 **/
	String getMetarialOutList(String jsonmap);
	/**获取供应商准入申请的主要用料
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<MetarialOut>
	 *2016-8-16
	 **/
	String getAccMetarialOutList(String jsonmap);
	/**获取供应商的设备
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<DeviceOut>
	 *2016-3-28
	 **/
	String getDeviceOutList(String jsonmap);
	/**获取供应商准入申请的设备
	 *参数：json格式的map 
	 *record_id 注入流水编号
	 *返回值：json 格式list<DeviceOut>
	 *2016-8-16
	 **/
	String getAccDeviceOutList(String jsonmap);
	/**获取供应商的银行账号
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<BankAccountOut>
	 *2016-3-28
	 **/
	String getBankAccountOutList(String jsonmap);
	/**获取供应商准入申请的银行账号
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<BankAccountOut>
	 *2016-8-16
	 **/
	String getAccBankAccountOutList(String jsonmap);
	/**获取供应商的发票
	 *参数：json格式的map 
	 *company_id 公司编号
	 *返回值：json 格式list<InvoiceTitleOut>
	 *2016-3-28
	 **/
	String getInvoiceTitleOutList(String jsonmap);
	/**获取供应商准入申请的发票
	 *参数：json格式的map 
	 *record_id 公司编号
	 *返回值：json 格式list<InvoiceTitleOut>
	 *2016-8-16
	 **/
	String getAccInvoiceTitleOutList(String jsonmap);
	/**获取文件
	 *参数：String file_path, boolean isimg
	 *
	 *返回值：byte[] 
	 *2016-4-05
	 **/
	byte[] downloadAttched(String file_path, boolean isimg);
	
	/**修改供应商状态位
	 *参数：String file_path, boolean isimg
	 *返回值：String 
	 *2016-5-12
	 **/
	void updateSupplierFileStateByWS(String jsonmap);
	
	/**
	 * 
	* @Title: updateDevicelistByWS
	* @Description: SupplierInter 修改公司设备明细表
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23上午10:06:23
	 */
	void updateDevicelistByWS(String jsonmap);
	public String addDevicelistByWS(String jsonmap);
	void deleteDevicelistByWS(String jsonmap);
	/**
	 * 
	* @Title: updateMetarialByWS
	* @Description: SupplierInter 修改原材料及品牌
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午2:33:11
	 */
	void updateMetarialByWS(String jsonmap);
	public String addMetarialByWS(String jsonmap);
	void deleteMetarialByWS(String jsonmap);
	/**
	 * 
	* @Title: updateAppGoodsByWS
	* @Description: SupplierInter 修改公司产品及品牌
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午2:47:37
	 */
	void updateAppGoodsByWS(String jsonmap);
	public String addAppGoodsByWS(String jsonmap);
	void deleteAppGoodsByWS(String jsonmap);
	/**
	 * 
	* @Title: updateMainCustomerByWS
	* @Description: SupplierInter 修改公司主要客户
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午3:03:39
	 */
	void updateMainCustomerByWS(String jsonmap);
	public String addMainCustomerByWS(String jsonmap);
	void deleteMainCustomerByWS(String jsonmap);
	/**
	 * 
	* @Title: updateAppCompetitorByWS
	* @Description: SupplierInter 修改公司主要竞争对手
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午3:11:23
	 */
	void updateAppCompetitorByWS(String jsonmap);
	public String addAppCompetitorByWS(String jsonmap);
	void deleteAppCompetitorByWS(String jsonmap);
	/**
	 * 
	* @Title: updateAppBankAccountByWS
	* @Description: SupplierInter 修改公司银行账号
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午3:20:13
	 */
	void updateAppBankAccountByWS(String jsonmap);
	public String addAppBankAccountByWS(String jsonmap);
	void deleteAppBankAccountByWS(String jsonmap);
	/**
	 * 
	* @Title: updateAppBankAccountByWS
	* @Description: SupplierInter
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午3:32:31
	 */
	void updateAppInvoiceTitleByWS(String jsonmap);
	public String addAppInvoiceTitleByWS(String jsonmap);
	void deleteAppInvoiceTitleByWS(String jsonmap);
	
	/**
	 * 
	* @Title: updateAccessApplicationInfoByWS
	* @Description: SupplierInter 修改 t_access_application_info表
	* @returnType String    
	* @author 舒飞
	* @date 2016-8-23下午4:36:31
	 */
	void updateAccessApplicationInfoByWS(String jsonmap);
}
