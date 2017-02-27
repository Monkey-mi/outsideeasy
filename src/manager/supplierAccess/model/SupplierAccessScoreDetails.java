/*准入评估明细查看对象*/
package manager.supplierAccess.model;

import java.util.Date;
import java.io.Serializable;

import manager.common.Model;
public class SupplierAccessScoreDetails extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1939408885376303112L;
	private int			score_id;
	private int			company_id;
	private int			item_id;
	private int			item_fid;
	private double			assess_score;
	private String			item_name;
	private String			fitem_name;
	private int			fitem_fid;
	private double			weightValue;
	private Date			assess_date;
	private Date			plan_assess_date;
	private int			version_id;
	private String			point_analyze;
	private String			improve_act;
	private String			responsible_person;
	private String			assess_person;
	private String			item_description;
	private String       assess_view1;

	public int getScore_id() {
		return score_id;
	}
	public void setScore_id(int score_id) {
		this.score_id = score_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public int getItem_fid() {
		return item_fid;
	}
	public void setItem_fid(int item_fid) {
		this.item_fid = item_fid;
	}
	public double getAssess_score() {
		return assess_score;
	}
	public void setAssess_score(double assess_score) {
		this.assess_score = assess_score;
	}
	public double getScore1()
	{
		if(this.assess_score==0)
			return 0;
		else
			return -1;
	}
	public double getScore2()
	{
		if(this.assess_score==2)
			return 2;
		else
			return 0;
	}
	public double getScore3()
	{
		if(this.assess_score==4)
			return 4;
		else
			return 0;
	}
	public double getScore4()
	{
		if(this.assess_score==5)
			return 5;
		else
			return 0;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getFitem_name() {
		return fitem_name;
	}
	public void setFitem_name(String fitem_name) {
		this.fitem_name = fitem_name;
	}
	public int getFitem_fid() {
		return fitem_fid;
	}
	public void setFitem_fid(int fitem_fid) {
		this.fitem_fid = fitem_fid;
	}
	public double getWeightValue() {
		return weightValue;
	}
	public void setWeightValue(double weightValue) {
		this.weightValue = weightValue;
	}
	public Date getAssess_date() {
		return assess_date;
	}
	public void setAssess_date(Date assess_date) {
		this.assess_date = assess_date;
	}
	public Date getPlan_assess_date() {
		return plan_assess_date;
	}
	public void setPlan_assess_date(Date plan_assess_date) {
		this.plan_assess_date = plan_assess_date;
	}
	public int getVersion_id() {
		return version_id;
	}
	public void setVersion_id(int version_id) {
		this.version_id = version_id;
	}
	public String getPoint_analyze() {
		return point_analyze;
	}
	public void setPoint_analyze(String point_analyze) {
		this.point_analyze = point_analyze;
	}
	public String getImprove_act() {
		return improve_act;
	}
	public void setImprove_act(String improve_act) {
		this.improve_act = improve_act;
	}
	public String getResponsible_person() {
		return responsible_person;
	}
	public void setResponsible_person(String responsible_person) {
		this.responsible_person = responsible_person;
	}
	public String getAssess_person() {
		return assess_person;
	}
	public void setAssess_person(String assess_person) {
		this.assess_person = assess_person;
	}
	public String getItem_description() {
		return item_description;
	}
	public void setItem_description(String item_description) {
		this.item_description = item_description;
	}
	public String getAssess_view1()
	{
		return assess_view1;
	}
	public void setAssess_view1(String assess_view1)
	{
		this.assess_view1=assess_view1;
	}
}
