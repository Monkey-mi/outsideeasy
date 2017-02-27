package manager.orderManager.model;

import java.io.Serializable;
import java.util.Date;

public class MngOrderDeliveryNoticedetails implements Serializable{
	private static final long serialVersionUID = 7856269273473016154L;
	private int			details_id;
	private int			delivery_notice_id;
	private int			order_detail_id;
	private Date			notice_delivery_time;
	private Date			confirm_delivery_time;
	private int			number;
	private int			pur_order_id;
	private String			delivery_address;
	private String			delivery_notice_bh;
	private int			notice_status;
	private Date			notice_dt;
	private String			product_name;
	private String			product_artno;
	private String			product_size;
	private String			unit;
	
	private String      htmx;             
	private int   is_edit  ;            
	private int   htbh  ;              
	private int   htxh  ;               
	private String  clhh  ;              
	private int  is_modified;  
	private String order_bh;
	  
	
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getHtmx() {
		return htmx;
	}
	public void setHtmx(String htmx) {
		this.htmx = htmx;
	}
	public int getIs_edit() {
		return is_edit;
	}
	public void setIs_edit(int is_edit) {
		this.is_edit = is_edit;
	}

	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public int getIs_modified() {
		return is_modified;
	}
	public void setIs_modified(int is_modified) {
		this.is_modified = is_modified;
	}
	public int getDetails_id() {
		return details_id;
	}
	public void setDetails_id(int details_id) {
		this.details_id = details_id;
	}
	public int getDelivery_notice_id() {
		return delivery_notice_id;
	}
	public void setDelivery_notice_id(int delivery_notice_id) {
		this.delivery_notice_id = delivery_notice_id;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public Date getNotice_delivery_time() {
		return notice_delivery_time;
	}
	public void setNotice_delivery_time(Date notice_delivery_time) {
		this.notice_delivery_time = notice_delivery_time;
	}
	public Date getConfirm_delivery_time() {
		return confirm_delivery_time;
	}
	public void setConfirm_delivery_time(Date confirm_delivery_time) {
		this.confirm_delivery_time = confirm_delivery_time;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getDelivery_address() {
		return delivery_address;
	}
	public void setDelivery_address(String delivery_address) {
		this.delivery_address = delivery_address;
	}
	public String getDelivery_notice_bh() {
		return delivery_notice_bh;
	}
	public void setDelivery_notice_bh(String delivery_notice_bh) {
		this.delivery_notice_bh = delivery_notice_bh;
	}
	public int getNotice_status() {
		return notice_status;
	}
	public void setNotice_status(int notice_status) {
		this.notice_status = notice_status;
	}
	public Date getNotice_dt() {
		return notice_dt;
	}
	public void setNotice_dt(Date notice_dt) {
		this.notice_dt = notice_dt;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getProduct_artno() {
		return product_artno;
	}
	public void setProduct_artno(String product_artno) {
		this.product_artno = product_artno;
	}
	public String getProduct_size() {
		return product_size;
	}
	public void setProduct_size(String product_size) {
		this.product_size = product_size;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
}
