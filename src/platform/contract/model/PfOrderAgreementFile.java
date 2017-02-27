package platform.contract.model;

import java.io.Serializable;
import java.util.Date;

public class PfOrderAgreementFile implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			agreement_id;
	private int			pur_order_id;
	private String			agreement_bh;
	private int			agreement_status;
	private String			agreement_name;
	private String			mogodb_id;
	private Date			create_dt;
	private int			creator_id;
	private String			creator_name;
	private int			source_type;
	private String	    suffix_name;
	
	public String getSuffix_name() {
		if(suffix_name == null){
			return "";
		}
		return suffix_name;
	}
	public void setSuffix_name(String suffix_name) {
		this.suffix_name = suffix_name;
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
	public int getSource_type() {
		return source_type;
	}
	public void setSource_type(int source_type) {
		this.source_type = source_type;
	}
}
