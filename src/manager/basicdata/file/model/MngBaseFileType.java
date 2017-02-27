package manager.basicdata.file.model;

import java.io.Serializable;
/**
 * 文件类型表
 * @author chenlong
 *
 */
public class MngBaseFileType implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -385274371469836028L;
	private int			ft_id;//文件类型表主键
	private String			type_name;//文件类型名称
	private int			f_id;//父id
	private String			leaf;//叶子节点

	public int getFt_id() {
		return ft_id;
	}
	public void setFt_id(int ft_id) {
		this.ft_id = ft_id;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
}
