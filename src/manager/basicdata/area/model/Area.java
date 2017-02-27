package manager.basicdata.area.model;

import java.io.Serializable;

import manager.common.Model;


public class Area extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2535350653922587291L;
	private int			area_id;
	private String			area_name;
	private int			f_id;
	private String			shortName;
	private String			levelType;
	private String			cityCode;
	private String			zipCode;
	private String			mergerName;
	private String			ing;
	private String			lat;
	private String			pinyin;

	public int getArea_id() {
		return area_id;
	}
	public void setArea_id(int area_id) {
		this.area_id = area_id;
	}
	public String getArea_name() {
		return area_name;
	}
	public void setArea_name(String area_name) {
		this.area_name = area_name;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	public String getLevelType() {
		return levelType;
	}
	public void setLevelType(String levelType) {
		this.levelType = levelType;
	}
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getMergerName() {
		return mergerName;
	}
	public void setMergerName(String mergerName) {
		this.mergerName = mergerName;
	}
	public String getIng() {
		return ing;
	}
	public void setIng(String ing) {
		this.ing = ing;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getPinyin() {
		return pinyin;
	}
	public void setPinyin(String pinyin) {
		this.pinyin = pinyin;
	}
}
