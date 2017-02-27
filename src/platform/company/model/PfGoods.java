/**    
 * 文件名：PfGoods.java    
 *    
 * 版本信息：    
 * 日期：2016-4-7    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

/**    
 * 公司产品类    
 * 项目名称：outsideeasy    
 * 类名称：PfGoods    
 * 创建人：mishengliang    
 * 创建时间：2016-4-7 下午6:07:57    
 * 修改人：mishengliang
 * 修改时间：2016-4-7 下午6:07:57    
 * @version     
 *     
 */
public class PfGoods {
	private Integer goods_id;
	private String goods_name;//产品名
	private String goods_brand;//产品品牌
	
	public Integer getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(Integer goods_id) {
		this.goods_id = goods_id;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	public String getGoods_brand() {
		return goods_brand;
	}
	public void setGoods_brand(String goods_brand) {
		this.goods_brand = goods_brand;
	}
	@Override
	public String toString() {
		return "PfGoods [goods_id=" + goods_id + ", goods_name=" + goods_name
				+ ", goods_brand=" + goods_brand + "]";
	}
	
}
