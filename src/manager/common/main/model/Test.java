package manager.common.main.model;

import java.io.Serializable;

import manager.common.Model;


public class Test extends Model implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3787770975825429086L;
	private int id;
	private String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
