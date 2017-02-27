package platform.company.model;


public class PfDevice {
	private Integer			device_id;
	private String			device_name;
	private String			specifications;
	private String			place;
	private Float			price;
	private String			buy_day;
	private String			advanced;
	private Integer			device_num;
	public Integer getDevice_id() {
		return device_id;
	}
	public void setDevice_id(Integer device_id) {
		this.device_id = device_id;
	}
	public String getDevice_name() {
		return device_name;
	}
	public void setDevice_name(String device_name) {
		this.device_name = device_name;
	}
	public String getSpecifications() {
		return specifications;
	}
	public void setSpecifications(String specifications) {
		this.specifications = specifications;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public String getBuy_day() {
		return buy_day;
	}
	public void setBuy_day(String buy_day) {
		this.buy_day = buy_day;
	}
	public String getAdvanced() {
		return advanced;
	}
	public void setAdvanced(String advanced) {
		this.advanced = advanced;
	}
	public Integer getDevice_num() {
		return device_num;
	}
	public void setDevice_num(Integer device_num) {
		this.device_num = device_num;
	}
	@Override
	public String toString() {
		return "PfDevice [device_id=" + device_id + ", device_name="
				+ device_name + ", specifications=" + specifications
				+ ", place=" + place + ", price=" + price + ", buy_day="
				+ buy_day + ", advanced=" + advanced + ", device_num="
				+ device_num + "]";
	}

}
