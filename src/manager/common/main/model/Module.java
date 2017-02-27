package manager.common.main.model;


import java.io.Serializable;
import java.util.Date;

import manager.common.Model;

import util.AppUtils;

/**
 * @author "MaoBiJu"
 *
 */
public class Module extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8554601405020806528L;
	
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
	private String jsview;
	private String extraCfg;
	private int[] roles;
	private String softSet;
	private String module;
	private String rolesStr;
	
	public String getSoftSet() {
		return softSet;
	}
	public void setSoftSet(String softSet) {
		this.softSet = softSet;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public String getCtrller() {
		return ctrller;
	}
	public void setCtrller(String ctrller) {
		this.ctrller = ctrller;
	}
	
	public String getJsview() {
		return jsview;
	}
	public void setJsview(String jsview) {
		this.jsview = jsview;
	}
	public String getExtraCfg() {
		return extraCfg;
	}
	public void setExtraCfg(String extraCfg) {
		this.extraCfg = extraCfg;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
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
	public void setMod_type(String mod_type) {
		this.mod_type = mod_type;
	}
	public String getMod_code() {
		return mod_code;
	}
	public void setMod_code(String mod_code) {
		this.mod_code = mod_code;
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
	public String getIsvalid() {
		return isvalid;
	}
	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
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
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
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
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public Date getModify_date() {
		return modify_date;
	}
	public void setModify_date(Date modify_date) {
		this.modify_date = modify_date;
	}
	
	public void setRolesStr(String rolesStr) {
		this.rolesStr = rolesStr;
		this.roles = AppUtils.Str2IntArray(rolesStr);
	}
	public String getRolesStr() {
		return rolesStr;
	}
	public void setRoles(int[] roles) {
		this.roles = roles;
		this.rolesStr= AppUtils.IntArray2Str(roles);
	}
	public int[] getRoles() {
		return roles;
	}

}