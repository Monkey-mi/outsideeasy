package manager.templet.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description:准入模板表 
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-7-1
 */
public class MngAccessTemplet implements Serializable {

	private static final long serialVersionUID = 7910846972550727884L;
	private int			templet_id;//模板id
	private int			h_id;//模板头ID
	private int			e_id;//模板元素ID
	private int			is_must;//是否必填项
	private int			order_by;//排序字段
	private int			classify_id;//所属分类
	private String			templet_name;//显示名称
	private int			seize_length;//界面占位比例%
	private Date			create_dt;//创建时间
	private String        e_name;
	private String         classify_name;//分类名称
	
	public String getE_name() {
		return e_name;
	}
	public void setE_name(String e_name) {
		this.e_name = e_name;
	}
	public String getClassify_name() {
		return classify_name;
	}
	public void setClassify_name(String classify_name) {
		this.classify_name = classify_name;
	}
	public int getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(int templet_id) {
		this.templet_id = templet_id;
	}
	public int getH_id() {
		return h_id;
	}
	public void setH_id(int h_id) {
		this.h_id = h_id;
	}
	public int getE_id() {
		return e_id;
	}
	public void setE_id(int e_id) {
		this.e_id = e_id;
	}
	public int getIs_must() {
		return is_must;
	}
	public void setIs_must(int is_must) {
		this.is_must = is_must;
	}
	public int getOrder_by() {
		return order_by;
	}
	public void setOrder_by(int order_by) {
		this.order_by = order_by;
	}
	public int getClassify_id() {
		return classify_id;
	}
	public void setClassify_id(int classify_id) {
		this.classify_id = classify_id;
	}
	public String getTemplet_name() {
		return templet_name;
	}
	public void setTemplet_name(String templet_name) {
		this.templet_name = templet_name;
	}
	public int getSeize_length() {
		return seize_length;
	}
	public void setSeize_length(int seize_length) {
		this.seize_length = seize_length;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
