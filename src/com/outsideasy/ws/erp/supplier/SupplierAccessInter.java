package com.outsideasy.ws.erp.supplier;

import javax.jws.WebService;

@WebService
public interface SupplierAccessInter {
	/**获取历史审核记录
	 * 参数：json格式的map 
	 * 包含 company_id 公司编号
	 * 返回值：json 格式CXFResponse
	 * 2016-5-19*/
	public String getPfAuthcationInfoList(String jsonmap);
	/**供应商变更  
	 *参数：json格式的map
	 *返回值：String 
	 *2016-5-17
	 **/
	String updateSupplierChangeStateByWS(String jsonmap);
	/**获取文件
	 *参数：String file_path
	 *返回值：byte[] 
	 *2016-5-16
	 **/
	byte[] retrieveFileOne(String objID);
	/**获取厂商信息变更表
	 * 参数：json格式的map
	 * 返回值：json 格式CXFResponse
	 * 2016-5-16*/
	public String getPfAuthcationUpdateList(String jsonmap);
	/**获取评估项
	 * 参数：json格式的map
	 * f_id 父节点编号
	 * item_id 项的编号
	 * node 节点
	 * 返回值：json 格式CXFResponse
	 * 2016-3-24*/
	public String getPfAccessBasetableList(String jsonmap);
	/**获取评估项树
	 * 参数：json格式的map 
	 * 包含 上级节点 node
	 * 返回值：json 格式list<Treemodel>
	 * 2016-3-24*/
	public String getEvaluateItemTree(String jsonmap);
	/**获取供应商评估分数
	 * 参数：json格式的map 
	 * 包含 company_id 公司编号
	 * item_id 评估项编号
	 * item_fid 上级编号
	 * 返回值：json 格式CXFResponse
	 * 2016-3-24*/
	public String getPfSupplierAccessScoreList(String jsonmap);
	/**新增供应商评估分数
	 * 参数：json格式的list<PfSupplierAccessScore>
	 * 返回值：json 格式list<PfSupplierAccessScore>
	 * 2016-3-24*/
	public String addPfSupplierAccessScore(String jsonlist);
	/**修改供应商评估分数
	 * 参数：json格式的list<PfSupplierAccessScore>
	 * 返回值：json 格式list<PfSupplierAccessScore>
	 * 2016-3-24*/
	public String updatePfSupplierAccessScore(String jsonlist);
	/**删除供应商评估分数
	 * 参数：json格式的list<PfSupplierAccessScore>
	 * 返回值：无
	 * 2016-3-24*/
	public void deletePfSupplierAccessScore(String jsonlist);
	/**删除供应商评估分数根据厂商id
	 * 参数：json格式的map
	 * 返回值：无
	 * 2016-4-06*/
	public void deletePfSupplierAccessScoreForCompanyId(String jsonlist);
	/**获取供应商评估得分明细
	 * 参数：json格式的map
	 * 包含 company_id 公司编号
	 * item_fid 上级编号
	 * 返回值：json 格式CXFResponse
	 * 2016-3-24*/
	public String getPfSupplierAccessScoreDetailsList(String jsonmap);
	/**获取供应商评估得分汇总
	 * 参数：json格式的map
	 * 包含 company_id 公司编号
	 * 返回值：json 格式 CXFResponse
	 * 2016-3-24*/
	public String getPfSupplierAccessScoreSummaryList(String jsonmap);
}
