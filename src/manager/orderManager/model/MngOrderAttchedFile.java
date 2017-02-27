package manager.orderManager.model;

import java.io.Serializable;
import java.util.Date;

public class MngOrderAttchedFile implements Serializable {
	private static final long serialVersionUID = -6911672572753964828L;
	private int			order_attched_id;
	private int			pur_order_id;
	private String			order_bh;
	private String			order_attched_name;
	private int			ft_id;
	private String			suffix_name;
	private String			order_attched_remark;
	private String			mogodb_id;
	private Date			create_dt;
	private int			source_type;
	private int			creator_id;
	private String			creator_name;
	private int			status;
	private int			is_look;
	private String			view_no;
	private String			type_name;
	public int getOrder_attched_id() {
		return order_attched_id;
	}
	public void setOrder_attched_id(int order_attched_id) {
		this.order_attched_id = order_attched_id;
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
	public String getOrder_attched_name() {
		return order_attched_name;
	}
	public void setOrder_attched_name(String order_attched_name) {
		this.order_attched_name = order_attched_name;
	}
	public int getFt_id() {
		return ft_id;
	}
	public void setFt_id(int ft_id) {
		this.ft_id = ft_id;
	}
	public String getSuffix_name() {
		return suffix_name;
	}
	public void setSuffix_name(String suffix_name) {
		this.suffix_name = suffix_name;
	}
	public String getOrder_attched_remark() {
		return order_attched_remark;
	}
	public void setOrder_attched_remark(String order_attched_remark) {
		this.order_attched_remark = order_attched_remark;
	}
	public String getMogodb_id() {
		return mogodb_id;
	}
	public void setMogodb_id(String mogodb_id) {
		this.mogodb_id = mogodb_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
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
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getIs_look() {
		return is_look;
	}
	public void setIs_look(int is_look) {
		this.is_look = is_look;
	}
	public String getView_no() {
		return view_no;
	}
	public void setView_no(String view_no) {
		this.view_no = view_no;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	
}
