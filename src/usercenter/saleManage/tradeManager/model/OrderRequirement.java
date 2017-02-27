package usercenter.saleManage.tradeManager.model;

import java.io.Serializable;
import java.util.Date;
/**
 * 订单采购要求
 * @author chenlong
 */
public class OrderRequirement implements Serializable{
	private static final long serialVersionUID = 1425270529939401027L;
	private int			order_req_id;//主键
	private int			pur_order_id;//订单ID
	private String		order_bh;//合同编号
	private String		req_text;//要求内容
	private int			source_type;//数据来源
	private Date		create_dt;//创建时间
	private int			creator_id;//创建人ID
	private String		creator_name;//创建人名
	private String      contract_terms;//合同条款

	public String getContract_terms() {
		return contract_terms;
	}
	public void setContract_terms(String contract_terms) {
		this.contract_terms = contract_terms;
	}
	public int getOrder_req_id() {
		return order_req_id;
	}
	public void setOrder_req_id(int order_req_id) {
		this.order_req_id = order_req_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public String getOrder_bh() {
		return order_bh;
	}
	public void setOrder_bh(String order_bh) {
		this.order_bh = order_bh;
	}
	public String getReq_text() {
		return req_text;
	}
	public void setReq_text(String req_text) {
		this.req_text = req_text;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
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
}
