package manager.basicdata.level.model;

import java.io.Serializable;

import manager.common.Model;


public class MaterialLevel extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -9028605058503376922L;
	private int			level_id;
	private String			level_name;
	

	public int getLevel_id() {
		return level_id;
	}
	public void setLevel_id(int level_id) {
		this.level_id = level_id;
	}
	public String getLevel_name() {
		return level_name;
	}
	public void setLevel_name(String level_name) {
		this.level_name = level_name;
	}
}
