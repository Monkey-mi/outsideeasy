package manager.taskManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 任务单文件列表
 * @author chenlong
 *
 */
public class MngAppTaskFile implements Serializable{
	
	private static final long serialVersionUID = 9015703124314179640L;
	private int			tf_id;//任务文件列表主键
	private int			t_id;//任务列表主键
	private String		file_name;//文件名称
	private int			file_type;//文件类型
	private String		object_id;//mongodb_id
	private int			order_no;//顺序号
	private Date        file_time;//文件创建时间
	private String      remark;//备注
	private String      suffix_name;//文件名后缀
	private String      view_no;//mongodb中存视频的序列
	private int	        record_id;//物流记录主键
	private String      operator_name;//操作员的名称
	private int	        is_delete;//逻辑删除

	public String getView_no() {
		return view_no;
	}
	public void setView_no(String view_no) {
		this.view_no = view_no;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getOperator_name() {
		return operator_name;
	}
	public void setOperator_name(String operator_name) {
		this.operator_name = operator_name;
	}
	public int getIs_delete() {
		return is_delete;
	}
	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}
	public String getSuffix_name() {
		return suffix_name;
	}
	public void setSuffix_name(String suffix_name) {
		this.suffix_name = suffix_name;
	}
	public Date getFile_time() {
		return file_time;
	}
	public void setFile_time(Date file_time) {
		this.file_time = file_time;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getTf_id() {
		return tf_id;
	}
	public void setTf_id(int tf_id) {
		this.tf_id = tf_id;
	}
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public int getFile_type() {
		return file_type;
	}
	public void setFile_type(int file_type) {
		this.file_type = file_type;
	}
	public String getObject_id() {
		return object_id;
	}
	public void setObject_id(String object_id) {
		this.object_id = object_id;
	}
	public int getOrder_no() {
		return order_no;
	}
	public void setOrder_no(int order_no) {
		this.order_no = order_no;
	}
}
