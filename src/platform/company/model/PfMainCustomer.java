/**    
 * 文件名：PfMainCustomer.java    
 *    
 * 版本信息：    
 * 日期：2016-4-7    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

/**    
 * 主要客户信息    
 * 项目名称：outsideeasy    
 * 类名称：PfMainCustomer    
 * 创建人：mishengliang    
 * 创建时间：2016-4-7 下午7:13:42    
 * 修改人：mishengliang
 * 修改时间：2016-4-7 下午7:13:42    
 * @version     
 *     
 */
public class PfMainCustomer {
	private Integer customer_id;
	private String customer_name;//主要客户名称
	
	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	@Override
	public String toString() {
		return "PfMainCustomer [customer_id=" + customer_id
				+ ", customer_name=" + customer_name + "]";
	}

}
