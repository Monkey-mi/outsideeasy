package usercenter.externalTask.TaskResponse;

import java.io.Serializable;

import usercenter.externalTask.model.TaskDeliverGoods;
/*
 * 发货单详情页面返回
 */
public class DeliverGoodsListVo extends TaskDeliverGoods implements Serializable {
	private static final long serialVersionUID = 4275806060848545078L;
	private String product_name;
	private String serial_no	;	
	private String product_pic;
	private String ddh;
	private String scdh;
	private String rwdh;
	private String bzmc;
		
	public String getBzmc() {
		return bzmc;
	}
	public void setBzmc(String bzmc) {
		this.bzmc = bzmc;
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
	public String getProduct_pic() {
		return product_pic;
	}
	public void setProduct_pic(String product_pic) {
		this.product_pic = product_pic;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getScdh() {
		return scdh;
	}
	public void setScdh(String scdh) {
		this.scdh = scdh;
	}
	public String getRwdh() {
		return rwdh;
	}
	public void setRwdh(String rwdh) {
		this.rwdh = rwdh;
	}
	
}
