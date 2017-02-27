package com.outsideasy.ws.erp.contract;

import javax.jws.WebService;

/** 
 * @ClassName: ContractSync 
 * @Description: 用于po-平台合同交互
 * @author wuqia
 * @date 2016-8-22 下午6:18:13 
 * 
 *  
 */
@WebService
public interface ContractSyncInter {
	public String getPurchaseOrderList(String jsonmap);
	/**新增订单
	 * 参数：json格式的map 
	 * 包含 上级节点 node
	 * 返回值：void
	 * 2016-8-24*/
    public String addPfPurchaseOrder(String jsonlist);
    /**新增订单明细
	 * 参数：json格式的map 
	 * 包含 上级节点 node
	 * 返回值：void
	 * 2016-8-24*/
    public String addPfPurchaseOrderDetial(String jsonlist);
    /**新增订单合同文件
	 * 参数：json格式的map 
	 * 包含 上级节点 node
	 * 返回值：void
	 * 2016-8-24*/
     public String addPfPurchaseOrderFile(byte [] buff,String jsonmap) throws Exception;
     /**订单采购要求
 	 * 参数：json格式的map 
 	 * 包含 上级节点 node
 	 * 返回值：void
 	 * 2016-8-26*/
     public void addPfPurchaseAsk(String jsonmap);
     /**新增订单附件
 	 * 参数：byte [] 
 	 * 包含 上级节点 node
 	 * 返回值：void
 	 * 2016-8-27*/
     public String addPfOrderAttched(byte [] buff,String jsonmap) throws Exception;
     /**获取回签合同
 	 * 参数：htbh 
 	 * 包含 上级节点 node
 	 * 返回值：json 格式list
 	 * 2016-8-27*/
     public String getPfPurchaseOrderFile(String jsonmap);
     /**
      * 
     * @Title: getContractStatus
     * @Description: TODO(查询对应合同订单的状态)
     * @param @param jsonmap
     * @param @return    设定文件
     * @return String    返回类型
     * @throws
      */
     public String getContractStatus(String jsonmap);
}



