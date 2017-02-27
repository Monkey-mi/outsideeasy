package com.outsideasy.ws.erp.contract;

import javax.jws.WebService;

/** 
 * @ClassName: SynergyUrgeSyncInter 
 * @Description: 用于po-平台合同交互 (采购追催)
 * @author wuqia
 * @date 2016-8-25  
 * 
 *  
 */
@WebService
public interface SynergyUrgeSyncInter {
	/**描述：获取送货登记附件信息
	 * 参数：json格式的map 
	 * 包含    登记表id register_id
	 * 返回值：String
	 * 2016-8-27*/
	public String getPfOrderDeliveryAttachedList(String jsonmap);
	/**描述：获取送货登记明细信息
	 * 参数：json格式的map 
	 * 包含    登记表id register_id
	 * 返回值：String
	 * 2016-8-27*/
	public String getPfOrderDeliveryRegisterDetailsList(String jsonmap);
	/**描述：刷新送货登记 已取标记
	 * 参数：json格式的map 
	 * 包含    
	 * 返回值：String
	 * 2016-8-27*/
	public String getUpdatePfOrderDeliveryRegisterIsGet(String jsonmap);
	/**描述：获取 送货登记信息
	 * 参数：json格式的map 
	 * 包含   收货公司id receive_company_id 
	 * 返回值：String
	 * 2016-8-27*/
	public String getPfOrderDeliveryRegisterList(String jsonmap);
	/**回刷 质检信息
	 * 参数：json格式的map 
	 * 包含   质检信息  和 明细
	 * 返回值：String
	 * 2016-8-26*/
	public String getAddPfOrderQualitycheck(String jsonmap);
	/**回刷 质检信息明细
	 * 参数：json格式的map 
	 * 包含 
	 * 返回值：String
	 * 2016-8-26*/
	public String getAddPfOrderCheckDetails(String jsonmap);
	/**回刷 订单明相关数量
	 * 参数：json格式的map 
	 * 包含 
	 * 返回值：String
	 * 2016-8-25*/
	public String getUpdatePfOrderDetailSync(String jsonmap);
	/**新增 通知单
	 * 参数：json格式的map 
	 * 包含 
	 * 返回值：String
	 * 2016-8-25*/
	public String getAddPfSynergyUrge(String jsonmap);
	/**获取 通知单
	 * 参数：json格式的map 
	 * 包含 
	 * 返回值：通知单列表
	 * 2016-8-25*/
	public String getPfOrderDeliveryNoticeList(String jsonmap);
	/**获取 通知单
	 * 参数：json格式的map 
	 * 包含 
	 * 返回值：通知单明细列表
	 * 2016-8-25*/
	public String getPfOrderDeliveryNoticedetailsList(String jsonmap);
	/**获取 修改通知单状态
	 * 参数：json格式的map 
	 * 包含 
	 * 返回值：通知单明细列表
	 * 2016-8-25*/
	public String updatePfOrderDeliveryNotice(String jsonmap);
}
