package usercenter.saleManage.deliveryManage.model;

import java.util.Date;
import java.util.List;


public class DeliveryRegister {
	private int			register_id;
	private String			delivery_number;
	private Date			create_dt;
	private int			creator_id;
	private String			creator_name;
	private int			send_company_id;
	private String			send_cpyname_cn;
	private int			receive_company_id;
	private String			receive_cpyname_cn;
	//额外字段
	private List<DeliveryRegisterDetails> deliveryRegisterDetails;
	private List<DeliveryAttached> deliveryAttacheds;
	
	public int getRegister_id() {
		return register_id;
	}
	public void setRegister_id(int register_id) {
		this.register_id = register_id;
	}
	public String getDelivery_number() {
		return delivery_number;
	}
	public void setDelivery_number(String delivery_number) {
		this.delivery_number = delivery_number;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getCreator_id() {
		return creator_id;
	}
	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}
	public String getCreator_name() {
		return creator_name;
	}
	public void setCreator_name(String creator_name) {
		this.creator_name = creator_name;
	}
	public int getSend_company_id() {
		return send_company_id;
	}
	public void setSend_company_id(int send_company_id) {
		this.send_company_id = send_company_id;
	}
	public String getSend_cpyname_cn() {
		return send_cpyname_cn;
	}
	public void setSend_cpyname_cn(String send_cpyname_cn) {
		this.send_cpyname_cn = send_cpyname_cn;
	}
	public int getReceive_company_id() {
		return receive_company_id;
	}
	public void setReceive_company_id(int receive_company_id) {
		this.receive_company_id = receive_company_id;
	}
	public String getReceive_cpyname_cn() {
		return receive_cpyname_cn;
	}
	public void setReceive_cpyname_cn(String receive_cpyname_cn) {
		this.receive_cpyname_cn = receive_cpyname_cn;
	}
	public List<DeliveryAttached> getDeliveryAttacheds() {
		return deliveryAttacheds;
	}
	public void setDeliveryAttacheds(List<DeliveryAttached> deliveryAttacheds) {
		this.deliveryAttacheds = deliveryAttacheds;
	}
	public List<DeliveryRegisterDetails> getDeliveryRegisterDetails() {
		return deliveryRegisterDetails;
	}
	public void setDeliveryRegisterDetails(
			List<DeliveryRegisterDetails> deliveryRegisterDetails) {
		this.deliveryRegisterDetails = deliveryRegisterDetails;
	}
	
}
