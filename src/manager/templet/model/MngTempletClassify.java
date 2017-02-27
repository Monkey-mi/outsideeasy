package manager.templet.model;

import java.io.Serializable;
import java.util.Date;
/**
 * @Description: 所属分类表
 * @param 
 * @return 
 * @author chenlong
 * @date 2016-7-1
 */
public class MngTempletClassify implements Serializable{

	private static final long serialVersionUID = -6680667713095263690L;
	private int			classify_id;//主键ID
	private String			classify_name;//分类名称
	private int			h_id;//模板头ID
	private Date			create_dt;//创建时间
	private String	      table_name;


	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getClassify_id() {
		return classify_id;
	}
	public void setClassify_id(int classify_id) {
		this.classify_id = classify_id;
	}
	public String getClassify_name() {
		return classify_name;
	}
	public void setClassify_name(String classify_name) {
		this.classify_name = classify_name;
	}
	public int getH_id() {
		return h_id;
	}
	public void setH_id(int h_id) {
		this.h_id = h_id;
	}
}
