package usercenter.saleManage.model;

import java.util.Date;
import java.util.List;

public class AccessTemplet {
	private int			templet_id;
	private int			h_id;
	private int			is_must;
	private int			order_by;
	private int			classify_id;
	private String			templet_name;
	private int			seize_length;
	private Date			create_dt;
	private String			table_name;
	private int			owner;
	private String			owner_name;
	private int			version;
	private String			classify_name;
	
	private List<AccessTempletElement> elements;
	public int getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(int templet_id) {
		this.templet_id = templet_id;
	}
	public int getH_id() {
		return h_id;
	}
	public void setH_id(int h_id) {
		this.h_id = h_id;
	}
	public int getIs_must() {
		return is_must;
	}
	public void setIs_must(int is_must) {
		this.is_must = is_must;
	}
	public int getOrder_by() {
		return order_by;
	}
	public void setOrder_by(int order_by) {
		this.order_by = order_by;
	}
	public int getClassify_id() {
		return classify_id;
	}
	public void setClassify_id(int classify_id) {
		this.classify_id = classify_id;
	}
	public String getTemplet_name() {
		return templet_name;
	}
	public void setTemplet_name(String templet_name) {
		this.templet_name = templet_name;
	}
	public int getSeize_length() {
		return seize_length;
	}
	public void setSeize_length(int seize_length) {
		this.seize_length = seize_length;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	public int getOwner() {
		return owner;
	}
	public void setOwner(int owner) {
		this.owner = owner;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public String getClassify_name() {
		return classify_name;
	}
	public void setClassify_name(String classify_name) {
		this.classify_name = classify_name;
	}
	public String getOwner_name() {
		return owner_name;
	}
	public void setOwner_name(String owner_name) {
		this.owner_name = owner_name;
	}
	public List<AccessTempletElement> getElements() {
		return elements;
	}
	public void setElements(List<AccessTempletElement> elements) {
		this.elements = elements;
	}
	
}
