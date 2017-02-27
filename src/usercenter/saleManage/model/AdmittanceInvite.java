package usercenter.saleManage.model;

import java.io.Serializable;
import java.util.Date;

public class AdmittanceInvite implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8751795511313531872L;
	private int			invite_id;
	private int			sender_id;
	
	private int			accepter_id;
	private int			supplier_id;
	private int			is_fast;
	private Integer			invite_status;
	private Date			create_dt;
	private Date			accept_dt;
	
	//额外字段
	private int   	   record_id;
	private int        access_status;//0:已发送；1：已接受；
	private int        receive_invite_id;
	private int        h_id;
	private String      sender_name;
	private String     accepter_name;
	
	public Date getAccept_dt() {
		return accept_dt;
	}
	public void setAccept_dt(Date accept_dt) {
		this.accept_dt = accept_dt;
	}
	public int getInvite_id() {
		return invite_id;
	}
	public void setInvite_id(int invite_id) {
		this.invite_id = invite_id;
	}
	public int getSender_id() {
		return sender_id;
	}
	public void setSender_id(int sender_id) {
		this.sender_id = sender_id;
	}
	public int getAccepter_id() {
		return accepter_id;
	}
	public void setAccepter_id(int accepter_id) {
		this.accepter_id = accepter_id;
	}
	public Integer getInvite_status() {
		return invite_status;
	}
	public void setInvite_status(Integer invite_status) {
		this.invite_status = invite_status;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getSender_name() {
		return sender_name;
	}
	public void setSender_name(String sender_name) {
		this.sender_name = sender_name;
	}
	public int getAccess_status() {
		return access_status;
	}
	public void setAccess_status(int access_status) {
		this.access_status = access_status;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getH_id() {
		return h_id;
	}
	public void setH_id(int h_id) {
		this.h_id = h_id;
	}
	public int getReceive_invite_id() {
		return receive_invite_id;
	}
	public void setReceive_invite_id(int receive_invite_id) {
		this.receive_invite_id = receive_invite_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public int getIs_fast() {
		return is_fast;
	}
	public void setIs_fast(int is_fast) {
		this.is_fast = is_fast;
	}
	public String getAccepter_name() {
		return accepter_name;
	}
	public void setAccepter_name(String accepter_name) {
		this.accepter_name = accepter_name;
	}
	@Override
	public String toString() {
		return "AdmittanceInvite [invite_id=" + invite_id + ", sender_id="
				+ sender_id + ", accepter_id=" + accepter_id + ", supplier_id="
				+ supplier_id + ", is_fast=" + is_fast + ", invite_status="
				+ invite_status + ", create_dt=" + create_dt + ", accept_dt="
				+ accept_dt + ", record_id=" + record_id + ", access_status="
				+ access_status + ", receive_invite_id=" + receive_invite_id
				+ ", h_id=" + h_id + ", sender_name=" + sender_name
				+ ", accepter_name=" + accepter_name + "]";
	}
}
