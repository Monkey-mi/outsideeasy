package common.email.model;

import java.util.Date;

public class AppSendEmailinfo {
	private int			autoId;
	private String			UUID;
	private Date			sendTime;
	private String			email;
	private int 			is_valid;//是否已经被打开连接注册的有效标志 1.已使用  0.未使用
	private String          ip_address;

	public int getIsValid() {
		return is_valid;
	}
	public void setIsValid(int isValid) {
		this.is_valid = isValid;
	}
	public int getAutoId() {
		return autoId;
	}
	public void setAutoId(int autoId) {
		this.autoId = autoId;
	}
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String UUID) {
		this.UUID = UUID;
	}
	public Date getSendTime() {
		return sendTime;
	}
	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getIp_address() {
		return ip_address;
	}
	public void setIp_address(String ip_address) {
		this.ip_address = ip_address;
	}
	
	@Override
	public String toString() {
		return "AppSendEmailinfo [autoId=" + autoId + ", UUID=" + UUID
				+ ", sendTime=" + sendTime + ", email=" + email + ", is_valid="
				+ is_valid + ", ip_address=" + ip_address + "]";
	}
}
