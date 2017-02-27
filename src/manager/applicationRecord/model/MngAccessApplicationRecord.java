package manager.applicationRecord.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 准入申请流水表
 * @author chenlong
 */
public class MngAccessApplicationRecord implements Serializable{
	private static final long serialVersionUID = 3535136363789016294L;
	private int			record_id;//流水表id
	private int			submit_id;//提交人
	private int			receive_id;//接收人
	private Date		create_dt;//创建时间
	private int			access_status;//准入申请状态
	private int	        receive_invite_id;//准入邀请表ID
	private int			h_id;//模板头ID
	/*
	 * 额外字段
	 */
	private String	submit_name;//提交的公司名
	private String	receive_name;//接收公司名
	
	public String getSubmit_name() {
		return submit_name;
	}
	public void setSubmit_name(String submit_name) {
		this.submit_name = submit_name;
	}
	public String getReceive_name() {
		return receive_name;
	}
	public void setReceive_name(String receive_name) {
		this.receive_name = receive_name;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getSubmit_id() {
		return submit_id;
	}
	public void setSubmit_id(int submit_id) {
		this.submit_id = submit_id;
	}
	public int getReceive_id() {
		return receive_id;
	}
	public void setReceive_id(int receive_id) {
		this.receive_id = receive_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getAccess_status() {
		return access_status;
	}
	public void setAccess_status(int access_status) {
		this.access_status = access_status;
	}
	public int getReceive_invite_id() {
		return receive_invite_id;
	}
	public void setReceive_invite_id(int receive_invite_id) {
		this.receive_invite_id = receive_invite_id;
	}
	public int getH_id() {
		return h_id;
	}
	public void setH_id(int h_id) {
		this.h_id = h_id;
	}

	
}
