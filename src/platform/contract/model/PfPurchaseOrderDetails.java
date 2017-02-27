package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfPurchaseOrderDetails implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			order_detail_id;
	private int			pur_order_id;
	private String			product_name;
	private String			product_size;
	private double			unit_price;
	private int			number;
	private String			unit;
	private double			money;
	private Date			delivery_date;
	private int			delivery_num;
	private int			no_delivery_num;
	private int			Storage_num;
	private String			htmx;
	private String			product_artno;
	private String			remark;
    
	public int getNo_delivery_num() {
		return no_delivery_num;
	}
	public void setNo_delivery_num(int no_delivery_num) {
		this.no_delivery_num = no_delivery_num;
	}
	public int getDelivery_num() {
		return delivery_num;
	}
	public void setDelivery_num(int delivery_num) {
		this.delivery_num = delivery_num;
	}
	public String getRemark() {
		if(remark==null){
			return "";
		}
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getProduct_name() {
		if(product_name==null){
			return "";
		}
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getProduct_size() {
		return product_size;
	}
	public void setProduct_size(String product_size) {
		this.product_size = product_size;
	}
	public double getUnit_price() {
		return unit_price;
	}
	public void setUnit_price(double unit_price) {
		this.unit_price = unit_price;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getUnit() {
		if(unit==null){
			return "";
		}
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public double getMoney() {
		return money;
	}
	public void setMoney(double money) {
		this.money = money;
	}
	public Date getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(Date delivery_date) {
		this.delivery_date = delivery_date;
	}
	public int getBe_inspected_num() {
		return delivery_num;
	}
	public void setBe_inspected_num(int delivery_num) {
		this.delivery_num = delivery_num;
	}
	public int getBe_entered_num() {
		return no_delivery_num;
	}
	public void setBe_entered_num(int no_delivery_num) {
		this.no_delivery_num = no_delivery_num;
	}
	public int getStorage_num() {
		return Storage_num;
	}
	public void setStorage_num(int Storage_num) {
		this.Storage_num = Storage_num;
	}
	public String getHtmx() {
		if(htmx==null){
			return "";
		}
		return htmx;
	}
	public void setHtmx(String htmx) {
		this.htmx = htmx;
	}
	public String getProduct_artno() {
		if(product_artno==null){
			return "";
		}
		return product_artno;
	}
	public void setProduct_artno(String product_artno) {
		this.product_artno = product_artno;
	}
}
