package common.dictionary.model;

import java.io.Serializable;
/**
 * 数据字典表
 */
public class DictionaryInfo implements Serializable{
	
	private static final long serialVersionUID = -9156513853032725737L;
	private int			id;//主键
	private String			dictionary_key;//键
	private String			dictionary_value;//值

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDictionary_key() {
		return dictionary_key;
	}
	public void setDictionary_key(String dictionary_key) {
		this.dictionary_key = dictionary_key;
	}
	public String getDictionary_value() {
		return dictionary_value;
	}
	public void setDictionary_value(String dictionary_value) {
		this.dictionary_value = dictionary_value;
	}
}
