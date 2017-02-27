/**    
 * 文件名：PfCompetitor.java    
 *    
 * 版本信息：    
 * 日期：2016-4-7    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.model;

/**    
 * 主要竞争对手对象    
 * 项目名称：outsideeasy    
 * 类名称：PfCompetitor    
 * 创建人：mishengliang    
 * 创建时间：2016-4-7 下午7:17:14    
 * 修改人：mishengliang    
 * 修改时间：2016-4-7 下午7:17:14    
 * @version     
 *     
 */
public class PfCompetitor {
	private Integer competitor_id;
	private String competitor_name;//竞争对手名称

	public Integer getCompetitor_id() {
		return competitor_id;
	}
	public void setCompetitor_id(Integer competitor_id) {
		this.competitor_id = competitor_id;
	}
	public String getCompetitor_name() {
		return competitor_name;
	}
	public void setCompetitor_name(String competitor_name) {
		this.competitor_name = competitor_name;
	}
	@Override
	public String toString() {
		return "PfCompetitor [competitor_id=" + competitor_id
				+ ", competitor_name=" + competitor_name + "]";
	}

}
