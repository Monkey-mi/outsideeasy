package usercenter.saleManage.deliveryManage.model;

import java.sql.Date;
import java.util.List;

import usercenter.saleManage.deliveryManage.response.QualityFeedbackDetailVo;


public class QualityFeedback {
	private int			check_id;
	private int			checkor_id;
	private String			checkor_name;
	private Date			check_dt;
	private int			source_type;
	private Date			delivery_dt;
	private String			delivery_number;
	//额外字段
	private String  	pur_cpyname_cn;//采购方平台公司名称
	private String  	sup_cpyname_cn;//供方公司名称
	private List<QualityFeedbackDetailVo> list;
	public int getCheck_id() {
		return check_id;
	}
	public void setCheck_id(int check_id) {
		this.check_id = check_id;
	}
	public int getCheckor_id() {
		return checkor_id;
	}
	public void setCheckor_id(int checkor_id) {
		this.checkor_id = checkor_id;
	}
	public String getCheckor_name() {
		return checkor_name;
	}
	public void setCheckor_name(String checkor_name) {
		this.checkor_name = checkor_name;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
	public Date getDelivery_dt() {
		return delivery_dt;
	}
	public void setDelivery_dt(Date delivery_dt) {
		this.delivery_dt = delivery_dt;
	}
	public String getDelivery_number() {
		return delivery_number;
	}
	public void setDelivery_number(String delivery_number) {
		this.delivery_number = delivery_number;
	}
	public Date getCheck_dt() {
		return check_dt;
	}
	public void setCheck_dt(Date check_dt) {
		this.check_dt = check_dt;
	}
	public String getPur_cpyname_cn() {
		return pur_cpyname_cn;
	}
	public void setPur_cpyname_cn(String pur_cpyname_cn) {
		this.pur_cpyname_cn = pur_cpyname_cn;
	}
	public List<QualityFeedbackDetailVo> getList() {
		return list;
	}
	public void setList(List<QualityFeedbackDetailVo> list) {
		this.list = list;
	}
	public String getSup_cpyname_cn() {
		return sup_cpyname_cn;
	}
	public void setSup_cpyname_cn(String sup_cpyname_cn) {
		this.sup_cpyname_cn = sup_cpyname_cn;
	}
	
}
