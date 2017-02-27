package usercenter.supplierFiles.model;

import java.io.Serializable;
import java.util.Date;

public class SupplierOutOprate implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1589113995289457804L;
	private int			out_id;
	private int			supplier_id;
	private String			out_reason;
	private Date			create_dt;
	private int			opreator_id;
	private String			opreator_name;
	private int			source_type;

	public int getOut_id() {
		return out_id;
	}
	public void setOut_id(int out_id) {
		this.out_id = out_id;
	}
	public int getSupplier_id() {
		return supplier_id;
	}
	public void setSupplier_id(int supplier_id) {
		this.supplier_id = supplier_id;
	}
	public String getOut_reason() {
		return out_reason;
	}
	public void setOut_reason(String out_reason) {
		this.out_reason = out_reason;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getOpreator_id() {
		return opreator_id;
	}
	public void setOpreator_id(int opreator_id) {
		this.opreator_id = opreator_id;
	}
	public String getOpreator_name() {
		return opreator_name;
	}
	public void setOpreator_name(String opreator_name) {
		this.opreator_name = opreator_name;
	}
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
}
