package manager.common.main.model;

import java.io.Serializable;
import java.util.Date;

import manager.common.Model;


public class SRMLog extends Model implements Serializable {
	
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 951051455756752787L;
	private int logid;
	private Date logdtm;//记录时间
	private String clientip;//客户端IP
	private String login_id;//登陆ID
	private int   mod_id ;//模块ID
	private String mod_name ;//模块名
	private String s_name ;//系统名
	private String s_path ;//方法路径
	private String s_method ;//方法名
	private String s_data;//参数列表
	private String request_html;//当前平台发请求的页面
	private String error_message;//异常信息
	private Integer log_type;//日志类型 0：错误日志；1：操作日志；
	
	public String getError_message() {
		return error_message;
	}
	public void setError_message(String error_message) {
		this.error_message = error_message;
	}
	public String getRequest_html() {
		return request_html;
	}
	public void setRequest_html(String request_html) {
		this.request_html = request_html;
	}
	public Date getLogdtm() {
		return logdtm;
	}
	public void setLogdtm(Date logdtm) {
		this.logdtm = logdtm;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public String getS_path() {
		return s_path;
	}
	public void setS_path(String s_path) {
		this.s_path = s_path;
	}
	public String getS_method() {
		return s_method;
	}
	public void setS_method(String s_method) {
		this.s_method = s_method;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setLogid(int logid) {
		this.logid = logid;
	}
	public int getLogid() {
		return logid;
	}
	public void setClientip(String clientip) {
		this.clientip = clientip;
	}
	public String getClientip() {
		return clientip;
	}
	public void setS_data(String s_data) {
		this.s_data = s_data;
	}
	public String getS_data() {
		return s_data;
	}
	public void setMod_name(String mod_name) {
		this.mod_name = mod_name;
	}
	public String getMod_name() {
		return mod_name;
	}
	public void setS_name(String s_name) {
		this.s_name = s_name;
	}
	public String getS_name() {
		return s_name;
	}
	public Integer getLog_type() {
		return log_type;
	}
	public void setLog_type(Integer log_type) {
		this.log_type = log_type;
	}
	@Override
	public String toString() {
		return "SRMLog [logid=" + logid + ", logdtm=" + logdtm + ", clientip="
				+ clientip + ", login_id=" + login_id + ", mod_id=" + mod_id
				+ ", mod_name=" + mod_name + ", s_name=" + s_name + ", s_path="
				+ s_path + ", s_method=" + s_method + ", s_data=" + s_data
				+ ", request_html=" + request_html + ", error_message="
				+ error_message + ", log_type=" + log_type + "]";
	}
}
