package manager.applicationRecord.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 准入资料表
 * @author chenlong
 */
public class MngAccessApplicationInfo implements Serializable{
	private static final long serialVersionUID = 5783714021725603208L;
	private int			info_id;//主键
	private int			templet_id;//模板ID
	private int			record_id;//准入流水表ID
	private String		content;//内容
	private Date		create_dt;//创建时间
	private int         e_id;
	/**
	 * 额外字段
	 */
	private String      templet_name;//模板的名称
	private String      classify_name;//分类名称
	

	
	public int getE_id() {
		return e_id;
	}
	public void setE_id(int e_id) {
		this.e_id = e_id;
	}
	public String getClassify_name() {
		return classify_name;
	}
	public void setClassify_name(String classify_name) {
		this.classify_name = classify_name;
	}
	public String getTemplet_name() {
		return templet_name;
	}
	public void setTemplet_name(String templet_name) {
		this.templet_name = templet_name;
	}
	public int getInfo_id() {
		return info_id;
	}
	public void setInfo_id(int info_id) {
		this.info_id = info_id;
	}
	public int getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(int templet_id) {
		this.templet_id = templet_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
}
