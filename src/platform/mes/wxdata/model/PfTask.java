package platform.mes.wxdata.model;

import java.io.Serializable;
import java.util.Date;

public class PfTask implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7478254816069449597L;
	private int			t_id;
	private String			rwdh;
	private String			product_name;
	private String			serial_no;
	private int			state;
	private int			send_company;
	private int			receive_company;
	private double			total_qty;
	private double			produced_qty;
	private double			confirmed_qty;
	private Date			plan_start;
	private Date			plan_complete;
	private String			qc_type;
	private String			scdh;
	private Date czsj;
	private String producers_company_name;
	
	public int getT_id() {
		return t_id;
	}
	public void setT_id(int t_id) {
		this.t_id = t_id;
	}
	public String getRwdh() {
		return rwdh;
	}
	public void setRwdh(String rwdh) {
		this.rwdh = rwdh;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getSerial_no() {
		return serial_no;
	}
	public void setSerial_no(String serial_no) {
		this.serial_no = serial_no;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getSend_company() {
		return send_company;
	}
	public void setSend_company(int send_company) {
		this.send_company = send_company;
	}
	public int getReceive_company() {
		return receive_company;
	}
	public void setReceive_company(int receive_company) {
		this.receive_company = receive_company;
	}
	public double getTotal_qty() {
		return total_qty;
	}
	public void setTotal_qty(double total_qty) {
		this.total_qty = total_qty;
	}
	public double getProduced_qty() {
		return produced_qty;
	}
	public void setProduced_qty(double produced_qty) {
		this.produced_qty = produced_qty;
	}
	public double getConfirmed_qty() {
		return confirmed_qty;
	}
	public void setConfirmed_qty(double confirmed_qty) {
		this.confirmed_qty = confirmed_qty;
	}
	public Date getPlan_start() {
		return plan_start;
	}
	public void setPlan_start(Date plan_start) {
		this.plan_start = plan_start;
	}
	public Date getPlan_complete() {
		return plan_complete;
	}
	public void setPlan_complete(Date plan_complete) {
		this.plan_complete = plan_complete;
	}
	public String getQc_type() {
		return qc_type;
	}
	public void setQc_type(String qc_type) {
		this.qc_type = qc_type;
	}
	public String getScdh() {
		return scdh;
	}
	public void setScdh(String scdh) {
		this.scdh = scdh;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public String getProducers_company_name() {
		return producers_company_name;
	}
	public void setProducers_company_name(String producers_company_name) {
		this.producers_company_name = producers_company_name;
	}
	
	
}
