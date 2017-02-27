package common.shortmessage.model;

import java.util.Date;

public class AppSendShortmessage {
	private int			id;
	private int			module_id;
	private String			receive_phones;
	private String			message;
	private int			send_type;
	private int			result;
	private String			description;
	private String			faillist;
	private String			task_id;
	private Date			create_dt;
	private Date			send_time;
	private String			ip;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getModule_id() {
		return module_id;
	}
	public void setModule_id(int module_id) {
		this.module_id = module_id;
	}
	public String getReceive_phones() {
		return receive_phones;
	}
	public void setReceive_phones(String receive_phones) {
		this.receive_phones = receive_phones;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getSend_type() {
		return send_type;
	}
	public void setSend_type(int send_type) {
		this.send_type = send_type;
	}
	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getFaillist() {
		return faillist;
	}
	public void setFaillist(String faillist) {
		this.faillist = faillist;
	}
	public String getTask_id() {
		return task_id;
	}
	public void setTask_id(String task_id) {
		this.task_id = task_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public Date getSend_time() {
		return send_time;
	}
	public void setSend_time(Date send_time) {
		this.send_time = send_time;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	@Override
	public String toString() {
		return "AppSendShortmessage [id=" + id + ", module_id=" + module_id
				+ ", receive_phones=" + receive_phones + ", message=" + message
				+ ", send_type=" + send_type + ", result=" + result
				+ ", description=" + description + ", faillist=" + faillist
				+ ", task_id=" + task_id + ", create_dt=" + create_dt
				+ ", send_time=" + send_time + ", ip=" + ip + "]";
	}

}
