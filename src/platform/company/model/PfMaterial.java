/**    
 * 文件名：PfMaterial.java    
 *    
 * 版本信息：    
 * 日期：2016-4-7    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

/**    
 * 原材料类    
 * 项目名称：outsideeasy    
 * 类名称：PfMaterial    
 * 创建人：mishengliang    
 * 创建时间：2016-4-7 下午6:14:44    
 * 修改人：mishengliang    
 * 修改时间：2016-4-7 下午6:14:44    
 * @version     
 *     
 */
public class PfMaterial {
	private Integer material_id;
	private String material_name;//原材料名称
	private String material_brand;//原材料品牌
	
	public Integer getMaterial_id() {
		return material_id;
	}
	public void setMaterial_id(Integer material_id) {
		this.material_id = material_id;
	}
	public String getMaterial_name() {
		return material_name;
	}
	public void setMaterial_name(String material_name) {
		this.material_name = material_name;
	}
	public String getMaterial_brand() {
		return material_brand;
	}
	public void setMaterial_brand(String material_brand) {
		this.material_brand = material_brand;
	}
	@Override
	public String toString() {
		return "PfMaterial [material_id=" + material_id + ", material_name="
				+ material_name + ", material_brand=" + material_brand + "]";
	}
	
}
