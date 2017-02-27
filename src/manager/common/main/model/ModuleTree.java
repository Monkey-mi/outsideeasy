package manager.common.main.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import manager.common.Model;



/**
 * ClassName: ModuleTree
 * @Description: 功能菜单树
 * @author 华慧
 * @date 2015-9-1
 */
public class ModuleTree extends Model implements Serializable {
	
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -7862838307984446781L;
	private int      id;         
	private int      parentId;   
	private String   mod_type;   
	private String   mod_code;   
	private String   text;       
	private String   textCls;    
	private String   expanded;   
	private String   leaf;
	private String   isvalid;
	private String   urltype;
	private String   url;        
	private String   urltarget;  
	private String   icon;       
	private String   iconCls;    
	private String   qtip;       
	private String   qtitle;     
	private int      order_seq;  
	private String   remark;     
	private Date     create_date;
	private Date     modify_date;
	private String ctrller;
	private String view;
	private String extraCfg;
	private List<ModuleTree> data;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getMod_type() {
		return mod_type;
	}
	public void setMod_type(String modType) {
		mod_type = modType;
	}
	public String getMod_code() {
		return mod_code;
	}
	public void setMod_code(String modCode) {
		mod_code = modCode;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTextCls() {
		return textCls;
	}
	public void setTextCls(String textCls) {
		this.textCls = textCls;
	}
	public String getExpanded() {
		return expanded;
	}
	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getIsvalid() {
		return isvalid;
	}
	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}
	public String getUrltype() {
		return urltype;
	}
	public void setUrltype(String urltype) {
		this.urltype = urltype;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUrltarget() {
		return urltarget;
	}
	public void setUrltarget(String urltarget) {
		this.urltarget = urltarget;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getQtip() {
		return qtip;
	}
	public void setQtip(String qtip) {
		this.qtip = qtip;
	}
	public String getQtitle() {
		return qtitle;
	}
	public void setQtitle(String qtitle) {
		this.qtitle = qtitle;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int orderSeq) {
		order_seq = orderSeq;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date createDate) {
		create_date = createDate;
	}
	public Date getModify_date() {
		return modify_date;
	}
	public void setModify_date(Date modifyDate) {
		modify_date = modifyDate;
	}
	public String getCtrller() {
		return ctrller;
	}
	public void setCtrller(String ctrller) {
		this.ctrller = ctrller;
	}
	public String getView() {
		return view;
	}
	public void setView(String view) {
		this.view = view;
	}
	public String getExtraCfg() {
		return extraCfg;
	}
	public void setExtraCfg(String extraCfg) {
		this.extraCfg = extraCfg;
	}
	public List<ModuleTree> getData() {
		return data;
	}
	public void setData(List<ModuleTree> data) {
		this.data = data;
	}
}
