package manager.basicdata.sFilter.model;

import java.io.Serializable;

import manager.common.Model;

public class SFilter extends Model implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = -2502983814538777845L;
	private int			filter_id;//主键id
	private String			filter_url;//过滤路径
	private String			remark;//备注

	
	public int getFilter_id() {
		return filter_id;
	}
	public void setFilter_id(int filter_id) {
		this.filter_id = filter_id;
	}
	public String getFilter_url() {
		return filter_url;
	}
	public void setFilter_url(String filter_url) {
		this.filter_url = filter_url;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
