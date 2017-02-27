package usercenter.saleManage.model;

import java.util.Date;

public class AccessTempletElement {
	private int			e_id;
	private String			e_name;
	private int			e_type_id;
	private int			controller_type_id;
	private int			validate_type;
	private String			validate_text;
	private int			e_length;
	private int			e_decimal_length;
	private Date			create_dt;
	private String			related_basis;
	private int			templet_id;

	public int getE_id() {
		return e_id;
	}
	public void setE_id(int e_id) {
		this.e_id = e_id;
	}
	public String getE_name() {
		return e_name;
	}
	public void setE_name(String e_name) {
		this.e_name = e_name;
	}
	public int getE_type_id() {
		return e_type_id;
	}
	public void setE_type_id(int e_type_id) {
		this.e_type_id = e_type_id;
	}
	public int getController_type_id() {
		return controller_type_id;
	}
	public void setController_type_id(int controller_type_id) {
		this.controller_type_id = controller_type_id;
	}
	public int getValidate_type() {
		return validate_type;
	}
	public void setValidate_type(int validate_type) {
		this.validate_type = validate_type;
	}
	public String getValidate_text() {
		return validate_text;
	}
	public void setValidate_text(String validate_text) {
		this.validate_text = validate_text;
	}
	public int getE_length() {
		return e_length;
	}
	public void setE_length(int e_length) {
		this.e_length = e_length;
	}
	public int getE_decimal_length() {
		return e_decimal_length;
	}
	public void setE_decimal_length(int e_decimal_length) {
		this.e_decimal_length = e_decimal_length;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getRelated_basis() {
		return related_basis;
	}
	public void setRelated_basis(String related_basis) {
		this.related_basis = related_basis;
	}
	public int getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(int templet_id) {
		this.templet_id = templet_id;
	}
}
