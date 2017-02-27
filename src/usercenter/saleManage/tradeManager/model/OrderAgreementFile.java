package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 订单合同附件表
 * @author chenlong
 */
public class OrderAgreementFile implements Serializable{
	private static final long serialVersionUID = -5004447634835404462L;
	private int			agreement_id;//主键
	private int			pur_order_id;//订单ID
	private String		agreement_bh;//合同编号
	private int			agreement_status;//合同状态
	private String		agreement_name;//合同名称
	private String		mogodb_id;//合同附件mogodb_id
	private Date		create_dt;//创建时间
	private int			creator_id;//创建人ID
	private String		creator_name;//创建人名称
	private int			source_type;//数据来源
	private String      suffix_name;//后缀名

	public String getSuffix_name() {
		return suffix_name;
	}
	public void setSuffix_name(String suffix_name) {
		this.suffix_name = suffix_name;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getAgreement_id() {
		return agreement_id;
	}
	public void setAgreement_id(int agreement_id) {
		this.agreement_id = agreement_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getAgreement_bh() {
		return agreement_bh;
	}
	public void setAgreement_bh(String agreement_bh) {
		this.agreement_bh = agreement_bh;
	}
	public int getAgreement_status() {
		return agreement_status;
	}
	public void setAgreement_status(int agreement_status) {
		this.agreement_status = agreement_status;
	}
	public String getAgreement_name() {
		return agreement_name;
	}
	public void setAgreement_name(String agreement_name) {
		this.agreement_name = agreement_name;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
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
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
}
